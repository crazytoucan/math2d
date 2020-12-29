import { mat2dInvert } from "../../mat2dFunctions/mat2dInvert";
import { expectMat2dEqualsApprox, _mat2d } from "../helpers";

describe("mat2dInvert", () => {
  it.each`
    mat                         | result
    ${[1, 0, 0, 1, 0, 0]}       | ${[1, 0, 0, 1, 0, 0]}
    ${[1, 0, 0, 1, -10, 20]}    | ${[1, 0, 0, 1, 10, -20]}
    ${[0.5, 0, 0, -0.25, 0, 0]} | ${[2, 0, 0, -4, 0, 0]}
    ${[0, 0.5, -0.5, 0, 6, -8]} | ${[0, -2, 2, 0, 16, 12]}
    ${[4, 4, 4, 4, 6, 8]}       | ${[NaN, NaN, NaN, NaN, NaN, NaN]}
    ${[1, 0, 1, 0, 6, 8]}       | ${[NaN, NaN, NaN, NaN, NaN, NaN]}
    ${[3, 12, -4, -16, 0, 0]}   | ${[NaN, NaN, NaN, NaN, NaN, NaN]}
  `("$mat => $result", ({ mat, result }) => {
    expectMat2dEqualsApprox(mat2dInvert(_mat2d(mat)), _mat2d(result));
  });
});
