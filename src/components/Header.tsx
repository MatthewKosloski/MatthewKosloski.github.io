import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { DesktopMenu, Grid, GridCol, MobileMenu } from '.';

const StyledHeader = styled.header`
	padding-top: ${(p) => p.theme.vr.two.rem};

	${({ theme }) => `${theme.media.sm} {
    padding-top: ${theme.vr.five.rem};
    max-width: 75%;
  }`}

	h2 {
		color: ${(p) => p.theme.color.white};
		margin-bottom: ${(p) => p.theme.vr.quarter.rem};
	}
	h3 {
		font-size: 1rem;
		font-weight: 400;
		font-family: ${(p) => p.theme.typography.body};
		color: ${(p) => p.theme.color.white500};
	}
`;

const HeaderWrapper = styled.div`
	background-color: ${(p) => p.theme.color.haitiPurple};
	padding: ${(p) => p.theme.vr.one.em} ${(p) => p.theme.vr.one.em}
		${(p) => p.theme.vr.two.em} ${(p) => p.theme.vr.one.em};

	${({ theme }) => `${theme.media.sm} {
    padding: 0 ${theme.vr.two.rem} ${theme.vr.four.rem} ${theme.vr.two.rem};
  }`}
`;

const Nav = styled.nav`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
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

interface HeaderProps {
	pageTitle?: string;
	pageSubtitle?: string;
}

function Header({ pageTitle, pageSubtitle }: HeaderProps) {
	return (
		<HeaderWrapper>
			<Nav>
				<Logo to="/">
					<h1 className="h4">Matthew Kosloski</h1>
				</Logo>
				<MobileMenu />
				<DesktopMenu />
			</Nav>
			{pageTitle || pageSubtitle ? (
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

export default Header;
