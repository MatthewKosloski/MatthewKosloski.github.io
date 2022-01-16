import React from 'react';
import styled, { css } from 'styled-components';
import { pxToRem } from '../theme';

interface WrapperProps {
  isSmall: boolean;
  isLarge: boolean;
}

const Wrapper = styled.header<WrapperProps>`
  margin-bottom: ${(p) => p.theme.vr.one.rem};
  & > :first-child {
    margin: 0;
    color: ${(p) => p.theme.color.gray600};
    ${(p) =>
      p.isSmall &&
      css`
        font-size: ${pxToRem(20)};
        margin-bottom: ${p.theme.vr.quarter.rem};
      `};
  }
  & > :last-child {
    text-transform: uppercase;
    color: ${(p) => p.theme.color.gray300};
    font-size: ${(p) => p.theme.typography.smallFontSizeRem};
    letter-spacing: ${(p) => p.theme.typography.letterSpacingEm};
    span {
      padding: 0 ${(p) => p.theme.vr.quarter.em};
    }
  }
`;

export enum SubSectionHeaderVariant {
  SMALL,
  LARGE,
}

interface SubSectionHeaderProps {
  children: React.ReactNode;
  variant?: SubSectionHeaderVariant;
}

function SubSectionHeader({
  children,
  variant = SubSectionHeaderVariant.LARGE,
}: SubSectionHeaderProps) {
  return (
    <Wrapper
      isSmall={variant === SubSectionHeaderVariant.SMALL}
      isLarge={variant === SubSectionHeaderVariant.LARGE}
    >
      {children}
    </Wrapper>
  );
}

export default SubSectionHeader;
