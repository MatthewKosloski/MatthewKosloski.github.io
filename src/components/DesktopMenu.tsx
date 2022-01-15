import React from 'react';
import styled from 'styled-components';
import { pxToEm, pxToRem } from '../theme';

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  margin-bottom: 0;
`;

const MenuItem = styled.li`
  position: relative;
`;

const borderThickness = pxToEm(4);
const MenuItemLink = styled.a`
  display: inline-block;
  font-size: ${pxToRem(13)};
  line-height: 1;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  color: ${(p) => p.theme.color.white500};
  letter-spacing: ${pxToEm(1)};
  transition: color 0.15s ease-in-out;
  padding: calc(${(p) => p.theme.vr.two.rem} - ${borderThickness})
    ${(p) => p.theme.vr.quarter.rem} ${(p) => p.theme.vr.half.rem}
    ${(p) => p.theme.vr.quarter.rem};
  &:before {
    content: '';
    display: block;
    width: calc(100% - (${(p) => p.theme.vr.quarter.rem} * 2));
    height: ${borderThickness};
    background-color: transparent;
    top: 0;
    left: ${(p) => p.theme.vr.quarter.rem};
    position: absolute;
  }
  &:hover {
    color: ${(p) => p.theme.color.eastSidePurple};
  }
`;

function DesktopMenu() {
  return (
    <Wrapper>
      <MenuItem>
        <MenuItemLink href="">Overview</MenuItemLink>
      </MenuItem>
      <MenuItem>
        <MenuItemLink href="">Experience</MenuItemLink>
      </MenuItem>
      <MenuItem>
        <MenuItemLink href="">Projects</MenuItemLink>
      </MenuItem>
      <MenuItem>
        <MenuItemLink href="">Photos</MenuItemLink>
      </MenuItem>
      <MenuItem>
        <MenuItemLink href="">Blog</MenuItemLink>
      </MenuItem>
    </Wrapper>
  );
}

export default DesktopMenu;
