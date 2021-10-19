import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }

  return context;
};

function ThemeProvider(props) {
  const [theme, setTheme] = useState(
    localStorage.getItem("scheme") ? localStorage.getItem("scheme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("scheme", theme);
  }, [theme]);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      changeTheme,
    }),
    // eslint-disable-next-line
    [theme]
  );
  return <ThemeContext.Provider value={value} {...props} />;
}

export { ThemeProvider, useTheme };
