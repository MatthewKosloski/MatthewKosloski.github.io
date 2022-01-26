import { createGlobalStyle } from 'styled-components';

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
    
    ${({ theme }) => `${theme.media.md} {
      font-size: ${theme.typography.rootFontSizeMdPercent};
    }`}
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
    overflow-y: scroll;
  }
  
  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
	.lead {
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

    ${({ theme }) => `${theme.media.sm} {
      font-size: ${theme.ms.three};
    }`}
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
    text-decoration-thickness: ${(p) => p.theme.utils.pxToEm(2)};
    &:hover {
      text-decoration: none;
    }
  }
  
  blockquote {
    font-style: italic;
    border-left: ${(p) =>
			`${(p) => p.theme.utils.pxToEm(2)} solid ${p.theme.color.gray200}`};
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
    padding: ${(p) => p.theme.utils.pxToEm(5)};
    border-radius: ${(p) => p.theme.utils.pxToEm(5)};
  }
  
  pre {
    code {
      padding: 0;
      background-color: transparent;
    }

    background-color: ${(p) => p.theme.color.haitiPurple};
    padding: ${(p) => p.theme.vr.one.rem};
    border-radius: ${(p) => p.theme.utils.pxToEm(5)};
  }
  
  hr {
    border: 0;
    border-top: ${(p) => p.theme.utils.pxToRem(2)} solid ${(p) =>
	p.theme.color.gray200};
    margin: ${(p) => p.theme.vr.three.rem} auto;
    width: 33%;
  }

  .color-gray600, .lead {
    color: ${(p) => p.theme.color.gray600};
  }

	img.rounded {
		border-radius: ${(p) => p.theme.utils.pxToEm(6)};
	}

	.mobile-menu-link {
		padding: ${(p) => p.theme.vr.one.em};
		display: block;
		text-transform: uppercase;
		text-decoration: none;
		letter-spacing: ${(p) => p.theme.utils.pxToEm(1)};
		font-weight: 700;
		color: ${(p) => p.theme.color.white500};
		border-top: ${(p) => p.theme.utils.pxToEm(2)} solid
			${(p) => p.theme.color.white100};
		&:last-child {
			border-bottom: ${(p) => p.theme.utils.pxToEm(2)} solid
				${(p) => p.theme.color.white100};
		}
		&:hover,
		&[data-selected] {
			background-color: ${(p) => p.theme.color.eastSidePurple};
			color: ${(p) => p.theme.color.grapePurple};
		}
	}
`;

export default GlobalStyle;
