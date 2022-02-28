import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	${({
		theme: {
			typography: {
				smallFontSizeRem,
				rootFontSizeSmPercent,
				rootFontSizeMdPercent,
				lineHeight,
				body,
				heading,
			},
			ms,
			vr,
			color,
			media,
			utils,
		},
	}) => css`
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
			font: ${rootFontSizeSmPercent} / ${lineHeight} ${body};
			${media.md} {
				font-size: ${rootFontSizeMdPercent};
			}
		}

		body {
			background-color: ${color.doctorGray};
			color: ${color.gray600};
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
			font-family: ${heading};
			color: ${color.ghostlyPurple};
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
			margin-bottom: ${vr.one.rem};
			&:last-child {
				margin-bottom: 0;
			}
		}

		ul li {
			font-weight: 400;
		}

		h1,
		.h1 {
			font-size: ${ms.two};
			font-weight: 900;
			${media.sm} {
				font-size: ${ms.three};
			}
		}

		h2,
		.h2,
		.lead--large {
			font-size: ${ms.two};
		}

		h3,
		.h3,
		.lead {
			font-size: ${ms.one};
		}

		h4,
		.h4 {
			font-size: ${ms.zero};
			margin-bottom: ${vr.half.rem};
		}

		a {
			color: ${color.ghostlyPurple};
			text-decoration-thickness: ${utils.pxToEm(2)};
			&:hover {
				text-decoration: none;
			}
		}

		blockquote {
			font-style: italic;
			border-left: ${utils.pxToEm(2)} solid ${color.gray200};
			padding-left: ${vr.half.rem};
		}

		small,
		.small {
			font-size: ${smallFontSizeRem};
		}

		sup[id^='fn'] a {
			font-size: ${smallFontSizeRem};
			text-decoration: none;
		}

		code {
			font-size: ${smallFontSizeRem};
			background-color: ${color.haitiPurple};
			color: ${color.manateeGray};
			padding: ${utils.pxToEm(5)};
			border-radius: ${utils.pxToEm(5)};
		}

		pre {
			code {
				padding: 0;
				background-color: transparent;
			}

			background-color: ${color.haitiPurple};
			padding: ${vr.one.rem};
			border-radius: ${utils.pxToEm(5)};
		}

		hr {
			border: 0;
			border-top: ${utils.pxToRem(2)} solid ${color.gray200};
			margin: ${vr.three.rem} auto;
			width: 33%;
		}

		.color-gray600,
		.lead {
			color: ${color.gray600};
		}

		img.rounded {
			border-radius: ${utils.pxToEm(6)};
		}

		.mobile-menu-link-wrapper {
			&:first-child {
				border-top: ${utils.pxToEm(2)} solid ${color.white100};
			}
			border-bottom: ${utils.pxToEm(2)} solid ${color.white100};

			a {
				padding: ${vr.one.em};
				display: block;
				text-transform: uppercase;
				text-decoration: none;
				letter-spacing: ${utils.pxToEm(1)};
				font-weight: 700;
				color: ${color.white500};
				&:hover,
				&[data-selected] {
					background-color: ${color.eastSidePurple};
					color: ${color.grapePurple};
				}
			}
		}
	`}
`;

export default GlobalStyle;
