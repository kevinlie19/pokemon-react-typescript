import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      black: string;
      white: string;
      grey: string;
      lightGrey: string;
      yellow: string;
      greenGradient: string;
      pokemonPrimary: string;
      pokemonSecondary: string;
      pokemonImageBackground: string;
      cardShadow: string;
      background: string;
      primary: string;
    };
    spacing: {
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
      xxxl: number;
    };
  }
}
