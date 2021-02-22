const theme = {
  colors: {
    black: "#000",
    white: "#FFF",
    grey: "#424242",
    lightGrey: "#616161",
    yellow: "#FFCB05",
    greenGradient: "linear-gradient(to bottom, #F0F7F5 0%, #CBFAC5 300%)",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 30,
    xxxl: 36,
  },
};

export const lightTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#121212",
    background: "#FFF",
    cardShadow: "rgb(49 53 59 / 12%)",
    pokemonPrimary: "linear-gradient(to bottom, #F0F7F5 0%, #CBFAC5 300%)",
    pokemonSecondary: "linear-gradient(to bottom, #F0F7F5 0%, #CBFAC5 300%)",
    pokemonImageBackground: "#F5F5F5",
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#FFF",
    background: "#121212",
    cardShadow: "rgb(238 232 170 / 80%)",
    pokemonPrimary: "#424242",
    pokemonSecondary: "#000",
    pokemonImageBackground: "#A4A4A4",
  },
};
