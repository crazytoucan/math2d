import { mat2x3AffTranslate } from "../../mat2x3Functions/mat2x3AffTranslate";
import { mat2x3Reset } from "../../mat2x3Functions/mat2x3Reset";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3AffTranslate", () => {
  it("[1 2 3 4 5 6], 7, 4 => [1 2 3 4 12 10]", () => {
    expectMat2x3EqualsApprox(mat2x3AffTranslate(mat2x3Reset(1, 2, 3, 4, 5, 6), 7, 4), mat2x3Reset(1, 2, 3, 4, 12, 10));
  });

  it("[1 2 3 4 5 6] NaN, NaN => [1 2 3 4 NaN NaN]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffTranslate(mat2x3Reset(1, 2, 3, 4, 5, 6), NaN, NaN),
      mat2x3Reset(1, 2, 3, 4, NaN, NaN),
    );
  });
});
