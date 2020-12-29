import { vecAdd } from "../../vecFunctions/vecAdd";
import { expectVecEqualsApprox, _vecValues } from "../helpers";

describe("vecAdd", () => {
  it.each`
    v0        | v1          | result
    ${[4, 5]} | ${[20, 30]} | ${[24, 35]}
  `("$v0 $v1 => $result", ({ v0, v1, result }) => {
    expectVecEqualsApprox(vecAdd(_vecValues(v0), _vecValues(v1)), _vecValues(result));
  });
});
