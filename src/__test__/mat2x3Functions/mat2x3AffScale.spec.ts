import { mat2x3AffIdentity, mat2x3AffScale, mat2x3Reset } from "../../functions/mat2x3Functions";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3AffScale", () => {
  it("[1 2 3 4 5 6] scale 7 => [7 14 21 28 5 6]", () => {
    expectMat2x3EqualsApprox(mat2x3AffScale(mat2x3Reset(1, 2, 3, 4, 5, 6), 7), mat2x3Reset(7, 14, 21, 28, 5, 6));
  });

  it("[1 0 0 1 0 0] scale NaN => [NaN NaN NaN NaN 0 0]", () => {
    expectMat2x3EqualsApprox(mat2x3AffScale(mat2x3AffIdentity(), NaN), mat2x3Reset(NaN, NaN, NaN, NaN, 0, 0));
  });
});
