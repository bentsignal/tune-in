"use client";

import { useState } from "react";
import { createStore } from "../../src/create-store";

export const { Store, useStore } = createStore(
  ({ initialCount = 10 }: { initialCount?: number }) => {
    const [count, setCount] = useState(initialCount);
    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => prev - 1);
    return {
      count,
      increment,
      decrement,
    };
  },
);

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {children}
    </div>
  );
};

export const Value = () => {
  const count = useStore((store) => store.count);
  return <p>Count: {count}</p>;
};

export const IncrementButton = () => {
  const increment = useStore((store) => store.increment);
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-40 h-10"
      onClick={increment}
    >
      Increment
    </button>
  );
};

export const DecrementButton = () => {
  const decrement = useStore((store) => store.decrement);
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-40 h-10"
      onClick={decrement}
    >
      Decrement
    </button>
  );
};
