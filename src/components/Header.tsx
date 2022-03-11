import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { DesktopMenu, Flex, Grid, GridCol, MobileMenu } from '.';
import { useMenuLinks } from '../hooks';
import { useLocation } from '@reach/router';
import FlexCol from './FlexCol';

interface HeaderProps {
	pageTitle?: string;
	pageSubtitle?: string;
	isHomepage?: boolean;
}

function Header({ pageTitle, pageSubtitle, isHomepage = false }: HeaderProps) {
	const menuLinks = useMenuLinks();
	const { pathname } = useLocation();
	return (
		<HeaderWrapper isHomepage={isHomepage}>
			<Nav isHomepage={isHomepage}>
				{!isHomepage && (
					<Logo to="/">
						<h1 className="h4">Matthew Kosloski</h1>
					</Logo>
				)}
				<MobileMenu menuLinks={menuLinks} />
				<DesktopMenu menuLinks={menuLinks} pathname={pathname} />
			</Nav>
			{isHomepage && (
				<HeroWrapper>
					<FlexCol xs={6}>
						<p>Left side of hero</p>
					</FlexCol>
					<FlexCol xs={6}>
						<p>Right side of hero</p>
					</FlexCol>
				</HeroWrapper>
			)}
			{!isHomepage && (pageTitle || pageSubtitle) ? (
				<Grid>
					<GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
						<StyledHeader>
							{pageTitle && <h2>{pageTitle}</h2>}
							{pageSubtitle && <h3>{pageSubtitle}</h3>}
						</StyledHeader>
					</GridCol>
				</Grid>
			) : null}
		</HeaderWrapper>
	);
}

const StyledHeader = styled.header`
	${({ theme: { color, vr, media, typography } }) => css`
		padding-top: ${vr.two.rem};

		${media.sm} {
			padding-top: ${vr.five.rem};
			max-width: 75%;
		}

		h2 {
			color: ${color.white};
			margin-bottom: ${vr.quarter.rem};
		}
		h3 {
			font-size: 1rem;
			font-weight: 400;
			font-family: ${typography.body};
			color: ${color.white500};
		}
	`}
`;

const HeaderWrapper = styled.div<{ isHomepage: boolean; }>`
	${({ theme: { color, vr, media }, isHomepage }) => css`
		background-color: ${color.haitiPurple};
		padding: ${vr.one.rem} ${vr.one.rem} ${isHomepage ? 0 : vr.two.rem} ${vr.one.rem};
		${media.sm} {
			padding: 0 ${vr.two.rem} ${isHomepage ? 0 : vr.four.rem} ${vr.two.rem};
		}
	`}
`;

const Nav = styled.nav<{ isHomepage: boolean; }>`
	${({ isHomepage }) => `
		display: flex;
		align-items: flex-end;
		justify-content: ${isHomepage ? 'center' : 'space-between'};
	`}
`;

const Logo = styled(Link)`
	${({ theme: { color, media, vr } }) => css`
		text-decoration: none;
		h1 {
			margin-bottom: ${vr.zero.em};
			padding: 0;
			${media.md} {
				padding: ${vr.half.rem} ${vr.quarter.rem} ${vr.quarter.rem};
			}
			color: ${color.white};
		}
	`}
`;

const HeroWrapper = styled(Flex)`
	${({ theme: { color } }) => css`
		color: ${color.white500};
	`}
`;

export default Header;
