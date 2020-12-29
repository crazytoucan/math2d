import { boxTransformBy } from "../../boxFunctions/boxTransformBy";
import { expectBoxEqualsApprox, _boxValues, _mat2dValues } from "../helpers";

describe("boxTransformBy", () => {
  const SQRT2 = Math.SQRT2;
  it.each`
    box               | mat                                                              | result
    ${[4, 5, 6, 7]}   | ${[1, 0, 0, 1, 0, 0]}                                            | ${[4, 5, 6, 7]}
    ${[4, 5, 6, 7]}   | ${[1, 0, 0, 1, -10, -20]}                                        | ${[-6, -15, -4, -13]}
    ${[4, 5, 6, 7]}   | ${[0, -1, 1, 0, -10, -20]}                                       | ${[-5, -26, -3, -24]}
    ${[-2, -2, 2, 2]} | ${[-0.5 * SQRT2, -0.5 * SQRT2, 0.5 * SQRT2, -0.5 * SQRT2, 0, 0]} | ${[-2 * SQRT2, -2 * SQRT2, 2 * SQRT2, 2 * SQRT2]}
  `("$box $mat => $result", ({ box, mat, result }) => {
    expectBoxEqualsApprox(boxTransformBy(_boxValues(box), _mat2dValues(mat)), _boxValues(result));
  });
});
