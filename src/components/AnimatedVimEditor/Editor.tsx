import React from 'react';
import styled, { css } from 'styled-components';
import { EditorDatum, TokenType } from './types';

interface EditorProps {
	isPlaying: boolean;
	data: EditorDatum[];
	lineNumbers: { lineNumber: string; id: string }[];
	rows: number;
	cols: number;
	statusText: string;
	command: string;
	height: string;
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
	height,
	highlights,
	fallbackHighlight,
}: EditorProps) => {
	return (
		<Pre height={height}>
			<Code>
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

const Pre = styled.pre<{ height: string }>`
	${({ height }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: ${height};
	`}
`;

const Code = styled.code`
	display: flex;
	overflow-y: auto;
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
