import { boxReset } from "../../boxFunctions/boxReset";
import { boxTransformByAff } from "../../boxFunctions/boxTransformByAff";
import { mat2x3AffFromRotation } from "../../mat2x3Functions/mat2x3AffFromRotation";
import { mat2x3AffIdentity } from "../../mat2x3Functions/mat2x3AffIdentity";
import { mat2x3Reset } from "../../mat2x3Functions/mat2x3Reset";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxTransformByAff", () => {
  it("[4 5 6 7], [1 0 0 1 0 0] => [4 5 6 7]", () => {
    expectBoxEqualsApprox(boxTransformByAff(boxReset(4, 5, 6, 7), mat2x3AffIdentity()), 4, 5, 6, 7);
  });

  it("[4 5 6 7], [1 0 0 1 -10 -20] => [-6 -15 -4 -13]", () => {
    expectBoxEqualsApprox(boxTransformByAff(boxReset(4, 5, 6, 7), mat2x3Reset(1, 0, 0, 1, -10, -20)), -6, -15, -4, -13);
  });

  it("[4 5 6 7], [0 -1 1 0 -10 -20] => [-5 -26 -3 -24]", () => {
    expectBoxEqualsApprox(
      boxTransformByAff(boxReset(4, 5, 6, 7), mat2x3Reset(0, -1, 1, 0, -10, -20)),
      -5,
      -26,
      -3,
      -24,
    );
  });

  it("[-2 -2 2 2], [rot 135°] => [-2√2 -2√2 2√2 2√2]", () => {
    const rot = mat2x3AffFromRotation((3 * Math.PI) / 4);
    expectBoxEqualsApprox(
      boxTransformByAff(boxReset(-2, -2, 2, 2), rot),
      -2 * Math.SQRT2,
      -2 * Math.SQRT2,
      2 * Math.SQRT2,
      2 * Math.SQRT2,
    );
  });
});
