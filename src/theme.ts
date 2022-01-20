import { DefaultTheme } from 'styled-components';

import {
  verticalRhythm,
  modularScaleRem,
  pxToRelativeUnit,
  RelativeUnit,
  Steps,
} from './utils';

const rootFontSizeMd = 112.5;
const lineHeight = 1.5;

// Wrappers around pxToRelativeUnit that use the root
// font size as the ratio.
const pxToEm = (px: number) =>
  pxToRelativeUnit(px, rootFontSizeMd, RelativeUnit.EM);
const pxToRem = (px: number) =>
  pxToRelativeUnit(px, rootFontSizeMd, RelativeUnit.REM);

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const mediaQuery = (bp: number) => `@media (min-width: ${bp}px)`;

const color = {
  white: '#fff',
  grapePurple: '#301446',
  ghostlyPurple: '#7a5d92',
  haitiPurple: '#251136',
  eastSidePurple: '#bea0d5',
  manateePurple: '#95989d',
  doctorGray: '#f9f9f9',
  gray50: 'rgba(0, 0, 0, 0.05)',
  gray100: 'rgba(0, 0, 0, 0.1)',
  gray200: 'rgba(0, 0, 0, 0.2)',
  gray200Hex: '#d4d4d4',
  gray300: 'rgba(0, 0, 0, 0.3)',
  gray400: 'rgba(0, 0, 0, 0.4)',
  gray500: 'rgba(0, 0, 0, 0.5)',
  gray600: 'rgba(0, 0, 0, 0.6)',
  white100: 'rgba(255, 255, 255, 0.1)',
  white200: 'rgba(255, 255, 255, 0.2)',
  white300: 'rgba(255, 255, 255, 0.3)',
  white400: 'rgba(255, 255, 255, 0.4)',
  white500: 'rgba(255, 255, 255, 0.5)',
  white600: 'rgba(255, 255, 255, 0.6)',
  kournikovaYellow: '#ffe17f',
};

const typography = {
  heading: "'Roboto Condensed', sans-serif",
  body: "'Source Sans Pro', sans-serif",
  lineHeight: lineHeight,
  rootFontSizeSmPercent: '100%',
  rootFontSizeMd: rootFontSizeMd,
  rootFontSizeMdPercent: `${rootFontSizeMd}%`,
  smallFontSizeRem: pxToRem(15),
  largeFontSizeRem: pxToRem(20),
  letterSpacingEm: pxToEm(0.5),
};

const grid = {
  numberColumns: 12,
};

const media = {
  xs: mediaQuery(breakpoints.xs),
  sm: mediaQuery(breakpoints.sm),
  md: mediaQuery(breakpoints.md),
  lg: mediaQuery(breakpoints.lg),
  xl: mediaQuery(breakpoints.xl),
};

const vr: { [key: string]: { em: string; rem: string } } = {
  zero: {
    em: verticalRhythm(Steps.ZERO, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.ZERO, lineHeight, RelativeUnit.REM),
  },
  quarter: {
    em: verticalRhythm(Steps.QUARTER, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.QUARTER, lineHeight, RelativeUnit.REM),
  },
  half: {
    em: verticalRhythm(Steps.HALF, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.HALF, lineHeight, RelativeUnit.REM),
  },
  threeFourths: {
    em: verticalRhythm(Steps.THREEFOURTHS, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.THREEFOURTHS, lineHeight, RelativeUnit.REM),
  },
  one: {
    em: verticalRhythm(Steps.ONE, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.ONE, lineHeight, RelativeUnit.REM),
  },
  two: {
    em: verticalRhythm(Steps.TWO, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.TWO, lineHeight, RelativeUnit.REM),
  },
  three: {
    em: verticalRhythm(Steps.THREE, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.THREE, lineHeight, RelativeUnit.REM),
  },
  four: {
    em: verticalRhythm(Steps.FOUR, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.FOUR, lineHeight, RelativeUnit.REM),
  },
  five: {
    em: verticalRhythm(Steps.FIVE, lineHeight, RelativeUnit.EM),
    rem: verticalRhythm(Steps.FIVE, lineHeight, RelativeUnit.REM),
  },
};

const ms = {
  zero: modularScaleRem(Steps.ZERO, lineHeight),
  quarter: modularScaleRem(Steps.QUARTER, lineHeight),
  half: modularScaleRem(Steps.HALF, lineHeight),
  threeFourths: modularScaleRem(Steps.THREEFOURTHS, lineHeight),
  one: modularScaleRem(Steps.ONE, lineHeight),
  two: modularScaleRem(Steps.TWO, lineHeight),
  three: modularScaleRem(Steps.THREE, lineHeight),
  four: modularScaleRem(Steps.FOUR, lineHeight),
  five: modularScaleRem(Steps.FIVE, lineHeight),
};

const utils = {
  pxToEm,
  pxToRem,
};

const theme: DefaultTheme = {
  color,
  typography,
  grid,
  vr,
  ms,
  media,
  utils,
};

export default theme;
