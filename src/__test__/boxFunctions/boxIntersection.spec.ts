import { boxIntersection } from "../../boxFunctions/boxIntersection";
import { expectBoxEqualsApprox, _boxValues } from "../helpers";

describe("boxIntersection", () => {
  it.each`
    a                                             | b                         | result
    ${[-1, -1, 1, 1]}                             | ${[-1, -1, 1, 1]}         | ${[-1, -1, 1, 1]}
    ${[-1, -1, 1, 1]}                             | ${[-1, -1, 1, 2]}         | ${[-1, -1, 1, 1]}
    ${[-1, -1, 1, 1]}                             | ${[0, 0, 0, 0]}           | ${[0, 0, 0, 0]}
    ${[-1, -1, 1, 1]}                             | ${[-0.5, -0.5, 0.5, 0.5]} | ${[-0.5, -0.5, 0.5, 0.5]}
    ${[-1, -1, 1, 1]}                             | ${[3, -1, 5, 1]}          | ${[3, -1, 1, 1]}
    ${[-Infinity, -Infinity, Infinity, Infinity]} | ${[-0.5, -0.5, 0.5, 0.5]} | ${[-0.5, -0.5, 0.5, 0.5]}
    ${[Infinity, Infinity, -Infinity, -Infinity]} | ${[-0.5, -0.5, 0.5, 0.5]} | ${[Infinity, Infinity, -Infinity, -Infinity]}
  `("$a $b => $result", ({ a, b, result }) => {
    expectBoxEqualsApprox(boxIntersection(_boxValues(a), _boxValues(b)), _boxValues(result));
  });
});
