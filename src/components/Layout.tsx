import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';
import '@reach/menu-button/styles.css';
import theme from '../theme';
import {
  DesktopMenu,
  Footer,
  GlobalStyle,
  Grid,
  GridCol,
  Head,
  Wrapper,
  MobileMenu
} from '.';

interface LayoutProps {
  children: React.ReactNode;
  location: WindowLocation;
  pageTitle?: string;
  pageSubtitle?: string;
}

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
              <MobileMenu />
              <DesktopMenu />
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
          <main>
            {children}
          </main>
        </Wrapper>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default Layout;
