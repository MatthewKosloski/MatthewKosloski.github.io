import styled, { css } from 'styled-components';

interface FlexColProps {
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	widthAutoXs?: boolean;
	widthAutoSm?: boolean;
	widthAutoMd?: boolean;
	widthAutoLg?: boolean;
	widthAutoXl?: boolean;
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
`;

export default FlexCol;
