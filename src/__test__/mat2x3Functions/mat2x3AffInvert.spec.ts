import { mat2x3AffIdentity, mat2x3AffInvert, mat2x3Reset } from "../../functions/mat2x3Functions";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3AffInvert", () => {
  it("[1 0 0 1 0 0]⁻¹ => [1 0 0 1 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffInvert(mat2x3AffIdentity()), mat2x3Reset(1, 0, 0, 1, 0, 0));
  });

  it("[1 0 0 1 -10 20]⁻¹ => [1 0 0 1 10 -20]", () => {
    expectMat2x3EqualsApprox(mat2x3AffInvert(mat2x3Reset(1, 0, 0, 1, -10, 20)), mat2x3Reset(1, 0, 0, 1, 10, -20));
  });

  it("[0.5 0 0 -0.25 0 0]⁻¹ => [2 0 0 -4 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffInvert(mat2x3Reset(0.5, 0, 0, -0.25, 0, 0)), mat2x3Reset(2, 0, 0, -4, 0, 0));
  });

  it("[0 0.5 -0.5 0 6 -8]⁻¹ => [0 -2 2 0 16 12]", () => {
    expectMat2x3EqualsApprox(mat2x3AffInvert(mat2x3Reset(0, 0.5, -0.5, 0, 6, -8)), mat2x3Reset(0, -2, 2, 0, 16, 12));
  });

  it("[4 4 4 4 6 8]⁻¹ => [NaN NaN NaN NaN NaN NaN]", () => {
    expectMat2x3EqualsApprox(mat2x3AffInvert(mat2x3Reset(4, 4, 4, 4, 6, 8)), mat2x3Reset(NaN, NaN, NaN, NaN, NaN, NaN));
  });

  it("[1 0 1 0 6 8]⁻¹ => [NaN NaN NaN NaN NaN NaN]", () => {
    expectMat2x3EqualsApprox(mat2x3AffInvert(mat2x3Reset(1, 0, 1, 0, 6, 8)), mat2x3Reset(NaN, NaN, NaN, NaN, NaN, NaN));
  });

  it("[3 12 -4 -16 0 0]⁻¹ => [NaN NaN NaN NaN NaN NaN]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffInvert(mat2x3Reset(3, 12, -4, -16, 0, 0)),
      mat2x3Reset(NaN, NaN, NaN, NaN, NaN, NaN),
    );
  });
});
