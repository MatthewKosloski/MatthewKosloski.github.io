import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import contentGenerator from './editorContentGenerator';
import Editor from './Editor';
import { EditorDatum, Token } from './types';

interface RendererProps {
	filename: string;
	tokens: Token[];
	speed?: number;
	commandSpeed?: number;
	delay?: number;
	preStyles?: React.CSSProperties;
	autoScrollAfterLine?: number;
	autoScroll?: boolean;
	trailingNewLines?: number;
	shouldReplay?: boolean;
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

function Renderer({
	filename,
	tokens,
	speed = 75,
	commandSpeed = 350,
	delay = 1000,
	preStyles = {},
	autoScrollAfterLine = 0,
	autoScroll = true,
	trailingNewLines = 3,
	shouldReplay = false
}: RendererProps) {
	const intervalRef = React.useRef<number>();
	const contentGeneratorRef = React.useRef<Generator<EditorDatum, undefined>>();
	const writeCmdGeneratorRef = React.useRef<Generator<string, undefined>>();
	// prettier-ignore
	const [editorLineNumbers, setEditorLineNumbers] = React.useState<{ lineNumber: string; id: string; }[]>([]);
	const [editorData, setEditorData] = React.useState<EditorDatum[]>([]);
	const [editorStatusText, setEditorStatusText] = React.useState<string>('');
	const [editorCommand, setEditorCommand] = React.useState<string>('');
	const [cols, setCols] = React.useState<number>(1);
	const [rows, setRows] = React.useState<number>(1);
	const [numChars, setNumChars] = React.useState<number>(0);
	const [isTypingCode, setIsTypingCode] = React.useState<boolean>(false);
	const [isTypingVimCommand, setIsTypingVimCommand] =
		React.useState<boolean>(false);
	const [shouldReplayInternal, setInternalShouldReplay] =
		React.useState<boolean>(true);

	React.useEffect(() => {

		if (!shouldReplayInternal) return;

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
	}, [tokens, setEditorLineNumbers, trailingNewLines, shouldReplayInternal]);

	React.useEffect(() => {
		if (!shouldReplayInternal) return;
		contentGeneratorRef.current = contentGenerator(tokens);
	}, [tokens, shouldReplayInternal]);

	React.useEffect(() => {
		if (!shouldReplayInternal) return;
		const timeout = setTimeout(function () {
			setInternalShouldReplay(false);
			setIsTypingCode(true);
		}, delay);

		return () => clearTimeout(timeout);
	}, [delay, setIsTypingCode, shouldReplayInternal]);

	React.useEffect(() => {
		if (isTypingCode && contentGeneratorRef.current) {
			const interval = window.setInterval(function () {
				const { value, done } = contentGeneratorRef.current!.next();
				if (done) {
					clearInterval(intervalRef.current);
					setIsTypingCode(false);
				} else if (value) {
					if (value.char === '\n') {
						setCols(1);
						setRows(rows + 1);
						setEditorLineNumbers([
							...editorLineNumbers.slice(0, rows),
							{
								lineNumber: String(rows + 1),
								id: uuidv4(),
							},
							...editorLineNumbers.slice(rows + 1),
						]);
					} else {
						setCols(cols + 1);
						setNumChars(numChars + 1);
					}

					setEditorData([...editorData, value]);
				}
			}, speed);

			intervalRef.current = interval;
		}

		return () => clearInterval(intervalRef.current);
	}, [
		speed,
		editorData,
		isTypingCode,
		setEditorData,
		rows,
		setRows,
		cols,
		setCols,
		editorLineNumbers,
		setEditorLineNumbers,
		numChars,
		setNumChars,
	]);

	React.useEffect(() => {
		if (editorData.length) {
			writeCmdGeneratorRef.current = writeCommandTextGenerator();
		}
	}, [editorData]);

	React.useEffect(() => {
		let interval: NodeJS.Timer;

		if (isTypingCode) {
			setEditorStatusText('-- INSERT --');
		} else if (!isTypingCode && editorData.length) {
			setIsTypingVimCommand(true);
			interval = setInterval(function () {
				const { value, done } = writeCmdGeneratorRef.current!.next();
				if (done) {
					clearInterval(interval);
					setEditorCommand('');
					setEditorStatusText(
						`"${filename}" [New] ${rows}L, ${numChars}C written`
					);
					setIsTypingVimCommand(false);
				} else if (value) {
					setEditorCommand(editorCommand + value);
				}
			}, commandSpeed);
		} else {
			setEditorStatusText(`"${filename}" [New File]`);
		}

		return () => clearInterval(interval);
	}, [
		isTypingCode,
		setIsTypingVimCommand,
		setEditorStatusText,
		editorData,
		filename,
		editorCommand,
		setEditorCommand,
		commandSpeed,
		rows,
		numChars,
	]);

	// TODO: better replay implementation
	React.useEffect(() => {
		if (!isTypingCode && !isTypingVimCommand && editorData.length) {
			setInternalShouldReplay(true);
			setEditorData([]);
			setEditorStatusText('');
			setCols(1);
			setRows(1);
			setNumChars(0);
		}
	}, [shouldReplay]);

	return (
		<Editor
			isPlaying={isTypingCode}
			lineNumbers={editorLineNumbers}
			rows={rows}
			cols={cols}
			statusText={editorStatusText}
			data={editorData}
			command={editorCommand}
			preStyles={preStyles}
			autoScrollAfterLine={autoScrollAfterLine}
			autoScroll={autoScroll}
		/>
	);
}

export default Renderer;
