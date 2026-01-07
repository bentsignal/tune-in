import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";

const createStore = <Data extends object>({
  store,
  name,
}: {
  store: ({ children }: { children: ReactNode }) => ReactNode;
  name: string;
}): {
  Store: ({ children }: { children: ReactNode }) => ReactElement;
  useStore: () => Data;
} => {
  const Store = ({ children }: { children: ReactNode }) => {
    return <div>{children}</div>;
  };
  return {
    Store,
    useStore: () => null as unknown as Data,
  };
};

export { createStore };
