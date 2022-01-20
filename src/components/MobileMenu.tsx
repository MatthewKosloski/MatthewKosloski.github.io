import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuPopover,
  MenuLink,
  useMenuButtonContext,
} from '@reach/menu-button';
import withScreenReaderText from './hoc/withScreenReaderText';
import { CloseIcon, HamburgerIcon } from './icons';

const StyledMenuPopover = styled(MenuPopover)`
  left: 0 !important;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.haitiPurple};
  z-index: 2;
`;

const StyledMenuItems = styled(MenuItems)`
  background-color: ${(p) => p.theme.color.haitiPurple};
  border: 0;
`;

const StyledMenuButton = styled(MenuButton)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.color.white};
`;

const StyledMenuLink = styled(MenuLink)`
  padding: ${(p) => p.theme.vr.one.em};
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.utils.pxToEm(1)};
  font-weight: 700;
  color: ${(p) => p.theme.color.white500};
  border-top: ${(p) => p.theme.utils.pxToEm(2)} solid
    ${(p) => p.theme.color.white100};
  &:last-child {
    border-bottom: ${(p) => p.theme.utils.pxToEm(2)} solid
      ${(p) => p.theme.color.white100};
  }
  &:hover {
    background-color: ${(p) => p.theme.color.eastSidePurple};
    color: ${(p) => p.theme.color.grapePurple};
  }
`;

const Wrapper = styled.div`
  ${({ theme }) => `${theme.media.sm} {
    display: none;
  }`}
`;

function MenuIcon({ isExpanded }: { isExpanded: boolean }) {
  const ContractIcon = withScreenReaderText(CloseIcon, 'Contract Mobile Menu');
  const ExpandIcon = withScreenReaderText(
    HamburgerIcon,
    'Contract Mobile Menu'
  );
  return isExpanded ? <ContractIcon /> : <ExpandIcon />;
}

function MobileMenuInner() {
  const { isExpanded } = useMenuButtonContext();

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('has-expanded-mobile-menu');
    } else {
      document.body.classList.remove('has-expanded-mobile-menu');
    }
  }, [isExpanded]);

  return (
    <>
      <StyledMenuButton>
        <MenuIcon isExpanded={isExpanded} />
      </StyledMenuButton>
      <StyledMenuPopover>
        <StyledMenuItems>
          <StyledMenuLink href="#">Overview</StyledMenuLink>
          <StyledMenuLink href="#">Experience</StyledMenuLink>
          <StyledMenuLink href="#">Projects</StyledMenuLink>
          <StyledMenuLink href="#">Photos</StyledMenuLink>
          <StyledMenuLink href="#">Blog</StyledMenuLink>
        </StyledMenuItems>
      </StyledMenuPopover>
    </>
  );
}

function MobileMenu() {
  return (
    <Wrapper>
      <Menu>
        <MobileMenuInner />
      </Menu>
    </Wrapper>
  );
}

export default MobileMenu;
