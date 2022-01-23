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
	${({
		$isPrimary,
		$isSecondary,
		$isSmall,
		$isRounded,
		$isFullyRounded,
		theme: { utils, color, vr, typography: type },
	}) => `
	display: inline-block;
	border: ${utils.pxToEm(2)} solid ${
		$isSecondary ? color.eastSidePurple : 'transparent'
	};
	background-color: ${$isPrimary ? color.eastSidePurple : 'transparent'};
	border-radius: ${$isFullyRounded && '100px'};
	border-radius: ${$isRounded && utils.pxToEm(5)};
	padding: ${vr.half.rem} ${vr.one.rem};
	padding-bottom: calc(${vr.half.rem} - ${utils.pxToEm(2)});
	transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
	text-decoration: none;
	text-transform: uppercase;
	text-align: center;
	font-weight: 700;
	font-family: ${type.body};
	font-size: ${$isSmall ? type.smallFontSizeRem : type.largeFontSizeRem};
	letter-spacing: ${type.letterSpacingEm};
	color: ${$isPrimary ? color.grapePurple : color.eastSidePurple};
	line-height: 1;
	&:hover {
		background-color: ${$isPrimary ? '#d1b5e7' : color.eastSidePurple};
		color: ${$isSecondary && color.grapePurple};
	}
	&:not(:last-child) {
		margin-right: ${vr.one.rem};
	}
	`}
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
