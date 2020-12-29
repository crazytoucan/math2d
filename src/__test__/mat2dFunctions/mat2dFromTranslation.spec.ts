import { mat2dFromTranslation } from "../../mat2dFunctions/mat2dFromTranslation";
import { expectMat2dEqualsApprox, _mat2d } from "../helpers";

describe("mat2dFromTranslation", () => {
  it.each`
    x      | y      | result
    ${0}   | ${0}   | ${[1, 0, 0, 1, 0, 0]}
    ${10}  | ${-20} | ${[1, 0, 0, 1, 10, -20]}
    ${NaN} | ${NaN} | ${[1, 0, 0, 1, NaN, NaN]}
  `("$x $y => $result", ({ x, y, result }) => {
    expectMat2dEqualsApprox(mat2dFromTranslation(x, y), _mat2d(result));
  });
});
