import React from 'react';
import styled from 'styled-components';
import { pxToEm } from '../theme';

export enum ButtonLinkVariant {
  PRIMARY,
  SECONDARY,
}

export enum ButtonLinkSize {
  SMALL,
  LARGE,
}

export enum ButtonLinkRoundness {
  FULLY,
  ROUNDED,
  NONE,
}

interface ButtonLinkProps {
  children: React.ReactNode;
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  roundness?: ButtonLinkRoundness;
}

interface WrapperProps {
  isPrimary: boolean;
  isSecondary: boolean;
  isSmall: boolean;
  isLarge: boolean;
  isRounded: boolean;
  isFullyRounded: boolean;
  isNotRounded: boolean;
}

const Wrapper = styled.a<WrapperProps>`
  border: ${pxToEm(2)} solid
    ${(p) => (p.isSecondary ? p.theme.color.eastSidePurple : 'transparent')};
  background-color: ${(p) =>
    p.isPrimary ? p.theme.color.eastSidePurple : 'transparent'};
  color: ${(p) =>
    p.isPrimary ? p.theme.color.grapePurple : p.theme.color.eastSidePurple};
  border-radius: ${(p) => p.isFullyRounded && '100px'};
  border-radius: ${(p) => p.isRounded && pxToEm(5)};
  padding: ${(p) => p.theme.vr.half.rem} ${(p) => p.theme.vr.one.rem};
  padding-bottom: calc(${(p) => p.theme.vr.half.rem} - ${pxToEm(2)});
  text-decoration: none;
  transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
  text-align: center;
  display: block;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.typography.letterSpacingEm};
  font-weight: 700;
  font-family: ${(p) => p.theme.typography.heading};
  font-size: ${({ isSmall, theme: { typography } }) =>
    isSmall ? typography.smallFontSizeRem : typography.largeFontSizeRem};
  line-height: 1;
  &:hover {
    background-color: ${(p) =>
      p.isPrimary ? '#d1b5e7' : p.theme.color.eastSidePurple};
    color: ${(p) => p.isSecondary && p.theme.color.grapePurple};
  }
  &:not(:last-child) {
    margin-right: ${(p) => p.theme.vr.one.rem};
  }
`;

function ButtonLink({
  children,
  variant = ButtonLinkVariant.PRIMARY,
  size = ButtonLinkSize.SMALL,
  roundness = ButtonLinkRoundness.FULLY,
  ...rest
}: ButtonLinkProps & JSX.IntrinsicElements['a']) {
  return (
    <Wrapper
      isPrimary={variant === ButtonLinkVariant.PRIMARY}
      isSecondary={variant === ButtonLinkVariant.SECONDARY}
      isSmall={size === ButtonLinkSize.SMALL}
      isLarge={size === ButtonLinkSize.LARGE}
      isRounded={roundness === ButtonLinkRoundness.ROUNDED}
      isFullyRounded={roundness === ButtonLinkRoundness.FULLY}
      isNotRounded={roundness === ButtonLinkRoundness.NONE}
      {...rest}
    >
      {children}
    </Wrapper>
  );
}

export default ButtonLink;
