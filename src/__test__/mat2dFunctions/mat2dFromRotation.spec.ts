import { mat2dFromRotation } from "../../mat2dFunctions/mat2dFromRotation";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectMat2dEqualsApprox } from "../helpers";

describe("mat2dFromRotation", () => {
  it("0 => [1 0 0 1 0 0]", () => {
    expectMat2dEqualsApprox(mat2dFromRotation(0), mat2dReset(1, 0, 0, 1, 0, 0));
  });

  it("π => [-1 0 0 -1 0 0]", () => {
    expectMat2dEqualsApprox(mat2dFromRotation(Math.PI), mat2dReset(-1, 0, 0, -1, 0, 0));
  });

  it("3π/4 => [-√2/2 -√2/2 +√2/2 -√2/2 0 0]", () => {
    expectMat2dEqualsApprox(
      mat2dFromRotation((3 * Math.PI) / 4),
      mat2dReset(-Math.SQRT1_2, -Math.SQRT1_2, Math.SQRT1_2, -Math.SQRT1_2, 0, 0),
    );
  });

  it("atan2(-8, -6) => [-0.6 0.8 -0.8 -0.6 0 0]", () => {
    expectMat2dEqualsApprox(mat2dFromRotation(Math.atan2(-8, -6)), mat2dReset(-0.6, 0.8, -0.8, -0.6, 0, 0));
  });
});
