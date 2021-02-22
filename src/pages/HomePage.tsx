/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { css, Theme, useTheme } from "@emotion/react";

import { Button, Card, Error, LoadingIndicator } from "../components";
import {
  Pokemons,
  Pokemons_pokemons_results as PokemonResultsType,
  PokemonsVariables,
} from "../generated/server/Pokemons";
import { POKEMONS } from "../graphql/server/pokemon";

export default function HomePage() {
  const styles = useStyles(useTheme());
  const { getAll } = useIndexedDB("pokemons");
  const history = useHistory();

  const [pokemonData, setPokemonData] = useState<
    Array<PokemonResultsType | null>
  >([]);
  const [pokemonDB, setPokemonDB] = useState();
  const [offset, setOffset] = useState(0);

  const { loading, error, data, fetchMore } = useQuery<
    Pokemons,
    PokemonsVariables
  >(POKEMONS, {
    variables: {
      limit: 20,
      offset: offset,
    },
    onCompleted: ({ pokemons }) => {
      setPokemonData((oldData) => [...oldData].concat(pokemons?.results || []));
    },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    getAll().then(
      (
        db: Array<{ id: number; name: string; nickname: string; image: string }>
      ) => {
        const tempData: any = {};

        db.forEach((item) => {
          if (!tempData[item.name]) {
            tempData[item.name] = 1;
          } else {
            tempData[item.name] += 1;
          }
        });
        setPokemonDB(tempData);
      }
    );
  }, []);

  const onClickLoadMore = () => {
    fetchMore({
      variables: {
        limit: 20,
        offset: offset + 20,
      },
    });
    setOffset(offset + 20);
  };

  if (loading && pokemonData.length === 0) {
    return <LoadingIndicator containerStyle={styles.centerContainer} />;
  }

  if (error) {
    return <Error containerStyle={styles.centerContainer} />;
  }

  return (
    <div css={styles.container}>
      <div css={styles.contentContainer}>
        {pokemonData.map((item) => (
          <div css={styles.cardContainer} key={item?.id}>
            <Card
              name={item?.name || ""}
              imgUrl={item?.image || ""}
              pokemonOwned={pokemonDB?.[item?.name || ""] || 0}
              onClick={() =>
                history.push({
                  pathname: "/pokemon-detail",
                  state: {
                    name: item?.name || "",
                    imgUrl: item?.image || "",
                  },
                })
              }
            />
          </div>
        ))}
      </div>
      {loading && pokemonData.length >= 0 ? (
        <LoadingIndicator />
      ) : pokemonData.length !== data?.pokemons?.count ? (
        <Button text="Load more" onClick={onClickLoadMore} />
      ) : null}
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      height: "100%",
      backgroundColor: colors.background,
      "@media screen and (max-width: 960px)": {
        paddingTop: spacing.s,
      },
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
    centerContainer: {
      paddingTop: "10vh",
      height: "100vh",
      backgroundColor: colors.background,
    },
  };
};
