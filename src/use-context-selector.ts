import type { ContextValue, Payload, Selector, UseStoreOptions } from "./types";
import { Context, useCallback, useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "./use-iso-layout-effect";

const useContextSelector = <
  Value extends object,
  SelectedValue,
  Optional extends boolean | undefined = undefined,
>(
  context: Context<{ current: ContextValue<Value> }>,
  selector: Selector<Value, SelectedValue>,
  options?: UseStoreOptions<Optional>,
): Optional extends true ? SelectedValue | undefined : SelectedValue => {
  const contextValue = useContext(context);

  const {
    value: { current: value },
    version: { current: version },
    subscribers,
  } = contextValue.current;

  const isMissingProvider = version === -1;

  type ReturnValue = Optional extends true
    ? SelectedValue | undefined
    : SelectedValue;
  const selected = (isMissingProvider
    ? undefined
    : selector(value)) as unknown as ReturnValue;

  const [state, setState] = useState<readonly [Value, ReturnValue]>([
    value,
    selected,
  ]);

  const dispatch = useCallback(
    (payload: Payload<Value>) => {
      setState((prev) => {
        if (isMissingProvider) {
          return prev;
        }
        const newVersion = payload[0];
        if (newVersion <= version) {
          return prev;
        }
        const oldValue = prev[0];
        const newValue = payload[1];
        if (Object.is(oldValue, newValue)) {
          return prev;
        }
        const oldSelected = prev[1] as unknown as SelectedValue;
        const newSelected = selector(newValue);
        if (Object.is(oldSelected, newSelected)) {
          return prev;
        }
        return [newValue, newSelected as unknown as ReturnValue] as const;
      });
    },
    [isMissingProvider, selector, version],
  );

  useIsomorphicLayoutEffect(() => {
    if (isMissingProvider) {
      return;
    }
    subscribers.push(dispatch);
    return () => {
      subscribers.splice(subscribers.indexOf(dispatch), 1);
    };
  }, [dispatch, isMissingProvider, subscribers]);

  if (isMissingProvider) {
    if (options?.optional) {
      return undefined as ReturnValue;
    }
    throw new Error("useStore must be used within a Store");
  }

  return state[1] as ReturnValue;
};

export { useContextSelector };
