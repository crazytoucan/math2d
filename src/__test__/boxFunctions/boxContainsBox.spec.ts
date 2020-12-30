import { boxContainsBox } from "../../boxFunctions/boxContainsBox";
import { _boxValues } from "../helpers";

describe("boxContainsBox", () => {
  it.each`
    a                                             | b                         | result
    ${[-1, -1, 1, 1]}                             | ${[-1, -1, 1, 1]}         | ${true}
    ${[-1, -1, 1, 1]}                             | ${[-1, -1, 1, 2]}         | ${false}
    ${[-1, -1, 1, 1]}                             | ${[0, 0, 0, 0]}           | ${true}
    ${[-1, -1, 1, 1]}                             | ${[-0.5, -0.5, 0.5, 0.5]} | ${true}
    ${[-Infinity, -Infinity, Infinity, Infinity]} | ${[-0.5, -0.5, 0.5, 0.5]} | ${true}
    ${[Infinity, Infinity, -Infinity, -Infinity]} | ${[-0.5, -0.5, 0.5, 0.5]} | ${false}
  `("$a $b => $result", ({ a, b, result }) => {
    expect(boxContainsBox(_boxValues(a), _boxValues(b))).toBe(result);
  });
});
