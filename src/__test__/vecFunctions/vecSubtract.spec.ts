import { vecSubtract } from "../../vecFunctions/vecSubtract";
import { expectVecEqualsApprox, _vecValues } from "../helpers";

describe("vecSubtract", () => {
  it.each`
    v0        | v1          | result
    ${[4, 5]} | ${[20, 30]} | ${[-16, -25]}
  `("$v0 $v1 => $result", ({ v0, v1, result }) => {
    expectVecEqualsApprox(vecSubtract(_vecValues(v0), _vecValues(v1)), _vecValues(result));
  });
});
