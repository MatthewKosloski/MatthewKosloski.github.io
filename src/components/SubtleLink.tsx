import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import { ArrowRight } from './icons';

const buttonStyles = css`
	${({ theme: { color, utils, typography, vr } }) => `
		color: ${color.gray600};
		font-size: ${typography.smallFontSizeRem};
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: transparent;
		padding: ${vr.quarter.rem} ${vr.half.rem};
		border-radius: 999px;
		transition: background-color 0.15s ease-in-out;
		svg {
			width: ${utils.pxToEm(18)};
			height: ${utils.pxToEm(18)};
			transition: transform 0.15s ease-in-out;
		}
		&:hover {
			background-color: ${color.gray50};
			svg {
				transform: translateX(${utils.pxToEm(2)});
			}
		}
	`}
`;

const StyledSubtleLinkInternal = styled(GatsbyLink)`
	${buttonStyles}
`;
const StyledSubtleLinkExternal = styled.a`
	${buttonStyles}
`;

const ArrowWrapper = styled.div`
	margin-left: ${(p) => p.theme.vr.quarter.rem};
	display: flex;
	align-items: center;
	justify-content: center;
`;

interface SubtleLinkProps {
	children: React.ReactNode;
	hasArrow?: boolean;
}

interface SubtleLinkInternalProps
	extends Omit<GatsbyLinkProps<DefaultTheme>, 'ref'>,
		SubtleLinkProps {
	children: React.ReactNode;
}

function SubtleLinkInternal({
	children,
	hasArrow = true,
	...rest
}: SubtleLinkInternalProps) {
	return (
		<StyledSubtleLinkInternal {...rest}>
			{children}
			{hasArrow && (
				<ArrowWrapper>
					<ArrowRight />
				</ArrowWrapper>
			)}
		</StyledSubtleLinkInternal>
	);
}

function SubtleLinkExternal({
	children,
	hasArrow = true,
	...rest
}: SubtleLinkProps & Omit<JSX.IntrinsicElements['a'], 'ref'>) {
	return (
		<StyledSubtleLinkExternal {...rest}>
			{children}
			{hasArrow && (
				<ArrowWrapper>
					<ArrowRight />
				</ArrowWrapper>
			)}
		</StyledSubtleLinkExternal>
	);
}

export { SubtleLinkInternal, SubtleLinkExternal };
