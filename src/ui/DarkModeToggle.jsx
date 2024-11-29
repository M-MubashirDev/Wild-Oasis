import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ModeToggleContext = createContext();
function DarkModeToggle({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  useEffect(
    function () {
      if (isDarkMode) document.documentElement.classList.add("light-mode");
      else document.documentElement.classList.remove("light-mode");
      if (!isDarkMode) document.documentElement.classList.add("dark-mode");
      else document.documentElement.classList.remove("dark-mode");
    },
    [isDarkMode]
  );
  function ToggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }
  return (
    <ModeToggleContext.Provider value={{ isDarkMode, ToggleDarkMode }}>
      {children}
    </ModeToggleContext.Provider>
  );
}
//eslint-disable-next-line
export function useDarkMode() {
  const context = useContext(ModeToggleContext);
  if (!context) throw new Error("no context");
  return context;
}

export default DarkModeToggle;
