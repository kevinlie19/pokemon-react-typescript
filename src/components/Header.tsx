/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { css, Theme, useTheme } from "@emotion/react";

import Logo from "../assets/logo.svg";
import Pokedex from "../assets/pokedex.png";
import MyPokemon from "../assets/pokeball.png";
import { useThemeUpdate } from "../theme/ThemeContext";

export default function Header() {
  const history = useHistory();
  const location = useLocation();

  const theme = useTheme();
  const styles = useStyles(theme);

  const toggleTheme = useThemeUpdate();

  useEffect(() => {
    history.listen(() => {
      let hours = new Date(Date.now()).getHours();

      if (hours >= 18 || hours <= 5) {
        toggleTheme(true);
      } else if (hours >= 6 || hours < 18) {
        toggleTheme(false);
      }
    });
  }, [history]);

  return (
    <nav css={styles.headerContainer}>
      <Link to="/">
        <div>
          <img css={styles.logo} src={Logo} alt="logo" loading="lazy" />
        </div>
      </Link>
      <div style={styles.flex}>
        <Link to="/" style={styles.pokedexImageContainer}>
          <img
            css={[styles.image, styles.pokedexImage]}
            style={{
              background:
                location.pathname === "/" ||
                location.pathname === "/pokemon-detail" ||
                location.pathname === "/catch-pokemon"
                  ? theme.colors.greenGradient
                  : "transparent",
            }}
            src={Pokedex}
            alt="home-pokedex"
          />
        </Link>
        <Link to="/my-pokemon-list" style={styles.flex}>
          <img
            css={styles.image}
            style={{
              background:
                location.pathname === "/my-pokemon-list"
                  ? theme.colors.greenGradient
                  : "transparent",
            }}
            src={MyPokemon}
            alt="my-pokemon-list"
          />
        </Link>
      </div>
    </nav>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    flex: {
      display: "flex",
    },
    headerContainer: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2vmin",
      borderBottom: "1px solid #ccc",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      backgroundColor: colors.background,
      position: "sticky",
      top: 0,
      zIndex: 1,
      "@media screen and (max-width: 960px)": {
        padding: "0 5vmin",
      },
    }),
    logo: css({
      width: "180px",
      height: "90px",
      "@media screen and (max-width: 960px)": {
        width: "120px",
        height: "60px",
      },
    }),
    pokedexImageContainer: {
      display: "flex",
      marginRight: spacing.l,
    },
    image: css({
      width: "80px",
      height: "80px",
      padding: spacing.s,
      "&:active": {
        background: colors.pokemonPrimary,
      },
      "@media screen and (max-width: 960px)": {
        width: "50px",
        height: "50px",
      },
    }),
    pokedexImage: css({
      "@media screen and (max-width: 960px)": {
        width: "60px",
      },
    }),
  };
};
