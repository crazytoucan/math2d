import { mat2dTranslate } from "../../mat2dFunctions/mat2dTranslate";
import { expectMat2dEqualsApprox, _mat2dValues } from "../helpers";

describe("mat2dTranslate", () => {
  it.each`
    mat                   | x      | y      | result
    ${[1, 2, 3, 4, 5, 6]} | ${7}   | ${4}   | ${[1, 2, 3, 4, 12, 10]}
    ${[1, 2, 3, 4, 5, 6]} | ${NaN} | ${NaN} | ${[1, 2, 3, 4, NaN, NaN]}
  `("$mat $x $y => $result", ({ mat, x, y, result }) => {
    expectMat2dEqualsApprox(mat2dTranslate(_mat2dValues(mat), x, y), _mat2dValues(result));
  });
});
