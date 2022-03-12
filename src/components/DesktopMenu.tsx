import React from 'react';
import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import { MenuLink } from '../hooks/useMenuLinks';

const borderThickness = 4;

const Wrapper = styled.ul`
	${({ theme: { media } }) => css`
		${media.md} {
			display: flex;
		}
		list-style: none;
		display: none;
		margin-bottom: 0;
	`}
`;

const MenuItem = styled.li`
	position: relative;
`;

const MenuItemLink = styled(GatsbyLink)<{ $isActive: boolean }>`
	${({ theme: { color, vr, utils }, $isActive }) => css`
		display: inline-block;
		font-size: ${utils.pxToRem(13)};
		line-height: 1;
		text-decoration: none;
		font-weight: 700;
		text-transform: uppercase;
		color: ${$isActive ? color.eastSidePurple : color.white500};
		letter-spacing: ${utils.pxToEm(1)};
		transition: color 0.15s ease-in-out;
		padding: calc(${vr.two.rem} - ${utils.pxToEm(borderThickness)})
			${vr.half.rem} ${vr.half.rem} ${vr.half.rem};
		&:before {
			content: '';
			display: block;
			width: calc(100% - (${vr.quarter.rem} * 2));
			height: ${utils.pxToEm(borderThickness)};
			background-color: ${$isActive ? color.eastSidePurple : 'transparent'};
			top: 0;
			left: ${vr.quarter.rem};
			position: absolute;
		}
		&:hover {
			color: ${color.eastSidePurple};
		}
	`}
`;

interface DesktopMenuProps {
	pathname: string;
	menuLinks: MenuLink[];
}

function renderMenuItems({ pathname, menuLinks }: DesktopMenuProps) {
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

function DesktopMenu(props: DesktopMenuProps) {
	return <Wrapper>{renderMenuItems(props)}</Wrapper>;
}

export default DesktopMenu;
