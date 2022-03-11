import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { DesktopMenu, Grid, GridCol, MobileMenu } from '.';
import { useMenuLinks } from '../hooks';
import { useLocation } from '@reach/router';

interface HeaderProps {
	pageTitle?: string;
	pageSubtitle?: string;
}

function Header({ pageTitle, pageSubtitle }: HeaderProps) {
	const menuLinks = useMenuLinks();
	const { pathname } = useLocation();
	return (
		<HeaderWrapper>
			<Nav>
				<Logo to="/">
					<h1 className="h4">Matthew Kosloski</h1>
				</Logo>
				<MobileMenu menuLinks={menuLinks} />
				<DesktopMenu menuLinks={menuLinks} pathname={pathname} />
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

const HeaderWrapper = styled.div`
	${({ theme: { color, vr, media } }) => css`
		background-color: ${color.haitiPurple};
		padding: ${vr.one.rem} ${vr.one.rem} ${vr.two.rem} ${vr.one.rem};
		${media.sm} {
			padding: 0 ${vr.two.rem} ${vr.four.rem} ${vr.two.rem};
		}
	`}
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

export default Header;
