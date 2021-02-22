/** @jsxImportSource @emotion/react */

import React, { useMemo, useState } from "react";
import { css, keyframes, Theme, useTheme } from "@emotion/react";

import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

import { Error } from "../components";
import PokemonCatched from "../assets/pokemon-catched.png";
import PokemonFlee from "../assets/pokemon-flee.png";
import PokemonReleased from "../assets/pokemon-released.webp";
import { capitalizedString } from "../helper/capitalizedString";

type Props = {
  location: {
    state: {
      name: string;
      nickname: string;
      image: string;
      release?: boolean;
    };
  };
};

export default function CatchPokemonPage({ location }: Props) {
  const styles = useStyles(useTheme());
  const history = useHistory();
  const { add } = useIndexedDB("pokemons");

  const [nickname, setNickname] = useState(location.state.nickname);
  const [showSetNickname, setShowSetNickname] = useState(false);

  const success = useMemo(() => {
    let result = Math.floor(Math.random() * 2) + 0;
    return result === 1 ? true : false;
  }, []);

  const onClickButton = () => {
    if (success) {
      setShowSetNickname(!showSetNickname);
    } else {
      history.push("/");
    }
  };

  const onSubmit = () => {
    add({
      name: location.state.name,
      nickname: nickname,
      image: location.state.image,
    }).then(
      () => {
        console.log("pokemon catched!");
      },
      (error) => {
        console.log(error);
        <Error />;
      }
    );
    history.push("/");
  };

  if (location.state.release) {
    console.log(location.state.nickname);
    return (
      <div css={styles.container}>
        <img css={styles.image} src={PokemonReleased} loading="lazy" />
        <div css={styles.title}>
          {`${capitalizedString(location.state.nickname)} was release.`}
        </div>
        <div css={styles.subtitle}>
          {`Bye bye, ${capitalizedString(location.state.nickname)}!`}
        </div>
        <div
          css={styles.button}
          onClick={() => {
            history.push("/");
          }}
        >
          <div css={styles.buttonText}>{"Confirm"}</div>
        </div>
      </div>
    );
  }

  return (
    <div css={styles.container}>
      {!showSetNickname ? (
        <>
          <img
            css={styles.image}
            src={success ? PokemonCatched : PokemonFlee}
          />
          <div css={styles.title}>{success ? "Gotcha!" : "Oh no!"}</div>
          <div css={styles.subtitle}>
            {success
              ? `${capitalizedString(location.state.name)} was caught!`
              : `The wild ${capitalizedString(location.state.name)} fled!`}
          </div>

          <div css={styles.button} onClick={onClickButton}>
            <div css={styles.buttonText}>
              {success ? "Set Nickname" : "Confirm"}
            </div>
          </div>
        </>
      ) : (
        <>
          <img css={styles.pokemonImage} src={location.state.image} />
          <form css={styles.detailsNameContainer} onSubmit={onSubmit}>
            <input
              css={styles.detailsName}
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
            <input css={styles.submitButton} value="Submit" type="submit" />
          </form>
        </>
      )}
    </div>
  );
}

const Zoom = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: spacing.xl,
      paddingBottom: spacing.l,
      height: "82vh",
      background: colors.background,
    }),
    image: css({
      animation: `${Zoom} 1s ease 1`,
      height: "50vmin",
      "@media screen and (max-width: 960px)": {
        height: "75vmin",
      },
    }),
    pokemonImage: css({
      height: "260px",
      borderRadius: "15rem",
      backgroundColor: colors.pokemonImageBackground,
      "@media (max-width: 960px)": {
        height: "240px",
      },
    }),
    title: css({
      paddingTop: spacing.xl,
      fontWeight: 700,
      textAlign: "center",
      fontSize: "3.5rem",
      color: colors.primary,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.5rem",
      },
    }),
    subtitle: css({
      fontWeight: 700,
      textAlign: "center",
      fontSize: "2rem",
      color: colors.primary,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.1rem",
      },
    }),
    button: css({
      textDecoration: "none",
      background: colors.greenGradient,
      boxShadow: "0 1px 6px 0 rgb(49 53 59 / 12%)",
      padding: spacing.l,
      marginTop: spacing.l,
      borderRadius: 10,
      cursor: "pointer",
      transform: "matrix(1,0,0,1,0,0)",
      transition: ".25s ease",
    }),
    buttonText: css({
      fontWeight: 700,
      fontSize: "2rem",
      margin: "0 10px",
      "@media screen and (max-width: 960px)": {
        fontSize: "1.1rem",
      },
    }),
    detailsNameContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
    detailsName: css({
      border: 0,
      borderRadius: "1rem",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      fontSize: "2rem",
      fontWeight: 700,
      textAlign: "center",
      textTransform: "capitalize",
      marginTop: "-1rem",
      padding: spacing.l,
      backgroundColor: colors.background,
      color: colors.primary,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.2rem",
      },
    }),
    submitButton: css({
      padding: spacing.l,
      marginTop: spacing.xl,
      fontWeight: 700,
      fontSize: "1.5rem",
      borderRadius: "1rem",
      cursor: "pointer",
      outline: "none",
      border: "none",
      background: colors.greenGradient,
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.2rem",
      },
    }),
  };
};
