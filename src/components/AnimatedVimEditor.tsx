import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export enum TokenType {
	Identifier,
	Integer,
	Keyword,
	Operator,
	Punctuation,
	Whitespace,
}

export interface Token {
	id: string;
	lexeme: string;
	type: TokenType;
}

// An array of Token arrays. Each
// line of text can be accessed from
// the first dimension. Each token
// within a line of text can be accessed
// from the second dimension.
export type Program = Token[][];

/**
 * Calculates the number of columns in each line of text
 * in the provided program.
 * @param program A program, which is an array of Token arrays.
 * @returns An array of size n, where n is the number of
 * first dimensions (lines) in the provided program. Each
 * element in the array is the cumulative lexeme sum of
 * the line.
 */
const getLineCols = (program: Program): number[] => {
	return program.map((line) =>
		line.reduce((prev, curr) => prev + curr.lexeme.length, 0)
	);
};

function Char({
	char,
	isNewLine = false,
}: {
	char?: string;
	isNewLine?: boolean;
}) {
	return (
		<motion.span
			variants={{
				hidden: {
					display: 'none',
				},
				visible: isNewLine
					? {
							visibility: 'visible',
							display: 'inline',
					  }
					: { display: 'inline-block' },
			}}
		>
			{char ?? '\n'}
		</motion.span>
	);
}

const Pre = styled.pre`
	height: 400px;
	background-color: black;
	overflow-y: auto;
	code {
		color: white;
	}
`;

const Code = styled(motion.code)`
	display: flex;
`;

const Cursor = styled.span`
	width: 9px;
	height: 16px;
	display: inline-block;
	vertical-align: middle;
	border: 1px solid white;
`;

const LineNumbers = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 5%;
`;

const TextArea = styled.div`
	flex-basis: 95%;
`;

interface AnimatedVimEditorProps {
	program: Program;
	staggerChildren: number;
	trailingNewLines?: number;
}

function renderTrailingNewLines(trailingNewLines: number) {
	let result: React.ReactElement[] = [];
	for (let i = 0; i < trailingNewLines; ++i) {
		result.push(<span key={`trailingnl${i}`}>~</span>);
	}
	return result;
}

function AnimatedVimEditor({
	program,
	staggerChildren,
	trailingNewLines = 1
}: AnimatedVimEditorProps) {
	const [LineNumDelays, setLineNumDelays] = React.useState<number[]>([]);

	React.useEffect(() => {
		const theoreticalDelays = getLineCols(program)
			// Add one to every number to account for <Char isNewLine />
			.map((c) => c + 1)
			// multiply each number by the amount of time it takes
			// to animate in a character
			.map((c) => c * staggerChildren);

		const delays = [...theoreticalDelays];

		// Set the last item to the sum of all items
		// that come before it, minus staggerChildren
		delays[delays.length - 1] =
			delays.slice(0, delays.length - 1).reduce((a, b) => a + b) -
			staggerChildren;

		// Horner's method??
		for (let i = delays.length - 2; i >= 0; i--) {
			delays[i] = delays[i + 1] - theoreticalDelays[i];
		}

		setLineNumDelays(delays);
	}, [program, staggerChildren]);

	const codeblock = {
		hidden: {
			opacity: 1,
		},
		visible: {
			opacity: 1,
			transition: {
				delay: 0.5,
				staggerChildren,
			},
		},
	};

	return (
		<Pre aria-hidden="true">
			<Code variants={codeblock} initial="hidden" animate="visible">
				<LineNumbers>
					{LineNumDelays.length &&
						program.map((_, lineIndex) => {
							let delay = LineNumDelays[lineIndex];
							return (
								<>
									<motion.span
										key={`~${lineIndex + 1}`}
										initial={{ display: 'block' }}
										animate={{ display: 'none' }}
										transition={{ delay, duration: 0 }}
									>
										~
									</motion.span>
									<motion.span
										key={`#${lineIndex + 1}`}
										initial={{ display: 'none' }}
										animate={{ display: 'block' }}
										transition={{ delay, duration: 0 }}
									>
										{lineIndex + 1}
									</motion.span>
								</>
							);
						})}
					{renderTrailingNewLines(trailingNewLines)}
				</LineNumbers>
				<TextArea>
					{program.map((line, lineIndex) => {
						const isLastLine = lineIndex + 1 === program.length;
						return (
							<>
								{line.map(({ id, lexeme, type }) => {
									return lexeme.split('').map((char, charIndex) => {
										return <Char key={id + charIndex} char={char} />;
									});
								})}
								{!isLastLine && <Char key={`nl${lineIndex}`} isNewLine />}
							</>
						);
					})}
					<Cursor></Cursor>
				</TextArea>
			</Code>
		</Pre>
	);
}

export default AnimatedVimEditor;
