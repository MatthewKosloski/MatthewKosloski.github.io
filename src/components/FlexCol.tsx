import styled, { css } from 'styled-components';
import { breakpoint, Breakpoints } from '../utils';

const flexBasisCss = (width: string) =>
  css`
    flex-basis: ${width};
  `;

const flexBasisAutoCss = () => flexBasisCss('auto');

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
    xs &&
    breakpoint(Breakpoints.XS)(
      flexBasisCss(`${(xs / theme.grid.numberColumns) * 100}%`)
    )};
  ${({ sm, theme }) =>
    sm &&
    breakpoint(Breakpoints.SM)(
      flexBasisCss(`${(sm / theme.grid.numberColumns) * 100}%`)
    )};
  ${({ md, theme }) =>
    md &&
    breakpoint(Breakpoints.MD)(
      flexBasisCss(`${(md / theme.grid.numberColumns) * 100}%`)
    )};
  ${({ lg, theme }) =>
    lg &&
    breakpoint(Breakpoints.LG)(
      flexBasisCss(`${(lg / theme.grid.numberColumns) * 100}%`)
    )};
  ${({ xl, theme }) =>
    xl &&
    breakpoint(Breakpoints.XL)(
      flexBasisCss(`${(xl / theme.grid.numberColumns) * 100}%`)
    )};
  ${({ widthAutoXs }) =>
    widthAutoXs && breakpoint(Breakpoints.XS)(flexBasisAutoCss())};
  ${({ widthAutoSm }) =>
    widthAutoSm && breakpoint(Breakpoints.SM)(flexBasisAutoCss())};
  ${({ widthAutoMd }) =>
    widthAutoMd && breakpoint(Breakpoints.MD)(flexBasisAutoCss())};
  ${({ widthAutoLg }) =>
    widthAutoLg && breakpoint(Breakpoints.LG)(flexBasisAutoCss())};
  ${({ widthAutoXl }) =>
    widthAutoXl && breakpoint(Breakpoints.XL)(flexBasisAutoCss())};
`;

export default FlexCol;
