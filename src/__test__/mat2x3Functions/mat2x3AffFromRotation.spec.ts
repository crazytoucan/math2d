import { mat2x3AffFromRotation, mat2x3Reset } from "../../functions/mat2x3Functions";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3AffFromRotation", () => {
  it("0 => [1 0 0 1 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromRotation(0), mat2x3Reset(1, 0, 0, 1, 0, 0));
  });

  it("π => [-1 0 0 -1 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromRotation(Math.PI), mat2x3Reset(-1, 0, 0, -1, 0, 0));
  });

  it("3π/4 => [-√2/2 -√2/2 +√2/2 -√2/2 0 0]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffFromRotation((3 * Math.PI) / 4),
      mat2x3Reset(-Math.SQRT1_2, -Math.SQRT1_2, Math.SQRT1_2, -Math.SQRT1_2, 0, 0),
    );
  });

  it("atan2(-8, -6) => [-0.6 0.8 -0.8 -0.6 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromRotation(Math.atan2(-8, -6)), mat2x3Reset(-0.6, 0.8, -0.8, -0.6, 0, 0));
  });
});
