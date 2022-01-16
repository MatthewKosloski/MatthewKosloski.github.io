import {
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';

import {
  verticalRhythm,
  modularScaleRem,
  pxToRelativeUnit,
  RelativeUnit,
  Steps,
  Breakpoints,
  breakpoint,
} from './utils';

const rootFontSizeMd = 112.5;
const lineHeight = 1.5;

// Wrappers around pxToRelativeUnit that use the root
// font size as the ratio.
export const pxToEm = (px: number) =>
  pxToRelativeUnit(px, rootFontSizeMd, RelativeUnit.EM);
export const pxToRem = (px: number) =>
  pxToRelativeUnit(px, rootFontSizeMd, RelativeUnit.REM);

// Convenient wrappers around breakpoint that add a type to the input.
export const xs = (css: FlattenInterpolation<ThemeProps<DefaultTheme>>) =>
  breakpoint(Breakpoints.XS)(css);
export const sm = (css: FlattenInterpolation<ThemeProps<DefaultTheme>>) =>
  breakpoint(Breakpoints.SM)(css);
export const md = (css: FlattenInterpolation<ThemeProps<DefaultTheme>>) =>
  breakpoint(Breakpoints.MD)(css);
export const lg = (css: FlattenInterpolation<ThemeProps<DefaultTheme>>) =>
  breakpoint(Breakpoints.LG)(css);
export const xl = (css: FlattenInterpolation<ThemeProps<DefaultTheme>>) =>
  breakpoint(Breakpoints.XL)(css);

export const color = {
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

export const typography = {
  heading: "'Roboto Condensed', sans-serif",
  body: "'Source Sans Pro', sans-serif",
  lineHeight: lineHeight,
  rootFontSizeSmPercent: '100%',
  rootFontSizeMd: rootFontSizeMd,
  rootFontSizeMdPercent: `${rootFontSizeMd}%`,
  smallFontSizeRem: pxToRem(15),
};

export const grid = {
  numberColumns: 12,
};

export const bps = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const vr: { [key: string]: { em: string; rem: string } } = {
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

export const ms = {
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

const theme: DefaultTheme = {
  color,
  typography,
  grid,
  breakpoint: bps,
  vr,
  ms,
};

export default theme;
