/** @jsxImportSource @emotion/react */

import React from "react";
import { css, Theme, useTheme } from "@emotion/react";

import PokeballOpened from "../assets/pokeball-opened.png";

type Props = {
  name: string;
  imgUrl: string;
  pokemonOwned: number;
  mode?: "catched" | "release";
  onClick?: () => void;
};

export default function Card({
  name,
  imgUrl,
  pokemonOwned,
  mode = "catched",
  onClick,
}: Props) {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.cardContainer} onClick={onClick}>
      <img css={styles.image} src={imgUrl} alt="pokemon-image" loading="lazy" />
      <p css={styles.cardTitle}>{name}</p>

      {mode === "catched" ? (
        <div css={styles.cardOwnedText}>{`Owned: ${pokemonOwned}`}</div>
      ) : (
        <>
          <div css={styles.cardReleasedContainer}>
            <img
              css={styles.pokeballImage}
              src={PokeballOpened}
              alt="pokemon-image"
              loading="lazy"
            />
            <div css={styles.cardReleasedText}>{"RELEASE"}</div>
          </div>
        </>
      )}
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    cardContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "192px",
      padding: spacing.l,
      overflow: "hidden",
      borderRadius: "12px",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      transform: "matrix(1,0,0,1,0,0)",
      cursor: "pointer",
      backgroundColor: colors.pokemonPrimary,
      "&:hover": {
        transform: "matrix(1,0,0,1,0,2)",
        transition: ".25s ease",
      },
      "@media (max-width: 960px)": {
        maxWidth: "96px",
        padding: spacing.s,
      },
    }),
    cardTitle: css({
      marginTop: spacing.l,
      color: colors.primary,
      fontWeight: 700,
      textTransform: "capitalize",
      "@media (max-width: 960px)": {
        fontSize: ".8rem",
      },
    }),
    cardOwnedText: css({
      padding: spacing.s,
      color: colors.yellow,
      background: colors.pokemonSecondary,
      fontWeight: 700,
      borderRadius: "1rem",
      "@media (max-width: 960px)": {
        fontSize: ".5rem",
      },
    }),
    cardReleasedContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "1rem",
      fontWeight: 700,
      background: colors.pokemonSecondary,
      padding: spacing.s,
      "@media (max-width: 960px)": {
        padding: spacing.m,
        marginLeft: spacing.s,
        marginRight: spacing.s,
        fontSize: ".5rem",
      },
    }),
    cardReleasedText: css({
      color: colors.yellow,
      paddingTop: spacing.s,
    }),
    image: css({
      height: "160px",
      "@media (max-width: 960px)": {
        height: "80px",
      },
    }),
    pokeballImage: css({
      height: "20px",
      padding: "5px 40px",
      "@media (max-width: 960px)": {
        padding: "5px 20px",
      },
    }),
  };
};
