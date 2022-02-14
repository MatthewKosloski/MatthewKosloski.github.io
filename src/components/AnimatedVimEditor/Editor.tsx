import React from 'react';
import styled from 'styled-components';
import { EditorDatum, TokenType } from './types';

interface EditorProps {
	isPlaying: boolean;
	data: EditorDatum[];
	filename: string;
	lineNumbers: string[];
	rows: number;
	cols: number;
	statusText: string;
	highlights?: Map<TokenType, string>;
	fallbackHighlight?: string;
}

const Editor: React.FunctionComponent<EditorProps> = ({
	isPlaying,
	data,
	filename,
	lineNumbers,
	rows,
	cols,
	statusText,
	highlights,
	fallbackHighlight,
}: EditorProps) => {
	return (
		<Pre>
			<Code>
				<LineNumbers>
					{lineNumbers.map((lineNumber) => (
						<span>{lineNumber}</span>
					))}
				</LineNumbers>
				<TextArea>
					{data.map(({ id, char, tokenType }) => (
						<span
							key={id}
							style={{ color: highlights?.get(tokenType) ?? fallbackHighlight }}
						>
							{char}
						</span>
					))}
					{isPlaying && <Cursor />}
				</TextArea>
			</Code>
			<StatusBar>
				<StatusText>{statusText}</StatusText>
				<StatusPosition>
					{rows}, {cols}
				</StatusPosition>
				<StatusAll>All</StatusAll>
			</StatusBar>
		</Pre>
	);
};

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

Editor.defaultProps = {
	highlights: defaultHighlights,
	fallbackHighlight: '#fff',
};

const Pre = styled.pre`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 325px;
`;

const Code = styled.code`
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

const StatusText = styled.span`
	flex: 2;
`;

const StatusPosition = styled.span`
	flex: 0.5;
`;

const StatusAll = styled.span`
	flex: 0.5;
	text-align: right;
`;

export default Editor;
