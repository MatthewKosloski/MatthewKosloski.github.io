import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import {
	ButtonLinkExternal,
	DesktopMenu,
	Flex,
	Grid,
	GridCol,
	MobileMenu,
} from '.';
import { useMenuLinks } from '../hooks';
import { useLocation } from '@reach/router';
import FlexCol from './FlexCol';
import { StaticImage } from 'gatsby-plugin-image';

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
					<Flex alignCenterXs>
						<FlexCol xs={12} md={6}>
							<h1 className="h2">Matthew Kosloski</h1>
							<p>
								Software Developer, Amateur Photographer, Wannabe Compiler
								Engineer, Casual Gamer, and Mexican Food Consumer
							</p>
							<ButtonLinkExternal href="/kosloski_matthew_resume.pdf">
								View Resume
							</ButtonLinkExternal>
						</FlexCol>
						<FlexCol xs={6} displayNoneXs flexMd justifyEndMd>
							<StaticImage
								src="../../content/index/matthew-kosloski-hero.png"
								alt="A portrait photo of Matthew Kosloski in a purple plaid shirt"
								placeholder="none"
								loading="lazy"
								quality={100}
							/>
						</FlexCol>
					</Flex>
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

const HeaderWrapper = styled.div<{ isHomepage: boolean }>`
	${({ theme: { color, vr, media }, isHomepage }) => css`
		background-color: ${color.haitiPurple};
		padding: ${vr.one.rem} ${vr.one.rem} ${isHomepage ? 0 : vr.two.rem}
			${vr.one.rem};
		${media.md} {
			padding: 0 ${vr.two.rem} ${isHomepage ? 0 : vr.four.rem} ${vr.two.rem};
		}
	`}
`;

const Nav = styled.nav<{ isHomepage: boolean }>`
	${({ isHomepage, theme: { media } }) => `
		display: flex;
		align-items: flex-end;
		justify-content: ${isHomepage ? 'flex-end' : 'space-between'};
		${media.md} {
			justify-content: ${isHomepage ? 'center' : 'space-between'}
		}
	`}
`;

const Logo = styled(Link)`
	${({ theme: { color, media, vr } }) => css`
		text-decoration: none;
		h1 {
			margin-bottom: ${vr.zero.em};
			padding: 0;
			${media.md} {
				padding: ${vr.half.rem} ${vr.half.rem} ${vr.quarter.rem} ${vr.half.rem};
			}
			color: ${color.white};
		}
	`}
`;

const HeroWrapper = styled.div`
	${({ theme: { color, media, vr } }) => `
		h1 {
			margin: 0;
			color: ${color.white};
		}
		p {
			margin-bottom: ${vr.one.rem};
			width: 75%;
			${media.md} {
				width: 100%;
			}
		}
		padding: ${vr.two.rem} 0;
		${media.md} {
			padding-bottom: 0;
		}
		color: ${color.white500};
	`}
`;

export default Header;
