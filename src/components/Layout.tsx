import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuPopover,
  MenuLink,
  useMenuButtonContext,
} from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import theme from '../theme';
import withScreenReaderText from './hoc/withScreenReaderText';
import { HamburgerIcon, CloseIcon } from './icons';
import {
  DesktopMenu,
  Footer,
  GlobalStyle,
  Grid,
  GridCol,
  Head,
  Wrapper,
} from '.';

interface LayoutProps {
  children: React.ReactNode;
  location: WindowLocation;
  pageTitle?: string;
  pageSubtitle?: string;
}

const MenuButtonIcon = function ({ isExpanded }: { isExpanded: boolean }) {
  const ExpandedIcon = withScreenReaderText(CloseIcon, 'Contract Mobile Menu');
  const ContractedIcon = withScreenReaderText(
    HamburgerIcon,
    'Expand Mobile Menu'
  );

  return isExpanded ? <ExpandedIcon /> : <ContractedIcon />;
};

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

const StyledNav = styled.nav`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  text-decoration: none;
  h1 {
    margin-bottom: ${(p) => p.theme.vr.zero.em};
    padding: ${(p) => p.theme.vr.half.rem} ${(p) => p.theme.vr.quarter.rem}
      ${(p) => p.theme.vr.quarter.rem};
    color: ${(p) => p.theme.color.white};
  }
`;

function MobileMenu() {
  return (
    <Menu>
      <MobileMenuInner />
    </Menu>
  );
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
        <MenuButtonIcon isExpanded={isExpanded} />
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

const MobileMenuWrapper = styled.div`
  ${({ theme }) => `${theme.media.sm} {
    display: none;
  }`}
`;

const DesktopMenuWrapper = styled.div`
  display: none;
  ${({ theme }) => `${theme.media.sm} {
    display: block;
  }`}
`;

function Layout({ children, location, pageTitle, pageSubtitle }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head location={location} />
        <GlobalStyle />
        <Wrapper>
          <HeaderWrapper>
            <StyledNav>
              <Logo to="/">
                <h1 className="h4">Matthew Kosloski</h1>
              </Logo>
              <MobileMenuWrapper>
                <MobileMenu />
              </MobileMenuWrapper>
              <DesktopMenuWrapper>
                <DesktopMenu />
              </DesktopMenuWrapper>
            </StyledNav>
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
          <main>{children}</main>
        </Wrapper>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default Layout;
