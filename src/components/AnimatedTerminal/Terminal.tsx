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
						{text.trim()}
					</span>
					{isCurrent && isCommand ? <Cursor isActive={true} /> : null}
				</span>
			</React.Fragment>
		);
	});
}

function Terminal({ content, preStyles }: TerminalProps) {
	const preRef = React.createRef<HTMLPreElement>();

	React.useEffect(() => {
		if (preRef.current) {
			preRef.current.scrollTop = preRef.current.scrollHeight;
		}
	}, [content]);

	return (
		<Pre style={preStyles} ref={preRef}>
			<Code>
				{content.length ? (
					renderContent(content)
				) : (
					<>
						<PromptSign>$ </PromptSign> <Cursor isActive={false} />
					</>
				)}
			</Code>
		</Pre>
	);
}

const Pre = styled.pre`
	background-color: #13161b;
	height: 150px;
	overflow-y: auto;
`;

const Code = styled.code`
	color: #a7adba;
`;

const Cursor = styled.span<{ isActive: boolean }>`
	width: 9px;
	height: 16px;
	display: inline-block;
	vertical-align: middle;
	border: 1px solid white;
	background: ${(p) => (p.isActive ? '#fff' : 'transparent')};
`;

const PromptSign = styled.span`
	color: #fff;
`;

export default Terminal;
