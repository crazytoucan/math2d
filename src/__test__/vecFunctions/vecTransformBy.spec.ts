import { vecTransformBy } from "../../vecFunctions/vecTransformBy";
import { expectVecEqualsApprox, _mat2d, _vec } from "../helpers";

describe("vecTransformBy", () => {
  it.each`
    vec       | mat                      | result
    ${[3, 4]} | ${[1, 0, 0, 1, 0, 0]}    | ${[3, 4]}
    ${[3, 4]} | ${[2, 0, 0, 2, 10, 20]}  | ${[16, 28]}
    ${[3, 4]} | ${[0, -1, 1, 0, 10, 20]} | ${[14, 17]}
  `("$vec $mat => $result", ({ vec, mat, result }) => {
    expectVecEqualsApprox(vecTransformBy(_vec(vec), _mat2d(mat)), _vec(result));
  });
});
