import styled, { css } from 'styled-components';

const justifyEndCss = css`
	justify-content: flex-end;
`;

const flexCss = css`
	display: flex;
`;

const displayNoneCss = css`
	display: none;
`;

interface FlexColProps {
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	flexXs?: boolean;
	flexSm?: boolean;
	flexMd?: boolean;
	flexLg?: boolean;
	flexXl?: boolean;
	widthAutoXs?: boolean;
	widthAutoSm?: boolean;
	widthAutoMd?: boolean;
	widthAutoLg?: boolean;
	widthAutoXl?: boolean;
	justifyEndXs?: boolean;
	justifyEndSm?: boolean;
	justifyEndMd?: boolean;
	justifyEndLg?: boolean;
	justifyEndXl?: boolean;
	displayNoneXs?: boolean;
	displayNoneSm?: boolean;
	displayNoneMd?: boolean;
	displayNoneLg?: boolean;
	displayNoneXl?: boolean;
}

const FlexCol = styled.div<FlexColProps>`
	${({ xs, theme }) =>
		xs
			? css`
					${theme.media.xs} {
						flex-basis: ${(xs / theme.grid.numberColumns) * 100}%;
					}
			  `
			: ''}

	${({ sm, theme }) =>
		sm
			? css`
					${theme.media.sm} {
						flex-basis: ${(sm / theme.grid.numberColumns) * 100}%;
					}
			  `
			: ''}

  ${({ md, theme }) =>
		md
			? css`
					${theme.media.md} {
						flex-basis: ${(md / theme.grid.numberColumns) * 100}%;
					}
			  `
			: ''}

  ${({ lg, theme }) =>
		lg
			? css`
					${theme.media.lg} {
						flex-basis: ${(lg / theme.grid.numberColumns) * 100}%;
					}
			  `
			: ''}

  ${({ xl, theme }) =>
		xl
			? css`
					${theme.media.xl} {
						flex-basis: ${(xl / theme.grid.numberColumns) * 100}%;
					}
			  `
			: ''}

  ${({ widthAutoXs, theme }) =>
		widthAutoXs
			? css`
					${theme.media.xs} {
						flex-basis: auto;
					}
			  `
			: ''}

  ${({ widthAutoSm, theme }) =>
		widthAutoSm
			? css`
					${theme.media.sm} {
						flex-basis: auto;
					}
			  `
			: ''}

  ${({ widthAutoMd, theme }) =>
		widthAutoMd
			? css`
					${theme.media.md} {
						flex-basis: auto;
					}
			  `
			: ''}

  ${({ widthAutoLg, theme }) =>
		widthAutoLg
			? css`
					${theme.media.lg} {
						flex-basis: auto;
					}
			  `
			: ''}

  ${({ widthAutoXl, theme }) =>
		widthAutoXl
			? css`
					${theme.media.xl} {
						flex-basis: auto;
					}
			  `
			: ''}

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

${({ displayNoneXs, theme }) =>
		displayNoneXs &&
		`${theme.media.xs} {
${displayNoneCss}
}`}

${({ displayNoneSm, theme }) =>
		displayNoneSm &&
		`${theme.media.sm} {
${displayNoneCss}
}`}

${({ displayNoneMd, theme }) =>
		displayNoneMd &&
		`${theme.media.md} {
${displayNoneCss}
}`}

${({ displayNoneLg, theme }) =>
		displayNoneLg &&
		`${theme.media.lg} {
${displayNoneCss}
}`}

${({ displayNoneXl, theme }) =>
		displayNoneXl &&
		`${theme.media.xl} {
${displayNoneCss}
}`}

${({ flexXs, theme }) =>
		flexXs &&
		`${theme.media.xs} {
${flexCss}
}`}

${({ flexSm, theme }) =>
		flexSm &&
		`${theme.media.sm} {
${flexCss}
}`}

${({ flexMd, theme }) =>
		flexMd &&
		`${theme.media.md} {
${flexCss}
}`}

${({ flexLg, theme }) =>
		flexLg &&
		`${theme.media.lg} {
${flexCss}
}`}

${({ flexXl, theme }) =>
		flexXl &&
		`${theme.media.xl} {
${flexCss}
}`}
`;

export default FlexCol;
