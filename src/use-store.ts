import type { ContextValue, Payload, Selector } from "./types";
import { Context, useCallback, useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "./use-iso-layout-effect";

export const useStore = <Value extends object, SelectedValue>(
  context: Context<{ current: ContextValue<Value> }>,
  selector: Selector<Value, SelectedValue>,
) => {
  const contextValue = useContext(context);

  const {
    value: { current: value },
    version: { current: version },
    subscribers,
  } = contextValue.current;
  const selected = selector(value);

  if (version === -1) {
    throw new Error("useStore must be used within a Store");
  }

  const [selectedValue, setSelectedValue] = useState<
    readonly [Value, SelectedValue]
  >([value, selected]);

  const dispatch = useCallback(
    (payload: Payload<Value>) => {
      setSelectedValue(([value, selected]) => [
        payload[1],
        selector(payload[1]),
      ]);
    },
    [selector],
  );

  useIsomorphicLayoutEffect(() => {
    subscribers.push(dispatch);
    return () => {
      subscribers.splice(subscribers.indexOf(dispatch), 1);
    };
  }, [dispatch]);

  return selectedValue[1];
};
