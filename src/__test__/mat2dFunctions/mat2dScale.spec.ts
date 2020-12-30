import { mat2dScale } from "../../mat2dFunctions/mat2dScale";
import { expectMat2dEqualsApprox, _mat2dValues } from "../helpers";

describe("mat2dScale", () => {
  it.each`
    mat                   | s      | result
    ${[1, 2, 3, 4, 5, 6]} | ${7}   | ${[7, 14, 21, 28, 35, 42]}
    ${[1, 0, 0, 1, 0, 0]} | ${NaN} | ${[NaN, NaN, NaN, NaN, NaN, NaN]}
  `("$mat $s => $result", ({ mat, s, result }) => {
    expectMat2dEqualsApprox(mat2dScale(_mat2dValues(mat), s), _mat2dValues(result));
  });
});
