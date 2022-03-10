import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import editorContentGenerator, { EditorDatum } from './editorContentGenerator';
import Editor from './Editor';
import Terminal, { TerminalContentItem } from './Terminal';
import { TerminalContentGeneratorItem } from './terminalContentGenerator';
import terminalContentGenerator from './terminalContentGenerator';

export interface Token {
	lexeme: string;
	type: TokenType;
}

export enum TokenType {
	Comment,
	Identifier,
	Integer,
	Keyword,
	Operator,
	Punctuation,
	Whitespace,
	Uncategorized,
	NewLine,
	Boolean,
}

function getNumberOfLinesFromTokens(tokens: Token[]) {
	let numberOfLines = 1;
	tokens.forEach(({ lexeme }) => {
		if (lexeme === '\n') numberOfLines++;
	});
	return numberOfLines;
}

function* writeCommandTextGenerator(): Generator<string, undefined> {
	const str = ':w';
	let currentIndex = 0;
	while (true) {
		if (currentIndex >= str.length) return;
		yield str[currentIndex++];
	}
}

export interface Command {
	cmd: string;
	delayAfterCmd: number;
	outputLines: string[];
}

interface AnimatedEditorAndTerminalProps {
	filename: string;
	tokens: Token[];
	commands: Command[];
	editorSpeed?: number;
	commandSpeed?: number;
	editorDelay?: number;
	editorPreStyles?: React.CSSProperties;
	autoScrollAfterLine?: number;
	autoScroll?: boolean;
	trailingNewLines?: number;
	highlights?: Map<TokenType, string>;
	terminalSpeed?: number;
	terminalDelay?: number;
	terminalPreStyles?: React.CSSProperties;
}

