import React from 'react';
import styled from 'styled-components';

export interface Token {
	id: string;
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
}

export type Program = Token[];

interface AnimatedVimEditorProps {
	program: Program;
	filename: string;
	delay?: number;
	speed?: number;
}

const Pre = styled.pre`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 325px;
`;

const Code = styled.div`
	display: flex;
`;

const LineNumbers = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 5%;
	color: #c0c5ce;
`;

const TextArea = styled.div`
	flex-basis: 95%;
	color: #fff;
`;

const Cursor = styled.span`
	width: 9px;
	height: 16px;
	display: inline-block;
	vertical-align: middle;
	border: 1px solid white;
	background: white;
`;

const StatusBar = styled.div`
	display: flex;
	color: white;
	justify-content: space-between;
`;

function AnimatedVimEditor({ program, filename, delay = 1000, speed = 75 }: AnimatedVimEditorProps) {
	const [charIndex, setCharIndex] = React.useState<number>(0);
	const [cols, setCols] = React.useState<number>(1);
	const [rows, setRows] = React.useState<number>(1);
	const [programStr, setProgramStr] = React.useState<string>('');
	const [codeElements, setCodeElements] = React.useState<JSX.Element[]>([]);
	const [isTyping, setIsTyping] = React.useState<boolean>(false);
	const [lineNumbers, setLineNumbers] = React.useState<string[]>([]);
	const [numLines, setNumLines] = React.useState<number>(0);
	const [status, setStatus] = React.useState<string>('');
	const [displayCodeCursor, setDisplayCodeCursor] = React.useState<boolean>(true);
	const [displayRowsAndCols, setDisplayRowsAndCols] = React.useState<boolean>(true);
	const [displayAll, setDisplayAll] = React.useState<boolean>(true);

	React.useEffect(() => {
		let str = '';
		let num = 1;
		program.forEach((token) => {
			if (token.lexeme === '\n') num++;
			str += token.lexeme;
		});

		setProgramStr(str);
		setNumLines(num);
	}, [program, setProgramStr, setNumLines]);

	React.useEffect(() => {
		if (numLines) {
			let arr = [];
			for (let i = 0; i < numLines + 3; i++) {
				arr.push(i === 0 ? '1' : '~');
			}
			setLineNumbers(arr);
		}
	}, [numLines, setLineNumbers]);

	React.useEffect(() => {
		const timeout = setTimeout(function () {
			setIsTyping(true);
		}, delay);

		return () => clearTimeout(timeout);
	}, [delay, setIsTyping]);

	React.useEffect(() => {
		if (isTyping) {
			setStatus('-- INSERT --');
		} else if (codeElements.length) {
			setStatus(':wq');
			setDisplayCodeCursor(false);
			setDisplayAll(false);
			setDisplayRowsAndCols(false);
		} else {
			setStatus(`"${filename}" [New File]`);
		}
	}, [isTyping, setStatus, setDisplayCodeCursor, filename, setDisplayAll, setDisplayRowsAndCols]);

	React.useEffect(() => {
		let interval: NodeJS.Timer;

		if (programStr && isTyping) {
			interval = setInterval(function () {
				const char = programStr[charIndex];

				if (char === '\n') {
					setCols(1);
					setRows(rows + 1);
					setLineNumbers([
						...lineNumbers.slice(0, rows),
						String(rows + 1),
						...lineNumbers.slice(rows + 1),
					]);
				} else {
					setCols(cols + 1);
				}

				setCodeElements([...codeElements, <span>{char}</span>]);
				setCharIndex(charIndex + 1);
			}, speed);

			if (charIndex === programStr.length) {
				clearInterval(interval);
				setIsTyping(false);
			}
		}

		return () => {
			clearInterval(interval);
		};
	}, [
		isTyping,
		programStr,
		charIndex,
		codeElements,
		setCodeElements,
		setCharIndex,
		setIsTyping,
		speed,
	]);

	function handlePlay() {
		setStatus(`"${filename}" [New File]`);
		setCodeElements([]);
		setDisplayCodeCursor(true);
		setDisplayAll(true);
		setDisplayRowsAndCols(true);
		setCharIndex(0);
		setRows(1);
		setCols(1);
		let arr = [];
		for (let i = 0; i < numLines + 3; i++) {
			arr.push(i === 0 ? '1' : '~');
		}
		setLineNumbers(arr);

		const timeout = setTimeout(function() {
			setIsTyping(true);
			clearTimeout(timeout);
		}, delay);
	}

	return (
		<>
			<button onClick={handlePlay} disabled={isTyping}>
				Play Animation
			</button>
			<Pre>
				<Code>
					<LineNumbers>
						{lineNumbers.map((lineNumber) => (
							<span>{lineNumber}</span>
						))}
					</LineNumbers>
					<TextArea>
						{codeElements}
						{displayCodeCursor && <Cursor />}
					</TextArea>
				</Code>
				<StatusBar>
					<span style={{ flex: '2' }}>{status}</span>
					{displayRowsAndCols && (
						<span style={{ flex: '0.5' }}>
							{rows}, {cols}
						</span>
					)}
					{displayAll && (
						<span style={{flex: '0.5', textAlign: 'right'}}>All</span>
					)}
				</StatusBar>
			</Pre>
		</>
	);
}

export default AnimatedVimEditor;
