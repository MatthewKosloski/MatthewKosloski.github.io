import React from 'react';
import styled from 'styled-components';
interface TerminalProps {
	content: TerminalContentItem[];
	preStyles: React.CSSProperties;
}

export interface TerminalContentItem {
	id: string;
	isCommand: boolean;
	isCurrent: boolean;
	text: string;
}

function renderContent(content: TerminalContentItem[]) {
	return content.map(({ isCurrent, isCommand, text, id }, i) => {
		const fragmentKey = `${id}-fragment`;
		const promptSignKey = `${id}-promptSign`;
		return (
			<React.Fragment key={fragmentKey}>
				<span
					key={id}
					data-line-type={isCommand ? 'command' : 'output'}
					style={{ display: 'block' }}
				>
					{isCommand ? <PromptSign key={promptSignKey}>$ </PromptSign> : null}
					<span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
						{text}
					</span>
					{isCurrent && isCommand ? <Cursor /> : null}
				</span>
			</React.Fragment>
		);
	});
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
	overflow-y: auto;
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
