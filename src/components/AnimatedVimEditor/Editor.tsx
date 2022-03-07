import React from 'react';
import styled, { css } from 'styled-components';
import { EditorDatum } from './editorContentGenerator';
import { TokenType } from './Renderer';
interface EditorProps {
	isPlaying: boolean;
	data: EditorDatum[];
	lineNumbers: { lineNumber: string; id: string }[];
	rows: number;
	cols: number;
	statusText: string;
	command: string;
	autoScrollAfterLine: number;
	autoScroll: boolean;
	preStyles?: React.CSSProperties;
	highlights?: Map<TokenType, string>;
	fallbackHighlight?: string;
}

const Editor: React.FunctionComponent<EditorProps> = ({
	isPlaying,
	data,
	lineNumbers,
	rows,
	command,
	cols,
	statusText,
	autoScrollAfterLine,
	autoScroll,
	preStyles,
	highlights,
	fallbackHighlight,
}: EditorProps) => {
	const codeRef = React.createRef<HTMLPreElement>();

	React.useEffect(() => {
		if (codeRef.current && rows >= autoScrollAfterLine && autoScroll) {
			codeRef.current.scrollTop = codeRef.current.scrollHeight;
		}
	}, [rows, autoScrollAfterLine, autoScroll]);

	return (
		<Pre style={preStyles}>
			<Code ref={codeRef}>
				<LineNumbers>
					{lineNumbers.map(({ lineNumber, id }) => (
						<span key={id}>{lineNumber}</span>
					))}
				</LineNumbers>
				<TextArea>
					{data.map(({ id, char, tokenType }) => (
						<HighlightedCharacter
							key={id}
							highlights={highlights!}
							fallbackHighlight={fallbackHighlight!}
							tokenType={tokenType}
						>
							{char}
						</HighlightedCharacter>
					))}
					{isPlaying && <Cursor />}
				</TextArea>
			</Code>
			<StatusBar>
				{command ? (
					<StatusText>
						{command}
						<Cursor />
					</StatusText>
				) : (
					<StatusText>{statusText}</StatusText>
				)}
				<StatusPosition>
					{rows}, {cols}
				</StatusPosition>
			</StatusBar>
		</Pre>
	);
};

Editor.defaultProps = {
	fallbackHighlight: '#fff',
};

const Pre = styled.pre`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #2b303b;
	height: 400px;
`;

const Code = styled.code`
	display: flex;
	overflow-y: auto;
	overflow-x: hidden;
`;

const LineNumbers = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 5%;
	color: #6a7580;
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

const StatusText = styled.span`
	flex: 3;
`;

const StatusPosition = styled.span`
	flex: 0.5;
	text-align: right;
`;

const HighlightedCharacter = styled.span<{
	highlights: Map<TokenType, string>;
	fallbackHighlight: string;
	tokenType: TokenType;
}>`
	${({ highlights, fallbackHighlight, tokenType }) => css`
		color: ${highlights?.get(tokenType) ?? fallbackHighlight};
	`}
`;

export default Editor;
