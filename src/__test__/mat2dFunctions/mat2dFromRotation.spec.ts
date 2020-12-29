import { mat2dFromRotation } from "../../mat2dFunctions/mat2dFromRotation";
import { expectMat2dEqualsApprox, _mat2d } from "../helpers";

const SQRT1_2 = Math.SQRT1_2;
const PI = Math.PI;
describe("mat2dFromRotation", () => {
  it.each`
    rot                   | result
    ${0}                  | ${[1, 0, 0, 1, 0, 0]}
    ${PI}                 | ${[-1, 0, 0, -1, 0, 0]}
    ${(3 * PI) / 4}       | ${[-SQRT1_2, -SQRT1_2, SQRT1_2, -SQRT1_2, 0, 0]}
    ${Math.atan2(-8, -6)} | ${[-0.6, 0.8, -0.8, -0.6, 0, 0]}
  `("$rot => $result", ({ rot, result }) => {
    expectMat2dEqualsApprox(mat2dFromRotation(rot), _mat2d(result));
  });
});
