import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { mat2dTranslate } from "../../mat2dFunctions/mat2dTranslate";
import { expectmat2dEqualsApprox } from "../helpers";

describe("mat2dTranslate", () => {
  it("[1 2 3 4 5 6], 7, 4 => [1 2 3 4 12 10]", () => {
    expectmat2dEqualsApprox(mat2dTranslate(mat2dReset(1, 2, 3, 4, 5, 6), 7, 4), mat2dReset(1, 2, 3, 4, 12, 10));
  });

  it("[1 2 3 4 5 6] NaN, NaN => [1 2 3 4 NaN NaN]", () => {
    expectmat2dEqualsApprox(
      mat2dTranslate(mat2dReset(1, 2, 3, 4, 5, 6), NaN, NaN),
      mat2dReset(1, 2, 3, 4, NaN, NaN),
    );
  });
});
