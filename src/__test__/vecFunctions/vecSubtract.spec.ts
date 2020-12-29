import { vecSubtract } from "../../vecFunctions/vecSubtract";
import { expectVecEqualsApprox, _vec } from "../helpers";

describe("vecSubtract", () => {
  it.each`
    v0        | v1          | result
    ${[4, 5]} | ${[20, 30]} | ${[-16, -25]}
  `("$v0 $v1 => $result", ({ v0, v1, result }) => {
    expectVecEqualsApprox(vecSubtract(_vec(v0), _vec(v1)), _vec(result));
  });
});
