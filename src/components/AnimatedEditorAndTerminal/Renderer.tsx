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
	editorFilename: string;
	terminalCommands: Command[];
	editorTokens: Token[];
	editorSpeed?: number;
	editorDelay?: number;
	editorPreStyles?: React.CSSProperties;
	editorTrailingNewLines?: number;
	editorHighlights?: Map<TokenType, string>;
	editorCommandSpeed?: number;
	editorAutoScrollAfterLine?: number;
	shouldEditorAutoScroll?: boolean;
	terminalSpeed?: number;
	terminalDelay?: number;
	terminalPreStyles?: React.CSSProperties;
}

function AnimatedEditorAndTerminal({
	editorFilename,
	editorTokens,
	terminalCommands,
	terminalSpeed = 75,
	editorSpeed = 75,
	editorCommandSpeed = 350,
	editorDelay = 1000,
	terminalDelay = 1000,
	editorAutoScrollAfterLine = 0,
	shouldEditorAutoScroll = true,
	editorTrailingNewLines = 3,
	editorHighlights = defaultHighlights,
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
	const [editorAnimationIsDone, setEditorAnimationIsDone] =
		React.useState<boolean>(false);
	const [isEditorAnimationReplaying, setEditorAnimationIsReplaying] =
		React.useState<boolean>(true);

	React.useEffect(() => {
		if (isEditorAnimationReplaying) {
			setEditorAnimationIsDone(false);
			setEditorData([]);
			setEditorStatusText('');
			setEditorCommand('');
			setEditorCols(1);
			setEditorRows(1);
			setEditorNumChars(0);
			editorContentIteratorRef.current = editorContentGenerator(editorTokens);

			const numberOfLines = getNumberOfLinesFromTokens(editorTokens);
			const lineNumberCapacity = numberOfLines + editorTrailingNewLines;

			const initialEditorLineNumbers = [];
			for (let i = 0; i < lineNumberCapacity; i++) {
				initialEditorLineNumbers.push({
					lineNumber: i === 0 ? '1' : '~',
					id: uuidv4(),
				});
			}
			setEditorLineNumbers(initialEditorLineNumbers);
		}
	}, [
		editorTokens,
		isEditorAnimationReplaying,
		setEditorLineNumbers,
		editorTrailingNewLines,
	]);

	React.useEffect(() => {
		const timeout = setTimeout(function () {
			if (isEditorAnimationReplaying) {
				setIsEditorAnimating(true);
			}
		}, editorDelay);

		return () => clearTimeout(timeout);
	}, [editorDelay, setIsEditorAnimating, isEditorAnimationReplaying]);

	React.useEffect(() => {
		if (isEditorAnimating && editorContentIteratorRef.current) {
			const interval = window.setInterval(function () {
				const { value, done } = editorContentIteratorRef.current!.next();
				if (done) {
					cleanupEditorAnimation();
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
			interval = setInterval(function () {
				const { value, done } = editorCommandIteratorRef.current!.next();
				if (done) {
					clearInterval(interval);
					setEditorCommand('');
					setEditorStatusText(
						`"${editorFilename}" [New] ${editorRows}L, ${editorNumChars}C written`
					);
					setEditorAnimationIsDone(true);
				} else if (value) {
					setEditorCommand(editorCommand + value);
				}
			}, editorCommandSpeed);
		} else {
			setEditorStatusText(`"${editorFilename}" [New File]`);
		}

		return () => clearInterval(interval);
	}, [
		isEditorAnimating,
		setEditorStatusText,
		setEditorAnimationIsDone,
		editorData,
		editorFilename,
		editorCommand,
		setEditorCommand,
		editorCommandSpeed,
		editorRows,
		editorNumChars,
	]);

	function cleanupEditorAnimation() {
		clearInterval(editorIntervalRef.current);
		setIsEditorAnimating(false);
		setEditorAnimationIsReplaying(false);
	}

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
	const [terminalAnimationIsDone, setTerminalAnimationIsDone] =
		React.useState<boolean>(false);
	const [isTerminalAnimationReplaying, setTerminalAnimationIsReplaying] =
		React.useState<boolean>(true);

	React.useEffect(() => {
		if (isTerminalAnimationReplaying) {
			setTerminalAnimationIsDone(false);
			setTerminalContent([]);
			terminalCurrentContentItemIndexRef.current = 0;
			terminalIteratorRef.current = terminalContentGenerator(terminalCommands);
		}
	}, [terminalCommands, isTerminalAnimationReplaying]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			if (isTerminalAnimationReplaying) {
				setIsTerminalAnimating(true);
			}
		}, terminalDelay);

		return () => clearTimeout(timeout);
	}, [terminalDelay, setIsTerminalAnimating, isTerminalAnimationReplaying]);

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
		setTerminalAnimationIsDone(true);
		setTerminalAnimationIsReplaying(false);
	}

	function handleReplay() {
		if (editorAnimationIsDone && terminalAnimationIsDone) {
			setTerminalAnimationIsReplaying(true);
			setEditorAnimationIsReplaying(true);
		}
	}

	return (
		<>
			<button
				onClick={handleReplay}
				disabled={!(editorAnimationIsDone && terminalAnimationIsDone)}
			>
				Replay
			</button>
			<Editor
				isAnimating={isEditorAnimating}
				lineNumbers={editorLineNumbers}
				rows={editorRows}
				cols={editorCols}
				statusText={editorStatusText}
				data={editorData}
				command={editorCommand}
				preStyles={editorPreStyles}
				autoScrollAfterLine={editorAutoScrollAfterLine}
				autoScroll={shouldEditorAutoScroll}
				highlights={editorHighlights}
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
