import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';

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

interface WrapperProps {
	$isPrimary: boolean;
	$isSecondary: boolean;
	$isSmall: boolean;
	$isLarge: boolean;
	$isRounded: boolean;
	$isFullyRounded: boolean;
	$isNotRounded: boolean;
}

const buttonStyles = css<WrapperProps>`
	border: ${(p) => p.theme.utils.pxToEm(2)} solid
		${(p) => (p.$isSecondary ? p.theme.color.eastSidePurple : 'transparent')};
	background-color: ${(p) =>
		p.$isPrimary ? p.theme.color.eastSidePurple : 'transparent'};
	color: ${(p) =>
		p.$isPrimary ? p.theme.color.grapePurple : p.theme.color.eastSidePurple};
	border-radius: ${(p) => p.$isFullyRounded && '100px'};
	border-radius: ${(p) => p.$isRounded && p.theme.utils.pxToEm(5)};
	padding: ${(p) => p.theme.vr.half.rem} ${(p) => p.theme.vr.one.rem};
	padding-bottom: calc(
		${(p) => p.theme.vr.half.rem} - ${(p) => p.theme.utils.pxToEm(2)}
	);
	text-decoration: none;
	transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
	text-align: center;
	display: inline-block;
	text-transform: uppercase;
	letter-spacing: ${(p) => p.theme.typography.letterSpacingEm};
	font-weight: 700;
	font-family: ${(p) => p.theme.typography.heading};
	font-size: ${({ $isSmall, theme: { typography } }) =>
		$isSmall ? typography.smallFontSizeRem : typography.largeFontSizeRem};
	line-height: 1;
	&:hover {
		background-color: ${(p) =>
			p.$isPrimary ? '#d1b5e7' : p.theme.color.eastSidePurple};
		color: ${(p) => p.$isSecondary && p.theme.color.grapePurple};
	}
	&:not(:last-child) {
		margin-right: ${(p) => p.theme.vr.one.rem};
	}
`;

const StyledButtonLinkExternal = styled.a`
	${buttonStyles}
`;
const StyledButtonLinkInternal = styled(GatsbyLink)`
	${buttonStyles}
`;

interface ButtonLinkProps {
	children: React.ReactNode;
	variant?: ButtonLinkVariant;
	size?: ButtonLinkSize;
	roundness?: ButtonLinkRoundness;
}

function ButtonLinkExternal({
	children,
	variant = ButtonLinkVariant.PRIMARY,
	size = ButtonLinkSize.SMALL,
	roundness = ButtonLinkRoundness.FULLY,
	...rest
}: ButtonLinkProps & Omit<JSX.IntrinsicElements['a'], 'ref'>) {
	return (
		<StyledButtonLinkExternal
			$isPrimary={variant === ButtonLinkVariant.PRIMARY}
			$isSecondary={variant === ButtonLinkVariant.SECONDARY}
			$isSmall={size === ButtonLinkSize.SMALL}
			$isLarge={size === ButtonLinkSize.LARGE}
			$isRounded={roundness === ButtonLinkRoundness.ROUNDED}
			$isFullyRounded={roundness === ButtonLinkRoundness.FULLY}
			$isNotRounded={roundness === ButtonLinkRoundness.NONE}
			{...rest}
		>
			{children}
		</StyledButtonLinkExternal>
	);
}

interface ButtonLinkInternalProps
	extends Omit<GatsbyLinkProps<DefaultTheme>, 'ref'> {
	children: React.ReactNode;
	variant?: ButtonLinkVariant;
	size?: ButtonLinkSize;
	roundness?: ButtonLinkRoundness;
}

function ButtonLinkInternal({
	children,
	variant = ButtonLinkVariant.PRIMARY,
	size = ButtonLinkSize.SMALL,
	roundness = ButtonLinkRoundness.FULLY,
	...rest
}: ButtonLinkInternalProps) {
	return (
		<StyledButtonLinkInternal
			$isPrimary={variant === ButtonLinkVariant.PRIMARY}
			$isSecondary={variant === ButtonLinkVariant.SECONDARY}
			$isSmall={size === ButtonLinkSize.SMALL}
			$isLarge={size === ButtonLinkSize.LARGE}
			$isRounded={roundness === ButtonLinkRoundness.ROUNDED}
			$isFullyRounded={roundness === ButtonLinkRoundness.FULLY}
			$isNotRounded={roundness === ButtonLinkRoundness.NONE}
			{...rest}
		>
			{children}
		</StyledButtonLinkInternal>
	);
}

export { ButtonLinkInternal, ButtonLinkExternal };
