import { boxAlloc } from "../../boxFunctions/boxAlloc";

it("boxAlloc", () => {
  expect(boxAlloc()).toEqual({
    minX: NaN,
    minY: NaN,
    maxX: NaN,
    maxY: NaN,
  });
});
