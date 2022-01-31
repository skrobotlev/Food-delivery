import * as React from "react";
import { action, observable, makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import { persist, create } from "mobx-persist";

class SomeA {
  a: number;
  b: number;
  c: { some: string };

  constructor() {
    // makeAutoObservable(this);
    this.a = 2;
    this.b = 3;
    this.c = {
      some: "prop"
    };
  }
}

class SomeStore {
  @persist("list") @observable list: SomeA[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  add() {
    this.list.push(new SomeA());
  }
}

const stores = Object.freeze({
  some: new SomeStore()
});

const storesContext = React.createContext(stores);
const StoresProvider = storesContext.Provider;

const useStore = <T extends keyof typeof stores>(store: T): typeof stores[T] =>
  React.useContext(storesContext)[store];

const hydrate = create({
  storage: window.localStorage // or AsyncStorage in react-native.
  // default: localStorage
});

hydrate("some", stores.some);

const Some = observer(() => {
  const some = useStore("some");

  return (
    <>
      {JSON.stringify(some.list)}
      <button onClick={() => some.add()}>Add</button>
    </>
  );
});

const PersistApp = () => {
  return (
    <StoresProvider value={stores}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Some />
      </div>
    </StoresProvider>
  );
};

export default PersistApp;
