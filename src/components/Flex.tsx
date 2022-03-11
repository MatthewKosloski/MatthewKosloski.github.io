import styled, { css } from 'styled-components';

const flexRowCss = css`
	flex-direction: row;
`;

const flexColCss = css`
	flex-direction: column;
`;

const justifyCenterCss = css`
	justify-content: center;
`;

const justifyEndCss = css`
	justify-content: flex-end;
`;

const alignCenterCss = css`
	align-items: center;
`;

interface FlexProps {
	flexRowXs?: boolean;
	flexRowSm?: boolean;
	flexRowMd?: boolean;
	flexRowLg?: boolean;
	flexRowXl?: boolean;
	flexColXs?: boolean;
	flexColSm?: boolean;
	flexColMd?: boolean;
	flexColLg?: boolean;
	flexColXl?: boolean;
	justifyCenterXs?: boolean;
	justifyCenterSm?: boolean;
	justifyCenterMd?: boolean;
	justifyCenterLg?: boolean;
	justifyCenterXl?: boolean;
	justifyEndXs?: boolean;
	justifyEndSm?: boolean;
	justifyEndMd?: boolean;
	justifyEndLg?: boolean;
	justifyEndXl?: boolean;
	alignCenterXs?: boolean;
	alignCenterSm?: boolean;
	alignCenterMd?: boolean;
	alignCenterLg?: boolean;
	alignCenterXl?: boolean;
}

const Flex = styled.div<FlexProps>`
	display: flex;

	${({ flexColXs, theme }) =>
		flexColXs &&
		`${theme.media.xs} {
    ${flexColCss}
  }`}

	${({ flexColSm, theme }) =>
		flexColSm &&
		`${theme.media.sm} {
    ${flexColCss}
  }`}

  ${({ flexColMd, theme }) =>
		flexColMd &&
		`${theme.media.md} {
    ${flexColCss}
  }`}

  ${({ flexColLg, theme }) =>
		flexColLg &&
		`${theme.media.lg} {
    ${flexColCss}
  }`}

  ${({ flexColXl, theme }) =>
		flexColXl &&
		`${theme.media.xl} {
    ${flexColCss}
  }`}
  
  ${({ flexRowXs, theme }) =>
		flexRowXs &&
		`${theme.media.xs} {
    ${flexRowCss}
  }`}

  ${({ flexRowSm, theme }) =>
		flexRowSm &&
		`${theme.media.sm} {
    ${flexRowCss}
  }`}

  ${({ flexRowMd, theme }) =>
		flexRowMd &&
		`${theme.media.md} {
    ${flexRowCss}
  }`}

  ${({ flexRowLg, theme }) =>
		flexRowLg &&
		`${theme.media.lg} {
    ${flexRowCss}
  }`}

  ${({ justifyCenterXl, theme }) =>
		justifyCenterXl &&
		`${theme.media.xl} {
    ${justifyCenterCss}
  }`}

	${({ justifyCenterXs, theme }) =>
		justifyCenterXs &&
		`${theme.media.xs} {
	${justifyCenterCss}
}`}

${({ justifyCenterSm, theme }) =>
		justifyCenterSm &&
		`${theme.media.sm} {
	${justifyCenterCss}
}`}

${({ justifyCenterMd, theme }) =>
		justifyCenterMd &&
		`${theme.media.md} {
	${justifyCenterCss}
}`}

${({ justifyCenterLg, theme }) =>
		justifyCenterLg &&
		`${theme.media.lg} {
	${justifyCenterCss}
}`}

${({ justifyCenterXl, theme }) =>
		justifyCenterXl &&
		`${theme.media.xl} {
	${justifyCenterCss}
}`}

${({ justifyEndXs, theme }) =>
		justifyEndXs &&
		`${theme.media.xs} {
${justifyEndCss}
}`}

${({ justifyEndSm, theme }) =>
		justifyEndSm &&
		`${theme.media.sm} {
${justifyEndCss}
}`}

${({ justifyEndMd, theme }) =>
		justifyEndMd &&
		`${theme.media.md} {
${justifyEndCss}
}`}

${({ justifyEndLg, theme }) =>
		justifyEndLg &&
		`${theme.media.lg} {
${justifyEndCss}
}`}

${({ justifyEndXl, theme }) =>
		justifyEndXl &&
		`${theme.media.xl} {
${justifyEndCss}
}`}

${({ alignCenterXs, theme }) =>
		alignCenterXs &&
		`${theme.media.xs} {
${alignCenterCss}
}`}

${({ alignCenterSm, theme }) =>
		alignCenterSm &&
		`${theme.media.sm} {
${alignCenterCss}
}`}

${({ alignCenterMd, theme }) =>
		alignCenterMd &&
		`${theme.media.md} {
${alignCenterCss}
}`}

${({ alignCenterLg, theme }) =>
		alignCenterLg &&
		`${theme.media.lg} {
${alignCenterCss}
}`}

${({ alignCenterXl, theme }) =>
		alignCenterXl &&
		`${theme.media.xl} {
${alignCenterCss}
}`}
`;

export default Flex;
