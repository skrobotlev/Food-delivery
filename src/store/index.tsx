import React, { createContext } from "react";
import UserStore, { PersistStore } from "./user-store";
import CategoriesStore from "./categories-store";
import CaloriesStore from "./calories-store";

export const Context = createContext({
  userStore: new UserStore(),
  categoriesStore: new CategoriesStore(),
  persistStore: new PersistStore(),
  caloriesStore: new CaloriesStore()
});

const value = {
  userStore: new UserStore(),
  categoriesStore: new CategoriesStore(),
  persistStore: new PersistStore(),
  caloriesStore: new CaloriesStore()
};

export const ContextProvider = ({ children }: { children: React.ReactChild }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
