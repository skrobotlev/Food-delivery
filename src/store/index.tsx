import React, { createContext } from "react";
import UserStore, { PersistStore } from "./user-store";
import CategoriesStore from "./categories-store";

export const Context = createContext({
	userStore: new UserStore(),
  categoriesStore: new CategoriesStore(),
  persistStore: new PersistStore()
});

const value = {
  userStore: new UserStore(),
  categoriesStore: new CategoriesStore(),
  persistStore: new PersistStore(),
};

export const ContextProvider = ({ children }: { children: React.ReactChild }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
