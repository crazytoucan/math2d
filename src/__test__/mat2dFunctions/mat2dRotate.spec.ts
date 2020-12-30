import { mat2dRotate } from "../../mat2dFunctions/mat2dRotate";
import { expectMat2dEqualsApprox, _mat2dValues } from "../helpers";

const PI = Math.PI;
const SQRT3 = Math.sqrt(3);

describe("mat2dRotate", () => {
  it.each`
    mat                                              | rot             | result
    ${[1, 0, 0, 1, 0, 0]}                            | ${PI / 3}       | ${[0.5, -0.5 * SQRT3, 0.5 * SQRT3, 0.5, 0, 0]}
    ${[1, 0, 0, 1, 10, 20]}                          | ${PI / 3}       | ${[0.5, -0.5 * SQRT3, 0.5 * SQRT3, 0.5, 10, 20]}
    ${[0.5, -0.5 * SQRT3, 0.5 * SQRT3, 0.5, 10, 20]} | ${(2 * PI) / 3} | ${[-1, 0, 0, -1, 10, 20]}
  `("$mat $rot => $result", ({ mat, rot, result }) => {
    expectMat2dEqualsApprox(mat2dRotate(_mat2dValues(mat), rot), _mat2dValues(result));
  });
});