function AnimatedEditorAndTerminal({
	filename,
	tokens,
	terminalSpeed = 75,
	editorSpeed = 75,
	commandSpeed = 350,
	editorDelay = 1000,
	terminalDelay = 1000,
	autoScrollAfterLine = 0,
	autoScroll = true,
	trailingNewLines = 3,
	highlights = defaultHighlights,
	commands,
	terminalPreStyles = {},
	editorPreStyles = {},
}: AnimatedEditorAndTerminalProps) {
	const editorIntervalRef = React.useRef<number>();
	const editorContentIteratorRef =
		React.useRef<Generator<EditorDatum, undefined>>();
	const editorCommandIteratorRef = React.useRef<Generator<string, undefined>>();
	const [editorLineNumbers, setEditorLineNumbers] = React.useState<
		{ lineNumber: string; id: string }[]
	>([]);
	const [editorData, setEditorData] = React.useState<EditorDatum[]>([]);
	const [editorStatusText, setEditorStatusText] = React.useState<string>('');
	const [editorCommand, setEditorCommand] = React.useState<string>('');
	const [editorCols, setEditorCols] = React.useState<number>(1);
	const [editorRows, setEditorRows] = React.useState<number>(1);
	const [editorNumChars, setEditorNumChars] = React.useState<number>(0);
	const [isEditorAnimating, setIsEditorAnimating] =
		React.useState<boolean>(false);
	const [isTypingVimCommand, setIsEditorTypingCommand] =
		React.useState<boolean>(false);

	React.useEffect(() => {
		const numberOfLines = getNumberOfLinesFromTokens(tokens);
		const lineNumberCapacity = numberOfLines + trailingNewLines;

		const initialEditorLineNumbers = [];
		for (let i = 0; i < lineNumberCapacity; i++) {
			initialEditorLineNumbers.push({
				lineNumber: i === 0 ? '1' : '~',
				id: uuidv4(),
			});
		}
		setEditorLineNumbers(initialEditorLineNumbers);
	}, [tokens, setEditorLineNumbers, trailingNewLines]);

	React.useEffect(() => {
		editorContentIteratorRef.current = editorContentGenerator(tokens);
	}, [tokens]);

	React.useEffect(() => {
		const timeout = setTimeout(function () {
			setIsEditorAnimating(true);
		}, editorDelay);

		return () => clearTimeout(timeout);
	}, [editorDelay, setIsEditorAnimating]);

	React.useEffect(() => {
		if (isEditorAnimating && editorContentIteratorRef.current) {
			const interval = window.setInterval(function () {
				const { value, done } = editorContentIteratorRef.current!.next();
				if (done) {
					clearInterval(editorIntervalRef.current);
					setIsEditorAnimating(false);
				} else if (value) {
					if (value.char === '\n') {
						setEditorCols(1);
						setEditorRows(editorRows + 1);
						setEditorLineNumbers([
							...editorLineNumbers.slice(0, editorRows),
							{
								lineNumber: String(editorRows + 1),
								id: uuidv4(),
							},
							...editorLineNumbers.slice(editorRows + 1),
						]);
					} else {
						setEditorCols(editorCols + 1);
						setEditorNumChars(editorNumChars + 1);
					}

					setEditorData([...editorData, value]);
				}
			}, editorSpeed);

			editorIntervalRef.current = interval;
		}

		return () => clearInterval(editorIntervalRef.current);
	}, [
		editorSpeed,
		editorData,
		isEditorAnimating,
		setEditorData,
		editorRows,
		setEditorRows,
		editorCols,
		setEditorCols,
		editorLineNumbers,
		setEditorLineNumbers,
		editorNumChars,
		setEditorNumChars,
	]);

	React.useEffect(() => {
		if (editorData.length) {
			editorCommandIteratorRef.current = writeCommandTextGenerator();
		}
	}, [editorData]);

	React.useEffect(() => {
		let interval: NodeJS.Timer;

		if (isEditorAnimating) {
			setEditorStatusText('-- INSERT --');
		} else if (!isEditorAnimating && editorData.length) {
			setIsEditorTypingCommand(true);
			interval = setInterval(function () {
				const { value, done } = editorCommandIteratorRef.current!.next();
				if (done) {
					clearInterval(interval);
					setEditorCommand('');
					setEditorStatusText(
						`"${filename}" [New] ${editorRows}L, ${editorNumChars}C written`
					);
					setIsEditorTypingCommand(false);
				} else if (value) {
					setEditorCommand(editorCommand + value);
				}
			}, commandSpeed);
		} else {
			setEditorStatusText(`"${filename}" [New File]`);
		}

		return () => clearInterval(interval);
	}, [
		isEditorAnimating,
		setIsEditorTypingCommand,
		setEditorStatusText,
		editorData,
		filename,
		editorCommand,
		setEditorCommand,
		commandSpeed,
		editorRows,
		editorNumChars,
	]);

	// Start of Terminal logic

	const terminalIntervalRef = React.useRef<number>();
	const terminalTimeoutRef = React.useRef<number>();
	const terminalIteratorRef =
		React.useRef<Generator<TerminalContentGeneratorItem, undefined>>();
	const terminalCurrentContentItemIndexRef = React.useRef<number>(0);

	const [terminalContent, setTerminalContent] = React.useState<
		TerminalContentItem[]
	>([]);
	const [isTerminalAnimating, setIsTerminalAnimating] =
		React.useState<boolean>(false);

	React.useEffect(() => {
		if (isTerminalAnimating) {
			setTerminalContent([]);
			terminalCurrentContentItemIndexRef.current = 0;
			terminalIteratorRef.current = terminalContentGenerator(commands);
		}
	}, [commands, isTerminalAnimating]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setIsTerminalAnimating(true);
		}, terminalDelay);

		return () => clearTimeout(timeout);
	}, [terminalDelay, setIsTerminalAnimating]);

	React.useEffect(() => {
		if (!(isTerminalAnimating && terminalIteratorRef.current)) return;

		terminalIntervalRef.current = window.setInterval(function fetchNextValue() {
			const { value, done } = terminalIteratorRef.current!.next();

			if (done) {
				cleanupTerminalAnimation();
				return;
			}

			if (terminalContent.length > 0 && value?.isCommand) {
				clearInterval(terminalIntervalRef.current);
				terminalTimeoutRef.current = window.setTimeout(
					() => {
						if (
							terminalCurrentContentItemIndexRef.current <
							terminalContent.length
						) {
							// Append a character to the text of the current content item.
							const currentContentItem =
								terminalContent[terminalCurrentContentItemIndexRef.current];
							setTerminalContent([
								...terminalContent.slice(
									0,
									terminalCurrentContentItemIndexRef.current
								),
								{
									...currentContentItem,
									text: currentContentItem.text + value.text,
								},
							]);
						} else {
							// Append a new command and make it current.
							setTerminalContent([
								...terminalContent.map((datum) => ({
									...datum,
									isCurrent: false,
								})),
								{
									id: value.id,
									isCommand: value.isCommand,
									text: value.text,
									isCurrent: true,
								},
							]);
						}
						clearTimeout(terminalTimeoutRef.current);
						terminalIntervalRef.current = window.setInterval(
							fetchNextValue,
							terminalSpeed
						);
					},
					value?.isLastCharOfCmd && value.delayAfterCmd
						? value.delayAfterCmd
						: 0
				);
			} else if (terminalContent.length > 0 && value) {
				// Append an output line to the existing content list.
				setTerminalContent([
					...terminalContent.slice(
						0,
						terminalCurrentContentItemIndexRef.current
					),
					{
						id: value.id,
						isCommand: value.isCommand,
						text: value.text,
						isCurrent: false,
					},
				]);
			} else if (value) {
				clearInterval(terminalIntervalRef.current);
				terminalTimeoutRef.current = window.setTimeout(
					() => {
						// Append the first command to the content list and make it current.
						setTerminalContent([
							{
								id: value.id,
								isCommand: value.isCommand,
								text: value.text,
								isCurrent: true,
							},
						]);
						clearTimeout(terminalTimeoutRef.current);
						terminalIntervalRef.current = window.setInterval(
							fetchNextValue,
							terminalSpeed
						);
					},
					value?.isLastCharOfCmd && value.delayAfterCmd
						? value.delayAfterCmd
						: 0
				);
			}

			if (value && (!value.isCommand || value.isLastCharOfCmd)) {
				terminalCurrentContentItemIndexRef.current++;
			}
		}, terminalSpeed);

		return () => clearInterval(terminalIntervalRef.current);
	}, [terminalSpeed, isTerminalAnimating, terminalContent, setTerminalContent]);

	function cleanupTerminalAnimation() {
		clearInterval(terminalIntervalRef.current);
		clearTimeout(terminalTimeoutRef.current);
		setIsTerminalAnimating(false);
	}

	function handleReplay() {
		if (
			!isEditorAnimating &&
			!isTerminalAnimating &&
			editorData.length &&
			terminalContent.length
		) {
			setIsTerminalAnimating(true);
			setIsEditorAnimating(true);
		}
	}

	return (
		<>
			<button onClick={handleReplay}>Replay</button>
			<Editor
				isAnimating={isEditorAnimating}
				lineNumbers={editorLineNumbers}
				rows={editorRows}
				cols={editorCols}
				statusText={editorStatusText}
				data={editorData}
				command={editorCommand}
				preStyles={editorPreStyles}
				autoScrollAfterLine={autoScrollAfterLine}
				autoScroll={autoScroll}
				highlights={highlights}
			/>
			<Terminal content={terminalContent} preStyles={terminalPreStyles} />
		</>
	);
}

const defaultHighlights = new Map<TokenType, string>();
defaultHighlights.set(TokenType.Whitespace, 'transparent');
defaultHighlights.set(TokenType.NewLine, 'transparent');
defaultHighlights.set(TokenType.Uncategorized, '#ffffff');
defaultHighlights.set(TokenType.Punctuation, '#ffffff');
defaultHighlights.set(TokenType.Identifier, '#bf616a');
defaultHighlights.set(TokenType.Integer, '#d08770');
defaultHighlights.set(TokenType.Keyword, '#b48ead');
defaultHighlights.set(TokenType.Operator, '#c0c5ce');
defaultHighlights.set(TokenType.Comment, '#65737e');
defaultHighlights.set(TokenType.Boolean, '#d08770');

export default AnimatedEditorAndTerminal;
