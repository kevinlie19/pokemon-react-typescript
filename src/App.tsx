import React from "react";
import { initDB } from "react-indexed-db";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { client } from "./graphql/client";
import Header from "./components/Header";
import { DBConfig } from "./config/DBConfig";
import {
  CatchPokemonPage,
  HomePage,
  MyPokemonListPage,
  PokemonDetailPage,
} from "./pages";
import { ThemeProvider } from "./theme/ThemeContext";

initDB(DBConfig);

function App() {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/my-pokemon-list"
              exact
              component={MyPokemonListPage}
            />
            <Route path="/pokemon-detail" exact component={PokemonDetailPage} />
            <Route path="/catch-pokemon" exact component={CatchPokemonPage} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
