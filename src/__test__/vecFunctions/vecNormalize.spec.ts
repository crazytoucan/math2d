import { vecNormalize } from "../../vecFunctions/vecNormalize";
import { expectVecEqualsApprox, _vec } from "../helpers";

describe("vecNormalize", () => {
  it.each`
    vec            | result
    ${[0.6, -0.8]} | ${[0.6, -0.8]}
    ${[0.3, -0.4]} | ${[0.6, -0.8]}
    ${[-20, 21]}   | ${[-20 / 29, 21 / 29]}
    ${[0, 0]}      | ${[NaN, NaN]}
    ${[NaN, NaN]}  | ${[NaN, NaN]}
  `("$vec => $result", ({ vec, result }) => {
    expectVecEqualsApprox(vecNormalize(_vec(vec)), _vec(result));
  });
});
