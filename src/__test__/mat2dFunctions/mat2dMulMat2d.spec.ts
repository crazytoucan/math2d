import { mat2dMulMat2d } from "../../mat2dFunctions/mat2dMulMat2d";
import { expectMat2dEqualsApprox, _mat2d } from "../helpers";

describe("mat2dMulMat2d", () => {
  it.each`
    a                      | b                        | result
    ${[1, 0, 0, 1, 0, 0]}  | ${[1, 0, 0, 1, 0, 0]}    | ${[1, 0, 0, 1, 0, 0]}
    ${[3, 4, 5, 6, 7, 8]}  | ${[1, 0, 0, 1, 0, 0]}    | ${[3, 4, 5, 6, 7, 8]}
    ${[1, -1, 1, 1, 0, 0]} | ${[1, 1, -1, 1, 0, 0]}   | ${[2, 0, 0, 2, 0, 0]}
    ${[3, 4, 5, 6, 7, 8]}  | ${[1, -2, 3, -4, 5, -6]} | ${[-7, -8, -11, -12, -8, -2]}
  `("$a $b => $result", ({ a, b, result }) => {
    expectMat2dEqualsApprox(mat2dMulMat2d(_mat2d(a), _mat2d(b)), _mat2d(result));
  });
});
