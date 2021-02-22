/** @jsxImportSource @emotion/react */

import React from "react";
import { css, Theme, useTheme } from "@emotion/react";

import { Pokemon_pokemon } from "../../../generated/server/Pokemon";

type DetailsSectionProps = {
  pokemonData?: Pokemon_pokemon;
};

export default function PokemonDetailContent({
  pokemonData,
}: DetailsSectionProps) {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.container}>
      <div css={styles.detailsTitle}>{"MOVES"}</div>
      <div css={styles.contentContainer}>
        {pokemonData?.moves?.map((item) => (
          <div key={Math.random()} css={styles.detailsAbilitiesAndMoves}>
            {item?.move?.name}
          </div>
        ))}
      </div>
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderTop: "1px solid #ccc ",
      margin: spacing.l,
      justifyContent: "center",
      "@media screen and (max-width: 960px)": {
        borderLeft: "none",
        borderTop: "1px solid #ccc ",
        flexDirection: "column",
      },
    }),
    contentContainer: css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }),
    detailsTitle: css({
      color: colors.yellow,
      paddingTop: spacing.l,
      margin: spacing.l,
      fontSize: "1.5rem",
      fontWeight: 700,
      "@media screen and (max-width: 960px)": {
        fontSize: "1rem",
      },
    }),
    detailsAbilitiesAndMoves: css({
      minWidth: "10vw",
      color: colors.primary,
      padding: spacing.l,
      margin: spacing.l,
      borderRadius: "2rem",
      backgroundColor: colors.background,
      textTransform: "capitalize",
      textAlign: "center",
      fontWeight: 700,
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: ".8rem",
        padding: spacing.s,
      },
    }),
  };
};
