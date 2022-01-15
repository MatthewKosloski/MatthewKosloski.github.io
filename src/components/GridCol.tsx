import styled, { css } from 'styled-components';
import { breakpoint, Breakpoints } from '../utils';

interface GridColProps {
  xs?: number;
  xsOffset?: number;
  sm?: number;
  smOffset?: number;
  md?: number;
  mdOffset?: number;
  lg?: number;
  lgOffset?: number;
  xl?: number;
  xlOffset?: number;
}

const GridCol = styled.div<GridColProps>`
  ${({ xs, xsOffset }) =>
    xs || xsOffset
      ? breakpoint(Breakpoints.XS)(css<GridColProps>`
          ${({ xsOffset }) =>
            xsOffset ? `grid-column-start: ${xsOffset}` : ''};
          ${({ xs }) => (xs ? `grid-column-end: span ${xs}` : '')};
        `)
      : ''}

  ${({ sm, smOffset }) =>
    sm || smOffset
      ? breakpoint(Breakpoints.SM)(css<GridColProps>`
          ${({ smOffset }) =>
            smOffset ? `grid-column-start: ${smOffset}` : ''};
          ${({ sm }) => (sm ? `grid-column-end: span ${sm}` : '')};
        `)
      : ''}

  ${({ md, mdOffset }) =>
    md || mdOffset
      ? breakpoint(Breakpoints.MD)(css<GridColProps>`
          ${({ mdOffset }) =>
            mdOffset ? `grid-column-start: ${mdOffset}` : ''};
          ${({ md }) => (md ? `grid-column-end: span ${md}` : '')};
        `)
      : ''}

  ${({ lg, lgOffset }) =>
    lg || lgOffset
      ? breakpoint(Breakpoints.LG)(css<GridColProps>`
          ${({ lgOffset }) =>
            lgOffset ? `grid-column-start: ${lgOffset}` : ''};
          ${({ lg }) => (lg ? `grid-column-end: span ${lg}` : '')};
        `)
      : ''}

  ${({ xl, xlOffset }) =>
    xl || xlOffset
      ? breakpoint(Breakpoints.XL)(css<GridColProps>`
          ${({ xlOffset }) =>
            xlOffset ? `grid-column-start: ${xlOffset}` : ''};
          ${({ xl }) => (xl ? `grid-column-end: span ${xl}` : '')};
        `)
      : ''}
`;

export default GridCol;
