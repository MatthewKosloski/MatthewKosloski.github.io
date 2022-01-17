import styled, { css } from 'styled-components';
import { breakpoint, Breakpoints } from '../utils';

const flexRowCss = css`
  flex-direction: row;
`;

const flexColCss = css`
  flex-direction: column;
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
}

const Flex = styled.div<FlexProps>`
  display: flex;

  ${({ flexColXs }) => flexColXs && breakpoint(Breakpoints.XS)(flexColCss)};

  ${({ flexColSm }) => flexColSm && breakpoint(Breakpoints.SM)(flexColCss)};

  ${({ flexColMd }) => flexColMd && breakpoint(Breakpoints.MD)(flexColCss)};

  ${({ flexColLg }) => flexColLg && breakpoint(Breakpoints.LG)(flexColCss)};

  ${({ flexColXl }) => flexColXl && breakpoint(Breakpoints.XL)(flexColCss)};

  ${({ flexRowXs }) => flexRowXs && breakpoint(Breakpoints.XS)(flexRowCss)};

  ${({ flexRowSm }) => flexRowSm && breakpoint(Breakpoints.SM)(flexRowCss)};

  ${({ flexRowMd }) => flexRowMd && breakpoint(Breakpoints.MD)(flexRowCss)};

  ${({ flexRowLg }) => flexRowLg && breakpoint(Breakpoints.LG)(flexRowCss)};

  ${({ flexRowXl }) => flexRowXl && breakpoint(Breakpoints.XL)(flexRowCss)};
`;

export default Flex;
