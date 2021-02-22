import React, { useContext, useState } from "react";
import { ThemeProvider as ThemeProviderEmotion } from "@emotion/react";

import { darkTheme, lightTheme } from "./theme";

const ThemeContext = React.createContext(false);
// eslint-disable-next-line no-unused-vars
const ThemeUpdateContext = React.createContext((darkMode: boolean) => {});

export const useThemeUpdate = () => useContext(ThemeUpdateContext);
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [useDarkTheme, setDarkTheme] = useState(
    window.localStorage.getItem("theme") === "true" ? true : false
  );

  const toggleTheme = (darkMode: boolean) => {
    window.localStorage.setItem("theme", String(darkMode));
    setDarkTheme(darkMode);
  };

  return (
    <ThemeProviderEmotion theme={useDarkTheme ? darkTheme : lightTheme}>
      <ThemeContext.Provider value={useDarkTheme}>
        <ThemeUpdateContext.Provider value={toggleTheme}>
          {children}
        </ThemeUpdateContext.Provider>
      </ThemeContext.Provider>
    </ThemeProviderEmotion>
  );
};
