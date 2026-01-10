import type { ContextValue } from "./types";
import { Context, useContext } from "react";

export const useStore = <Value extends object>(
  context: Context<{ current: ContextValue<Value> }>,
) => {
  const contextValue = useContext(context);
  if (contextValue.current.version.current === -1) {
    throw new Error("useStore must be used within a Store");
  }
  return contextValue.current.value.current;
};
