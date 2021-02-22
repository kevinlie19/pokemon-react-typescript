/** @jsxImportSource @emotion/react */

import React from "react";
import { css, Theme, useTheme } from "@emotion/react";

import Pokeball from "../assets/pokeball.png";

type Props = {
  text: string;
  onClick?: () => void;
};

export default function CatchButton({ text, onClick }: Props) {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.catchButtonContainer} onClick={onClick}>
      <img
        css={styles.pokeballImage}
        src={Pokeball}
        alt="Catch em all!"
        loading="lazy"
      />
      <div css={styles.catchButtonText}>{text}</div>
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    catchButtonContainer: css({
      display: "flex",
      flexDirection: "column",
      alignSelf: "center",
      alignItems: "center",
      padding: spacing.l,
      marginBottom: spacing.l,
      backgroundColor: colors.lightGrey,
      color: colors.grey,
      borderRadius: 10,
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      cursor: "pointer",
      filter: "grayscale(100%)",
      position: "sticky",
      bottom: 20,
      "&:hover": {
        filter: "none",
        background: colors.greenGradient,
        color: colors.black,
        transition: ".25s ease",
        transform: "matrix(1,0,0,1,0,-10)",
      },
      "@media (max-width: 960px)": {
        width: "20vmin",
        filter: "none",
        background: colors.greenGradient,
        color: colors.black,
      },
    }),
    catchButtonText: css({
      fontSize: "1.1rem",
      fontWeight: 700,
      marginTop: spacing.s,
      "@media (max-width: 960px)": {
        fontSize: "1rem",
      },
    }),
    pokeballImage: css({
      height: "15vmin",
      "@media (max-width: 960px)": {
        height: "12vmin",
      },
    }),
  };
};
