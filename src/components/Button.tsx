/** @jsxImportSource @emotion/react */

import React from "react";
import { css, Theme, useTheme } from "@emotion/react";

type Props = {
  text: string;
  onClick?: () => void;
};

export default function Button({ text, onClick }: Props) {
  const styles = useStyles(useTheme());

  return (
    <div css={styles.buttonContainer}>
      <button css={styles.buttonText} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    buttonContainer: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    buttonText: css({
      fontWeight: 700,
      fontSize: "1.1rem",
      border: 0,
      borderRadius: 10,
      boxShadow: "0 1px 6px 0 rgb(49 53 59 / 12%)",
      cursor: "pointer",
      outline: "none",
      margin: spacing.l,
      padding: spacing.l,
      background: colors.pokemonPrimary,
      "@media (max-width: 960px)": {
        fontSize: "1rem",
        margin: spacing.s,
        padding: spacing.s,
      },
    }),
  };
};
