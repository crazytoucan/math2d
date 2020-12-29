import { boxIsEmpty } from "../../boxFunctions/boxIsEmpty";
import { _box } from "../helpers";

describe("boxIsEmpty", () => {
  it.each`
    box                                           | result
    ${[-1, -1, 1, 1]}                             | ${false}
    ${[3, -1, 5, 1]}                              | ${false}
    ${[0, 0, 0, 0]}                               | ${true}
    ${[-Infinity, -Infinity, Infinity, Infinity]} | ${false}
    ${[Infinity, Infinity, -Infinity, -Infinity]} | ${true}
    ${[0, 0, -1, -1]}                             | ${true}
    ${[Infinity, Infinity, 0, 0]}                 | ${true}
    ${[NaN, NaN, NaN, NaN]}                       | ${true}
  `("$box => $result", ({ box, result }) => {
    expect(boxIsEmpty(_box(box))).toBe(result);
  });
});
