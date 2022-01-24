import React from 'react';
import styled, { css } from 'styled-components';

interface WrapperProps {
	isSmall: boolean;
	isLarge: boolean;
	hasBottomMargin: boolean;
}

const Wrapper = styled.header<WrapperProps>`
	${(p) =>
		p.hasBottomMargin &&
		css`
			margin-bottom: ${p.theme.vr.one.rem};
		`};
	& > :first-child {
		margin: 0;
		color: ${(p) => p.theme.color.gray600};
		${(p) =>
			p.isSmall &&
			css`
				font-size: ${(p) => p.theme.utils.pxToRem(20)};
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
	noBottomMargin?: boolean;
}

function SubSectionHeader({
	children,
	variant = SubSectionHeaderVariant.LARGE,
	noBottomMargin = false,
	...rest
}: SubSectionHeaderProps & JSX.IntrinsicElements['header']) {
	return (
		<Wrapper
			isSmall={variant === SubSectionHeaderVariant.SMALL}
			isLarge={variant === SubSectionHeaderVariant.LARGE}
			hasBottomMargin={!noBottomMargin}
			{...rest}
		>
			{children}
		</Wrapper>
	);
}

export default SubSectionHeader;
