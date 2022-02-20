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
	height?: string;
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
	height = '400px',
}: RendererProps) {
	const intervalRef = React.useRef<number>();
	const contentGeneratorRef = React.useRef<Generator<EditorDatum, undefined>>();
	// prettier-ignore
	const writeCommandTextGeneratorRef = React.useRef<Generator<string, undefined>>();
	// prettier-ignore
	const [editorLineNumbers, setEditorLineNumbers] = React.useState<{ lineNumber: string; id: string; }[]>([]);
	const [editorData, setEditorData] = React.useState<EditorDatum[]>([]);
	const [editorStatusText, setEditorStatusText] = React.useState<string>('');
	const [editorCommand, setEditorCommand] = React.useState<string>('');
	const [cols, setCols] = React.useState<number>(1);
	const [rows, setRows] = React.useState<number>(1);
	const [numChars, setNumChars] = React.useState<number>(0);
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

	const trailingNewLines = 3;

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
	}, [tokens, setEditorLineNumbers]);

	React.useEffect(() => {
		contentGeneratorRef.current = contentGenerator(tokens);
	}, [tokens]);

	React.useEffect(() => {
		const timeout = setTimeout(function () {
			setIsPlaying(true);
		}, delay);

		return () => clearTimeout(timeout);
	}, [delay, setIsPlaying]);

	React.useEffect(() => {
		if (isPlaying && contentGeneratorRef.current) {
			const interval = window.setInterval(function () {
				const { value, done } = contentGeneratorRef.current!.next();
				if (done) {
					cleanup();
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
		isPlaying,
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
			writeCommandTextGeneratorRef.current = writeCommandTextGenerator();
		}
	}, [editorData]);

	React.useEffect(() => {
		let interval: NodeJS.Timer;

		if (isPlaying) {
			setEditorStatusText('-- INSERT --');
		} else if (editorData.length) {
			interval = setInterval(function () {
				const { value, done } = writeCommandTextGeneratorRef.current!.next();
				if (done) {
					clearInterval(interval);
					setEditorCommand('');
					setEditorStatusText(
						`"${filename}" [New] ${rows}L, ${numChars}C written`
					);
				} else if (value) {
					setEditorCommand(editorCommand + value);
				}
			}, commandSpeed);
		} else {
			setEditorStatusText(`"${filename}" [New File]`);
		}

		return () => clearInterval(interval);
	}, [
		isPlaying,
		setEditorStatusText,
		editorData,
		filename,
		editorCommand,
		setEditorCommand,
		commandSpeed,
		rows,
		numChars,
	]);

	function cleanup() {
		clearInterval(intervalRef.current);
		setIsPlaying(false);
	}

	return (
		<Editor
			isPlaying={isPlaying}
			lineNumbers={editorLineNumbers}
			rows={rows}
			cols={cols}
			statusText={editorStatusText}
			data={editorData}
			command={editorCommand}
			height={height}
		/>
	);
}

export default Renderer;
