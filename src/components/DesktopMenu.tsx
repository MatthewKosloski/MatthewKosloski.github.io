import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useStaticQuery, graphql, Link } from 'gatsby';

const borderThickness = 4;

const Wrapper = styled.ul`
	list-style: none;
	display: none;
	margin-bottom: 0;
	${({ theme }) => `${theme.media.sm} {
    display: flex;
  }`}
`;

const MenuItem = styled.li`
	position: relative;
`;

const MenuItemLink = styled(Link)`
	display: inline-block;
	font-size: ${(p) => p.theme.utils.pxToRem(13)};
	line-height: 1;
	text-decoration: none;
	font-weight: 700;
	text-transform: uppercase;
	color: ${(p) => p.theme.color.white500};
	letter-spacing: ${(p) => p.theme.utils.pxToEm(1)};
	transition: color 0.15s ease-in-out;
	padding: calc(
			${(p) => p.theme.vr.two.rem} -
				${(p) => p.theme.utils.pxToEm(borderThickness)}
		)
		${(p) => p.theme.vr.quarter.rem} ${(p) => p.theme.vr.half.rem}
		${(p) => p.theme.vr.quarter.rem};
	&:before {
		content: '';
		display: block;
		width: calc(100% - (${(p) => p.theme.vr.quarter.rem} * 2));
		height: ${(p) => p.theme.utils.pxToEm(borderThickness)};
		background-color: transparent;
		top: 0;
		left: ${(p) => p.theme.vr.quarter.rem};
		position: absolute;
	}
	&:hover {
		color: ${(p) => p.theme.color.eastSidePurple};
	}
`;

function renderMenuItems() {
	const {
		site: {
			siteMetadata: { menuLinks },
		},
	} = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					menuLinks {
						text
						path
					}
				}
			}
		}
	`);

	return menuLinks.map(({ text, path }: { text: string; path: string }) => (
		<MenuItem key={uuidv4()}>
			<MenuItemLink to={path}>{text}</MenuItemLink>
		</MenuItem>
	));
}

function DesktopMenu() {
	return <Wrapper>{renderMenuItems()}</Wrapper>;
}

export default DesktopMenu;
