import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { mat2dScale } from "../../mat2dFunctions/mat2dScale";
import { expectmat2dEqualsApprox } from "../helpers";

describe("mat2dScale", () => {
  it("[1 2 3 4 5 6] scale 7 => [7 14 21 28 35 42]", () => {
    expectmat2dEqualsApprox(mat2dScale(mat2dReset(1, 2, 3, 4, 5, 6), 7), mat2dReset(7, 14, 21, 28, 35, 42));
  });

  it("[1 0 0 1 0 0] scale NaN => [NaN NaN NaN NaN NaN NaN]", () => {
    expectmat2dEqualsApprox(mat2dScale(mat2dIdentity(), NaN), mat2dReset(NaN, NaN, NaN, NaN, NaN, NaN));
  });
});
