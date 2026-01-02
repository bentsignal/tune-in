import { test, expect } from "vitest";
import { myFunction } from "./index";

test("myFunction", () => {
  expect(myFunction("test")).toBe("test");
});
