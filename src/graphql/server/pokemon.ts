import { gql } from "@apollo/client";

export const POKEMONS = gql`
  query Pokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

export const POKEMON = gql`
  query Pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        slot
        type {
          name
        }
      }
      abilities {
        ability {
          name
        }
        is_hidden
        slot
      }
      moves {
        move {
          name
        }
      }
    }
  }
`;
