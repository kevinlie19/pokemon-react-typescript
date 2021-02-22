/** @jsxImportSource @emotion/react */

import React from "react";
import { css, Theme, useTheme } from "@emotion/react";

import { Pokemon_pokemon as PokemonDataTypes } from "../../../generated/server/Pokemon";
import { pokemonTypesColors } from "../../../theme/pokemonTypeColors";

type Props = {
  imgUrl: string;
  name: string;
  pokemonData?: PokemonDataTypes;
};

export default function PokemonDetailHeader({
  imgUrl,
  name,
  pokemonData,
}: Props) {
  const styles = useStyles(useTheme());

  let newAbilities = pokemonData?.abilities?.filter((item) => {
    return !item?.is_hidden;
  });
  let hiddenAbilities = pokemonData?.abilities?.filter((item) => {
    return item?.is_hidden;
  });

  let renderPokemonTypes = () => {
    return pokemonData?.types?.map((item) => (
      <div
        key={Math.random()}
        css={[
          styles.detailsTypes,
          {
            backgroundColor: pokemonTypesColors[item?.type?.name || "normal"],
          },
        ]}
      >
        {/* <p
          css={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
            justifyItems: "center",
            justifySelf: "center",
          }}
        > */}
        {item?.type?.name}
        {/* </p> */}
      </div>
    ));
  };

  return (
    <div css={styles.centerColumnContainer}>
      <img css={styles.image} src={imgUrl} />
      <div css={styles.centerContainer}>
        <div css={styles.detailsName}>{name}</div>
      </div>
      <div css={styles.typesContainer}>
        <p css={styles.detailsTitle}>{"Types"}</p>
        <div css={styles.centerContainer}>{renderPokemonTypes()}</div>
      </div>
      <div css={styles.abilitiesContainer}>
        <div css={styles.centerColumnContainer}>
          <p css={styles.detailsTitle}>{"ABILITIES"}</p>
          <div css={styles.centerContainer}>
            {newAbilities?.map((item) => (
              <div key={Math.random()} css={styles.detailsAbilitiesAndMoves}>
                {item?.ability?.name}
              </div>
            ))}
          </div>
        </div>
        <div css={styles.centerColumnContainer}>
          <p css={styles.detailsTitle}>{"HIDDEN ABILITIES"}</p>
          <div css={styles.centerContainer}>
            {hiddenAbilities ? (
              hiddenAbilities?.map((item) => (
                <div key={Math.random()} css={styles.detailsAbilitiesAndMoves}>
                  {item?.ability?.name || "none"}
                </div>
              ))
            ) : (
              <div key={Math.random()} css={styles.detailsAbilitiesAndMoves}>
                {" - "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = ({ colors, spacing }: Theme) => {
  return {
    centerContainer: css({
      display: "flex",
      alignItems: "center",
    }),
    centerColumnContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
    detailsName: css({
      color: colors.primary,
      border: 0,
      fontSize: "2rem",
      fontWeight: 700,
      textTransform: "capitalize",
      marginTop: "-1rem",
      padding: spacing.l,
      borderRadius: "1rem",
      backgroundColor: colors.background,
      textAlign: "center",
      boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      "@media screen and (max-width: 960px)": {
        fontSize: "1.2rem",
      },
    }),
    detailsTypes: css({
      width: "12vw",
      height: "3vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: colors.white,
      margin: spacing.l,
      borderRadius: "5px",
      textTransform: "capitalize",
      fontWeight: 700,
      "@media screen and (max-width: 960px)": {
        width: "15vw",
        height: "1.2vh",
        fontSize: ".8rem",
        padding: spacing.s,
      },
    }),
    typesContainer: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: spacing.l,
      "@media screen and (max-width: 960px)": {
        alignSelf: "stretch",
        borderRadius: "12px",
        boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
      },
    }),
    abilitiesContainer: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      alignSelf: "stretch",
      "@media screen and (max-width: 960px)": {
        borderRadius: "12px",
        boxShadow: `0 1px 6px 0 ${colors.cardShadow}`,
        marginLeft: spacing.l,
        marginRight: spacing.l,
      },
    }),
    image: css({
      height: "260px",
      borderRadius: "15rem",
      backgroundColor: colors.pokemonImageBackground,
      "@media (max-width: 960px)": {
        height: "240px",
      },
    }),
    detailsTitle: css({
      textAlign: "center",
      color: colors.yellow,
      fontSize: "1.5rem",
      fontWeight: 700,
      "@media screen and (max-width: 960px)": {
        fontSize: "1rem",
      },
    }),
    detailsAbilitiesAndMoves: css({
      display: "flex",
      padding: spacing.l,
      margin: spacing.l,
      borderRadius: "2rem",
      backgroundColor: colors.background,
      color: colors.primary,
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
