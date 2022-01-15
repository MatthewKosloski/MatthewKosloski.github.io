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
    };
    grid: {
      numberColumns: number;
    };
    breakpoint: {
      [key: string]: number;
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
  }
}
