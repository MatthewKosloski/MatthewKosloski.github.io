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
  alignCenterXs?: boolean;
  alignCenterSm?: boolean;
  alignCenterMd?: boolean;
  alignCenterLg?: boolean;
  alignCenterXl?: boolean;
  orderLastXs?: boolean;
  orderLastSm?: boolean;
  orderLastMd?: boolean;
  orderLastLg?: boolean;
  orderLastXl?: boolean;
  orderInitialXs?: boolean;
  orderInitialSm?: boolean;
  orderInitialMd?: boolean;
  orderInitialLg?: boolean;
  orderInitialXl?: boolean;
}

const alignCenterCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const orderLastCss = css`
  order: 999;
`;

const orderInitialCss = css`
  order: initial;
`;

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

  ${({ alignCenterXs }) =>
    alignCenterXs && breakpoint(Breakpoints.XS)(alignCenterCss)};

  ${({ alignCenterSm }) =>
    alignCenterSm && breakpoint(Breakpoints.SM)(alignCenterCss)};

  ${({ alignCenterMd }) =>
    alignCenterMd && breakpoint(Breakpoints.MD)(alignCenterCss)};

  ${({ alignCenterLg }) =>
    alignCenterLg && breakpoint(Breakpoints.LG)(alignCenterCss)};

  ${({ alignCenterXl }) =>
    alignCenterXl && breakpoint(Breakpoints.XL)(alignCenterCss)};

  ${({ orderLastXs }) =>
    orderLastXs && breakpoint(Breakpoints.XS)(orderLastCss)};

  ${({ orderLastSm }) =>
    orderLastSm && breakpoint(Breakpoints.SM)(orderLastCss)};

  ${({ orderLastMd }) =>
    orderLastMd && breakpoint(Breakpoints.MD)(orderLastCss)};

  ${({ orderLastLg }) =>
    orderLastLg && breakpoint(Breakpoints.LG)(orderLastCss)};

  ${({ orderLastXl }) =>
    orderLastXl && breakpoint(Breakpoints.XL)(orderLastCss)};

  ${({ orderInitialXs }) =>
    orderInitialXs && breakpoint(Breakpoints.XS)(orderInitialCss)};

  ${({ orderInitialSm }) =>
    orderInitialSm && breakpoint(Breakpoints.SM)(orderInitialCss)};

  ${({ orderInitialMd }) =>
    orderInitialMd && breakpoint(Breakpoints.MD)(orderInitialCss)};

  ${({ orderInitialLg }) =>
    orderInitialLg && breakpoint(Breakpoints.LG)(orderInitialCss)};

  ${({ orderInitialXl }) =>
    orderInitialXl && breakpoint(Breakpoints.XL)(orderInitialCss)};
`;

export default GridCol;
