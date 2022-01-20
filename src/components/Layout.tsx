import React from 'react';
import { ThemeProvider } from 'styled-components';
import { WindowLocation } from '@reach/router';
import '@reach/menu-button/styles.css';
import theme from '../theme';
import { Footer, GlobalStyle, Head, Header, Wrapper } from '.';

interface LayoutProps {
  children: React.ReactNode;
  location: WindowLocation;
  pageTitle?: string;
  pageSubtitle?: string;
}

function Layout({ children, location, pageTitle, pageSubtitle }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head location={location} />
        <GlobalStyle />
        <Wrapper>
          <Header pageTitle={pageTitle} pageSubtitle={pageSubtitle} />
          <main>{children}</main>
        </Wrapper>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default Layout;
