import React from 'react';
import styled, { css } from 'styled-components';
import { TerminalContent } from './terminalContentGenerator';
interface TerminalProps {
	content: TerminalContent[];
}

function renderContent(content: TerminalContent[]) {
	return content.map(
		({ isCurrent, isFirstCharOfCmd, isCommand, text, id }, i) => {
			return (
				<span key={id}>
					{isFirstCharOfCmd && isCommand ? `${i === 0 ? '' : '\n'}$ ` : ''}
					{text}
					{isCurrent && isCommand ? <Cursor /> : null}
				</span>
			);
		}
	);
}

function Terminal({ content }: TerminalProps) {
	return (
		<Pre>
			<Code>{renderContent(content)}</Code>
		</Pre>
	);
}

const Pre = styled.pre`
	background-color: #000;
	height: 150px;
`;

const Code = styled.code`
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

export default Terminal;
