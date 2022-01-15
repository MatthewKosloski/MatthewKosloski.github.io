import { createGlobalStyle, css } from 'styled-components';
import { breakpoint, Breakpoints } from '../utils';
import { pxToEm, pxToRem, vr } from '../theme';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  img {
    max-width: 100%;
  }

  html {
    box-sizing: border-box;
  }

  html {
    font: ${({ theme: { typography } }) =>
      `${typography.rootFontSizeSmPercent} / ${typography.lineHeight} ${typography.body}`};
    ${breakpoint(Breakpoints.MD)(css`
      font-size: ${({ theme: { typography } }) =>
        typography.rootFontSizeMdPercent};
    `)}
  }
  
  body {
    background-color: ${(p) => p.theme.color.doctorGray};
    color: ${(p) => p.theme.color.gray600};
  }

  body.has-expanded-mobile-menu {
    position: fixed;
    left: 0;
    right: 0;
    height: 100vh;
  }
  
  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4 {
    font-family: ${(p) => p.theme.typography.heading};
    color: ${(p) => p.theme.color.ghostlyPurple};
    font-weight: 700;
  }
  
  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
  p,
  blockquote,
  ul,
  ol {
    margin-bottom: ${(p) => p.theme.vr.one.rem};
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul li {
    font-weight: 400;
  }
  
  h1,
  .h1 {
    font-size: ${(p) => p.theme.ms.two};
    font-weight: 900;
    ${breakpoint(Breakpoints.SM)(css`
      font-size: ${(p) => p.theme.ms.three};
    `)}
  }
  
  h2,
  .h2,
  .lead--large {
    font-size: ${(p) => p.theme.ms.two};
  }
  
  h3,
  .h3,
  .lead {
    font-size: ${(p) => p.theme.ms.one};
  }
  
  h4,
  .h4 {
    font-size: ${(p) => p.theme.ms.zero};
    margin-bottom: ${(p) => p.theme.vr.half.rem};
  }
  
  a {
    color: ${(p) => p.theme.color.ghostlyPurple};
    text-decoration-thickness: ${pxToEm(2)};
    &:hover {
      text-decoration: none;
    }
  }
  
  blockquote {
    font-style: italic;
    border-left: ${(p) => `${pxToEm(2)} solid ${p.theme.color.gray200}`};
    padding-left: ${(p) => p.theme.vr.half.rem};
  }
  
  small,
  .small {
    font-size: ${(p) => p.theme.typography.smallFontSizeRem};
  }
  
  sup[id^='fn'] a {
    font-size: ${(p) => p.theme.typography.smallFontSizeRem};
    text-decoration: none;
  }
  
  code {
    font-size: ${(p) => p.theme.typography.smallFontSizeRem};
    background-color: ${(p) => p.theme.color.haitiPurple};
    color: ${(p) => p.theme.color.manateeGray};
    padding: ${pxToEm(5)};
    border-radius: ${pxToEm(5)};
  }
  
  pre {
    code {
      padding: 0;
      background-color: transparent;
    }

    background-color: ${(p) => p.theme.color.haitiPurple};
    padding: ${(p) => p.theme.vr.one.rem};
    border-radius: ${pxToEm(5)};
  }
  
  hr {
    border: 0;
    border-top: ${pxToRem(2)} solid ${(p) => p.theme.color.gray200};
    margin: ${(p) => p.theme.vr.three.rem} auto;
    width: 33%;
  }

  .color-gray600 {
    color: ${(p) => p.theme.color.gray600};
  }
`;

export default GlobalStyle;
