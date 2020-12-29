import { mat2dDeterminant } from "../../mat2dFunctions/mat2dDeterminant";
import { _mat2d } from "../helpers";

describe("mat2dDeterminant", () => {
  it.each`
    mat                        | result
    ${[1, 0, 0, 1, 0, 0]}      | ${1}
    ${[2, 0, 0, 2, 10, 10]}    | ${4}
    ${[4, -7, 8, 5, NaN, NaN]} | ${76}
  `("$mat => $result", ({ mat, result }) => {
    expect(mat2dDeterminant(_mat2d(mat))).toBe(result);
  });
});
