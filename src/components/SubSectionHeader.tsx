import React from 'react';
import styled, { css } from 'styled-components';
import { pxToRem } from '../theme';

const Wrapper = styled.header.attrs(
  ({ variant }: { variant: SubSectionHeaderVariant }) => ({
    variant,
  })
)`
  margin-bottom: ${(p) => p.theme.vr.one.rem};
  & > :first-child {
    margin: 0;
    color: ${(p) => p.theme.color.gray600};
    ${(p) =>
      p.variant === SubSectionHeaderVariant.SMALL &&
      css`
        font-size: ${pxToRem(20)};
        margin-bottom: ${p.theme.vr.quarter.rem};
      `};
  }
  & > :last-child {
    text-transform: uppercase;
    color: ${(p) => p.theme.color.gray300};
    font-size: ${(p) => p.theme.typography.smallFontSizeRem};
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
  return <Wrapper variant={variant}>{children}</Wrapper>;
}

export default SubSectionHeader;
