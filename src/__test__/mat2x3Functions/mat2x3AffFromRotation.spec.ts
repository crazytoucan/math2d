import { expectMat2x3EqualsApprox } from "../helpers";
import { mat2x3AffFromRotation } from "../../functions/mat2x3Functions";

describe("mat2x3AffFromRotation", () => {
  it("0 => [1 0 0 1 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromRotation(0), 1, 0, 0, 1, 0, 0);
  });

  it("π => [-1 0 0 -1 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromRotation(Math.PI), -1, 0, 0, -1, 0, 0);
  });

  it("3π/4 => [-√2/2 -√2/2 +√2/2 -√2/2 0 0]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffFromRotation((3 * Math.PI) / 4),
      -Math.SQRT1_2,
      -Math.SQRT1_2,
      Math.SQRT1_2,
      -Math.SQRT1_2,
      0,
      0,
    );
  });

  it("atan2(-8, -6) => [-0.6 0.8 -0.8 -0.6 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromRotation(Math.atan2(-8, -6)), -0.6, 0.8, -0.8, -0.6, 0, 0);
  });
});
