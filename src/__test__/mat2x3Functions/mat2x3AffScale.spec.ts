import { mat2x3AffIdentity } from "../../mat2x3Functions/mat2x3AffIdentity";
import { mat2x3AffScale } from "../../mat2x3Functions/mat2x3AffScale";
import { mat2x3Reset } from "../../mat2x3Functions/mat2x3Reset";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3AffScale", () => {
  it("[1 2 3 4 5 6] scale 7 => [7 14 21 28 35 42]", () => {
    expectMat2x3EqualsApprox(mat2x3AffScale(mat2x3Reset(1, 2, 3, 4, 5, 6), 7), mat2x3Reset(7, 14, 21, 28, 35, 42));
  });

  it("[1 0 0 1 0 0] scale NaN => [NaN NaN NaN NaN NaN NaN]", () => {
    expectMat2x3EqualsApprox(mat2x3AffScale(mat2x3AffIdentity(), NaN), mat2x3Reset(NaN, NaN, NaN, NaN, NaN, NaN));
  });
});
