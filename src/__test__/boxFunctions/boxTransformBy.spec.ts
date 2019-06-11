import { boxReset } from "../../boxFunctions/boxReset";
import { boxTransformBy } from "../../boxFunctions/boxTransformBy";
import { mat2dFromRotation } from "../../mat2dFunctions/mat2dFromRotation";
import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxTransformBy", () => {
  it("[4 5 6 7], [1 0 0 1 0 0] => [4 5 6 7]", () => {
    expectBoxEqualsApprox(boxTransformBy(boxReset(4, 5, 6, 7), mat2dIdentity()), 4, 5, 6, 7);
  });

  it("[4 5 6 7], [1 0 0 1 -10 -20] => [-6 -15 -4 -13]", () => {
    expectBoxEqualsApprox(boxTransformBy(boxReset(4, 5, 6, 7), mat2dReset(1, 0, 0, 1, -10, -20)), -6, -15, -4, -13);
  });

  it("[4 5 6 7], [0 -1 1 0 -10 -20] => [-5 -26 -3 -24]", () => {
    expectBoxEqualsApprox(
      boxTransformBy(boxReset(4, 5, 6, 7), mat2dReset(0, -1, 1, 0, -10, -20)),
      -5,
      -26,
      -3,
      -24,
    );
  });

  it("[-2 -2 2 2], [rot 135°] => [-2√2 -2√2 2√2 2√2]", () => {
    const rot = mat2dFromRotation((3 * Math.PI) / 4);
    expectBoxEqualsApprox(
      boxTransformBy(boxReset(-2, -2, 2, 2), rot),
      -2 * Math.SQRT2,
      -2 * Math.SQRT2,
      2 * Math.SQRT2,
      2 * Math.SQRT2,
    );
  });
});
