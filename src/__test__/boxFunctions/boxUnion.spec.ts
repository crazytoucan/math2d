import { boxUnion } from "../../boxFunctions/boxUnion";
import { expectBoxEqualsApprox, _boxValues } from "../helpers";

describe("boxUnion", () => {
  it.each`
    a                                             | b                         | result
    ${[-1, -1, 1, 1]}                             | ${[-1, -1, 1, 1]}         | ${[-1, -1, 1, 1]}
    ${[-1, -1, 1, 1]}                             | ${[-1, -1, 1, 2]}         | ${[-1, -1, 1, 2]}
    ${[-1, -1, 1, 1]}                             | ${[0, 0, 0, 0]}           | ${[-1, -1, 1, 1]}
    ${[-1, -1, 1, 1]}                             | ${[-0.5, -0.5, 0.5, 0.5]} | ${[-1, -1, 1, 1]}
    ${[-1, -1, 1, 1]}                             | ${[3, -1, 5, 1]}          | ${[-1, -1, 5, 1]}
    ${[-Infinity, -Infinity, Infinity, Infinity]} | ${[-0.5, -0.5, 0.5, 0.5]} | ${[-Infinity, -Infinity, Infinity, Infinity]}
    ${[Infinity, Infinity, -Infinity, -Infinity]} | ${[-0.5, -0.5, 0.5, 0.5]} | ${[-0.5, -0.5, 0.5, 0.5]}
  `("$a $b => $result", ({ a, b, result }) => {
    expectBoxEqualsApprox(boxUnion(_boxValues(a), _boxValues(b)), _boxValues(result));
  });
});
