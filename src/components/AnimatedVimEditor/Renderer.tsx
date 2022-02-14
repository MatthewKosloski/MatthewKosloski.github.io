import React from 'react';
import contentGenerator from './editorContentGenerator';
import Editor from './Editor';
import { EditorDatum, Token } from './types';

interface RendererProps {
	filename: string;
	tokens: Token[];
	speed?: number;
	delay?: number;
}

function getNumberOfLinesFromTokens(tokens: Token[]) {
	let numberOfLines = 1;
	tokens.forEach(({ lexeme }) => {
		if (lexeme === '\n') numberOfLines++;
	});
	return numberOfLines;
}

function Renderer({
	filename,
	tokens,
	speed = 75,
	delay = 1000,
}: RendererProps) {
	const intervalRef = React.useRef<number>();
	const contentGeneratorRef = React.useRef<Generator<EditorDatum, undefined>>();

	// prettier-ignore
	const [editorLineNumbers, setEditorLineNumbers] = React.useState<string[]>([]);
	const [editorData, setEditorData] = React.useState<EditorDatum[]>([]);
	const [editorStatusText, setEditorStatusText] = React.useState<string>('');
	const [cols, setCols] = React.useState<number>(1);
	const [rows, setRows] = React.useState<number>(1);
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

	React.useEffect(() => {
		const numberOfLines = getNumberOfLinesFromTokens(tokens);
		const lineNumberCapacity = numberOfLines + 3;

		const initialEditorLineNumbers = [];
		for (let i = 0; i < lineNumberCapacity; i++) {
			initialEditorLineNumbers.push(i === 0 ? '1' : '~');
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
							String(rows + 1),
							...editorLineNumbers.slice(rows + 1),
						]);
					} else {
						setCols(cols + 1);
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
	]);

	React.useEffect(() => {
		if (isPlaying) {
			setEditorStatusText('-- INSERT --');
		} else if (editorData.length) {
			setEditorStatusText(':wq');
		} else {
			setEditorStatusText(`"${filename}" [New File]`);
		}
	}, [isPlaying, setEditorStatusText, editorData, filename]);

	function cleanup() {
		clearInterval(intervalRef.current);
		setIsPlaying(false);
	}

	return (
		<Editor
			isPlaying={isPlaying}
			filename={filename}
			lineNumbers={editorLineNumbers}
			rows={rows}
			cols={cols}
			statusText={editorStatusText}
			data={editorData}
		/>
	);
}

export default Renderer;
