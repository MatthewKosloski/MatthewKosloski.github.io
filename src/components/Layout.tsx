import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { WindowLocation } from '@reach/router';
import '../scss/global.scss';
import '@reach/menu-button/styles.css';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuPopover,
  MenuLink,
  useMenuButtonContext,
} from '@reach/menu-button';
import theme from '../theme';
import GlobalStyle from './GlobalStyle';
import HamburgerIcon from './icons/HamburgerIcon';
import withScreenReaderText from './hoc/withScreenReaderText';
import DesktopMenu from './DesktopMenu';
import SocialLinks from './SocialLinks';
import Grid from './Grid';
import GridCol from './GridCol';
import Head from './Head';
import CloseIcon from './icons/CloseIcon';
import Section from './Section';

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

const Logo = styled.a`
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

const Wrapper = styled.div<{ isNewspaper: boolean }>`
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  box-shadow: ${(p) =>
    p.isNewspaper ? '0px 0px 4px 0px rgb(0 0 0 / 10%)' : 'none'};
  background-color: ${(p) =>
    p.isNewspaper ? p.theme.color.white : 'transparent'};
`;

function Footer({
  children,
  title,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
} & JSX.IntrinsicElements['footer']) {
  return (
    <Section as="footer" title={title} {...props}>
      {children}
    </Section>
  );
}

function Layout({ children, location, pageTitle, pageSubtitle }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head location={location} />
        <GlobalStyle />
        <Wrapper isNewspaper>
          <HeaderWrapper>
            <StyledNav>
              <Logo href="">
                <h1 className="h4">Matthew Kosloski</h1>
              </Logo>
              <div className="u-display-none:sm">
                <MobileMenu />
              </div>
              <div className="u-display-none:xs u-display-block:sm">
                <DesktopMenu />
              </div>
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
          <Footer>
            <Grid>
              <GridCol xs={12} sm={8} smOffset={3}>
                <SocialLinks />
              </GridCol>
            </Grid>
          </Footer>
        </Wrapper>
        <Wrapper isNewspaper={false}>
          <div className="u-text-center:xs u-my--two:xs u-mx--half:xs">
            <p>
              <small>
                This website is <a href="#">open source</a> on GitHub. Feel free
                to fork it!
              </small>
            </p>
          </div>
        </Wrapper>
      </>
    </ThemeProvider>
  );
}

export default Layout;
