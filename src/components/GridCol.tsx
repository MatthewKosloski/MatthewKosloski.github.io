import styled, { css } from 'styled-components';

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

const gridColCss = (
  mediaQuery: string,
  width?: number,
  offset?: number,
  alignCenter?: boolean,
  orderInitial?: boolean,
  orderLast?: boolean
) => {
  if (width || offset || alignCenter || orderInitial || orderLast) {
    return `
        ${mediaQuery} {
          ${width ? `grid-column-end: span ${width};` : ''}
          ${offset ? `grid-column-start: ${offset};` : ''}
          ${
            alignCenter
              ? css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `
              : ''
          } 
          ${orderInitial ? 'order: initial;' : ''} 
          ${orderLast ? 'order: 999;' : ''}
        }
      `;
  }
  return '';
};

const GridCol = styled.div<GridColProps>`
  ${({ theme, xs, xsOffset, alignCenterXs, orderInitialXs, orderLastXs }) =>
    gridColCss(
      theme.media.xs,
      xs,
      xsOffset,
      alignCenterXs,
      orderInitialXs,
      orderLastXs
    )}

  ${({ theme, sm, smOffset, alignCenterSm, orderInitialSm, orderLastSm }) =>
    gridColCss(
      theme.media.sm,
      sm,
      smOffset,
      alignCenterSm,
      orderInitialSm,
      orderLastSm
    )}

    ${({ theme, md, mdOffset, alignCenterMd, orderInitialMd, orderLastMd }) =>
    gridColCss(
      theme.media.md,
      md,
      mdOffset,
      alignCenterMd,
      orderInitialMd,
      orderLastMd
    )}

    ${({ theme, lg, lgOffset, alignCenterLg, orderInitialLg, orderLastLg }) =>
    gridColCss(
      theme.media.lg,
      lg,
      lgOffset,
      alignCenterLg,
      orderInitialLg,
      orderLastLg
    )}

    ${({ theme, xl, xlOffset, alignCenterXl, orderInitialXl, orderLastXl }) =>
    gridColCss(
      theme.media.xl,
      xl,
      xlOffset,
      alignCenterXl,
      orderInitialXl,
      orderLastXl
    )}
`;

export default GridCol;
