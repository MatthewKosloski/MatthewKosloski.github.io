import React, { useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
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
import theme, { pxToEm, sm } from '../theme';
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
  ${sm(css`
    padding-left: 0;
    padding-right: 0;
  `)};
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
  padding: ${(p) => p.theme.vr.one.em};
  ${sm(css`
    padding: 0 ${(p) => p.theme.vr.two.rem} ${(p) => p.theme.vr.four.rem}
      ${(p) => p.theme.vr.two.rem};
  `)};
`;

const StyledMenuPopover = styled(MenuPopover)`
  left: 0 !important;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.haitiPurple};
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
  letter-spacing: ${pxToEm(1)};
  font-weight: 700;
  color: ${(p) => p.theme.color.white500};
  border-top: ${pxToEm(2)} solid ${(p) => p.theme.color.white100};
  &:last-child {
    border-bottom: ${pxToEm(2)} solid ${(p) => p.theme.color.white100};
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

function Layout({ children, location }: LayoutProps) {
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
            <Grid>
              <GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
                <StyledHeader>
                  <h2>Page Title</h2>
                  <h3>Page Subtitle</h3>
                </StyledHeader>
              </GridCol>
            </Grid>
          </HeaderWrapper>
          <main>{children}</main>
          <Footer title="Contact">
            <Grid>
              <GridCol xs={12} md={10} mdOffset={2} lg={8} lgOffset={3}>
                <p className="u-text-center:xs u-mb--two:xs">
                  If you'd like to get in contact with me, email me at{' '}
                  <em>firstlast</em>@me.com, where <em>firstlast</em> is a
                  concatenation of my first and last name.
                </p>
              </GridCol>
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