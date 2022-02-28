import React from 'react';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import { MenuLink } from '../hooks/useMenuLinks';

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

const MenuItemLink = styled(GatsbyLink)<{ $isActive: boolean }>`
	display: inline-block;
	font-size: ${(p) => p.theme.utils.pxToRem(13)};
	line-height: 1;
	text-decoration: none;
	font-weight: 700;
	text-transform: uppercase;
	color: ${(p) =>
		p.$isActive ? p.theme.color.eastSidePurple : p.theme.color.white500};
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
		background-color: ${(p) =>
			p.$isActive ? p.theme.color.eastSidePurple : 'transparent'};
		top: 0;
		left: ${(p) => p.theme.vr.quarter.rem};
		position: absolute;
	}
	&:hover {
		color: ${(p) => p.theme.color.eastSidePurple};
	}
`;

function renderMenuItems(pathname: string, menuLinks: MenuLink[]) {
	return menuLinks.map(
		({ text, path, id }: { text: string; path: string; id: string }) => (
			<MenuItem key={id}>
				<MenuItemLink to={path} $isActive={path === pathname}>
					{text}
				</MenuItemLink>
			</MenuItem>
		)
	);
}

interface DesktopMenuProps {
	pathname: string;
	menuLinks: MenuLink[];
}

function DesktopMenu({ pathname, menuLinks }: DesktopMenuProps) {
	return <Wrapper>{renderMenuItems(pathname, menuLinks)}</Wrapper>;
}

export default DesktopMenu;
