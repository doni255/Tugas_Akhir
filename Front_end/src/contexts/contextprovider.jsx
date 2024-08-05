import { createContext, useContext } from "react";
import { useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John",
  });
  const [token, _setToken] = useState(1234);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCES_TOKEN", token);
    } else {
      localStorage.removeItem("ACCES_TOKEN");
    }
  };
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
