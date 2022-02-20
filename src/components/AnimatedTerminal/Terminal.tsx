import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { TerminalContent } from './terminalContentGenerator';
interface TerminalProps {
	content: TerminalContent[];
	preStyles: React.CSSProperties;
}

function renderContent(content: TerminalContent[]) {
	return content.map(
		({ isCurrent, isFirstCharOfCmd, isCommand, text, id }, i) => {
			const fragmentKey = `${id}-fragment`;
			const promptSignKey = `${id}-promptSign`;
			return (
				<React.Fragment key={fragmentKey}>
					{isFirstCharOfCmd && isCommand && i !== 0 ? (
						<span>{'\n'}</span>
					) : null}
					{isFirstCharOfCmd && isCommand ? (
						<PromptSign key={promptSignKey}>$ </PromptSign>
					) : null}
					<span key={id}>
						{text}
						{isCurrent && isCommand ? <Cursor /> : null}
					</span>
				</React.Fragment>
			);
		}
	);
}

function Terminal({ content, preStyles }: TerminalProps) {
	return (
		<Pre style={preStyles}>
			<Code>{renderContent(content)}</Code>
		</Pre>
	);
}

const Pre = styled.pre`
	background-color: #252932;
	height: 150px;
`;

const Code = styled.code`
	color: #a7adba;
`;

const Cursor = styled.span`
	width: 9px;
	height: 16px;
	display: inline-block;
	vertical-align: middle;
	border: 1px solid white;
	background: white;
`;

const PromptSign = styled.span`
	color: #fff;
`;

export default Terminal;
