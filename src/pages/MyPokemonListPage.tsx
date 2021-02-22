/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { css, keyframes, Theme, useTheme } from "@emotion/react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

import Pokeball from "../assets/pokeball.png";
import Card from "../components/Card";

export default function MyPokemonListPage() {
  const styles = useStyles(useTheme());
  const { getAll } = useIndexedDB("pokemons");
  const history = useHistory();

  const [pokemonData, setPokemonData] = useState<
    Array<{
      id: number;
      name: string;
      nickname: string;
      image: string;
    }>
  >();

  useEffect(() => {
    getAll().then((db) => {
      setPokemonData(db);
    });
  }, []);

  return (
    <div css={styles.container}>
      <div css={styles.contentContainer}>
        {pokemonData && pokemonData.length > 0 ? (
          pokemonData.map((item) => (
            <div css={styles.cardContainer} key={item?.id}>
              <Card
                name={item?.nickname || ""}
                imgUrl={item?.image || ""}
                pokemonOwned={0}
                mode="release"
                onClick={() =>
                  history.push({
                    pathname: "/pokemon-detail",
                    state: {
                      name: item.name,
                      nickname: item.nickname,
                      imgUrl: item.image,
                    },
                  })
                }
              />
            </div>
          ))
        ) : (
          <div css={styles.emptyPokemonContainer}>
            <img css={styles.image} src={Pokeball} />
            <div css={styles.emptyPokemonText}>
              {"You have no Pokemons yet!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
  }
`;

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      height: "100%",
      minHeight: "100vh",
      paddingTop: spacing.l,
      backgroundColor: colors.background,
    }),
    contentContainer: css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }),
    cardContainer: css({
      margin: spacing.l,
      "@media screen and (max-width: 960px)": {
        margin: spacing.s,
      },
    }),
    emptyPokemonContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "2rem",
    }),
    emptyPokemonText: css({
      fontWeight: 700,
      fontSize: "5vmin",
      textAlign: "center",
      margin: spacing.l,
      color: colors.primary,
    }),
    image: css({
      height: "20vmin",
      animation: `${spin} 10s linear infinite`,
      // "@media screen and (max-width: 960px)": {
      //   height: "10vmin",
      // },
    }),
  };
};
