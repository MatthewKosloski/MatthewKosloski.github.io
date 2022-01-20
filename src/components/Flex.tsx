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

  ${({ flexRowXl, theme }) =>
    flexRowXl &&
    `${theme.media.xl} {
    ${flexRowCss}
  }`}
`;

export default Flex;
