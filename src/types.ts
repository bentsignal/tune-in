import { ReactNode, RefObject } from "react";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type ComponentProps = {
  children?: ReactNode;
};

type Version = number;

type Subscriber<Value extends object> = (
  payload: readonly [Version, Value],
) => void;

type ContextValue<Value extends object> = {
  subscribers: Subscriber<Value>[];
  value: RefObject<Value>;
  version: RefObject<Version>;
};

export type { Prettify, ComponentProps, ContextValue };
