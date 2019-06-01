import { mat2x3AffFromTranslation, mat2x3Reset } from "../../functions/mat2x3Functions";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3AffFromTranslation", () => {
  it("0, 0 => [1 0 0 1 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromTranslation(0, 0), mat2x3Reset(1, 0, 0, 1, 0, 0));
  });

  it("10, -20 => [1 0 0 1 10 -20]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromTranslation(10, -20), mat2x3Reset(1, 0, 0, 1, 10, -20));
  });

  it("NaN, NaN => [1 0 0 1 NaN NaN]", () => {
    expectMat2x3EqualsApprox(mat2x3AffFromTranslation(NaN, NaN), mat2x3Reset(1, 0, 0, 1, NaN, NaN));
  });
});
