import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      [key: string]: string;
    };
    typography: {
      heading: string;
      body: string;
      lineHeight: number;
      rootFontSizeSmPercent: string;
      rootFontSizeMd: number;
      rootFontSizeMdPercent: string;
      smallFontSizeRem: string;
      letterSpacingEm: string;
      largeFontSizeRem: string;
    };
    grid: {
      numberColumns: number;
    };
    vr: {
      [key: string]: {
        em: string;
        rem: string;
      };
    };
    ms: {
      [key: string]: string;
    };
    media: {
      [key: string]: string;
    };
    utils: {
      pxToEm: (px: number) => string;
      pxToRem: (px: number) => string;
    };
    wrapper: {
      width: string;
    };
  }
}
