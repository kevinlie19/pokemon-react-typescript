/** @jsxImportSource @emotion/react */

import { useQuery } from "@apollo/client";
import { css, Theme, useTheme } from "@emotion/react";
import React, { useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

import CatchButton from "../../components/CatchButton";
import Error from "../../components/Error";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  Pokemon,
  Pokemon_pokemon,
  PokemonVariables,
} from "../../generated/server/Pokemon";
import { POKEMON } from "../../graphql/server/pokemon";
import { PokemonDetailContent, PokemonDetailHeader } from "./components";

type Props = {
  location: {
    state: {
      name: string;
      nickname?: string;
      imgUrl: string;
    };
  };
};

export default function PokemonDetailPage(props: Props) {
  const styles = useStyles(useTheme());
  const { deleteRecord, getByIndex } = useIndexedDB("pokemons");
  const history = useHistory();

  const [pokemonData, setPokemonData] = useState<Pokemon_pokemon>();
  const [nickname, setNickname] = useState("");
  const [catched, setCatched] = useState<{
    id: number;
    name: string;
    nickname: string;
  } | null>(null);

  const { loading, error } = useQuery<Pokemon, PokemonVariables>(POKEMON, {
    variables: {
      name: props.location.state.name,
    },
    onCompleted: async ({ pokemon }) => {
      if (pokemon) {
        setPokemonData(pokemon);
        setNickname(props.location.state.nickname || pokemon.name || "");

        const catchedPokemon = await getByIndex(
          "nickname",
          props.location.state.nickname || pokemon.name
        );

        if (catchedPokemon) {
          setCatched(catchedPokemon);
        }
      }
    },
    fetchPolicy: "cache-first",
  });

  const onCatchClick = () => {
    if (catched) {
      deleteRecord(catched.id).then(
        () => {
          console.log("successfully released the pokemon");
        },
        (error) => {
          console.log(error);
        }
      );
      history.push({
        pathname: "/catch-pokemon",
        state: {
          name: props.location.state.name,
          nickname: nickname,
          image: props.location.state.imgUrl,
          release: true,
        },
      });
    } else {
      history.push({
        pathname: "/catch-pokemon",
        state: {
          name: props.location.state.name,
          nickname: nickname,
          image: props.location.state.imgUrl,
        },
      });
    }
  };

  if (loading) {
    return <LoadingIndicator containerStyle={styles.loadingContainer} />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div css={styles.container}>
      <div css={styles.detailsContainer}>
        <PokemonDetailHeader
          imgUrl={props.location.state.imgUrl}
          name={nickname}
          pokemonData={pokemonData}
        />
        <PokemonDetailContent pokemonData={pokemonData} />
      </div>
      <CatchButton
        text={catched ? "RELEASE" : "CATCH"}
        onClick={onCatchClick}
      />
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    container: css({
      display: "flex",
      flexDirection: "column",
      height: "100%",
      paddingTop: spacing.l,
      backgroundColor: colors.background,

      // alignItems: "center",
      // margin: spacing.l,
      // borderRadius: "12px",
      // boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
    }),
    detailsContainer: css({
      display: "flex",
      flexDirection: "column",
      "@media screen and (max-width: 960px)": {
        flexDirection: "column",
        marginBottom: "0px",
      },
    }),
    loadingContainer: {
      paddingTop: "10vh",
      height: "100vh",
      backgroundColor: colors.background,
    },
  };
};
