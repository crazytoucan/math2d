import { mat2dFromTranslation } from "../../mat2dFunctions/mat2dFromTranslation";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectmat2dEqualsApprox } from "../helpers";

describe("mat2dFromTranslation", () => {
  it("0, 0 => [1 0 0 1 0 0]", () => {
    expectmat2dEqualsApprox(mat2dFromTranslation(0, 0), mat2dReset(1, 0, 0, 1, 0, 0));
  });

  it("10, -20 => [1 0 0 1 10 -20]", () => {
    expectmat2dEqualsApprox(mat2dFromTranslation(10, -20), mat2dReset(1, 0, 0, 1, 10, -20));
  });

  it("NaN, NaN => [1 0 0 1 NaN NaN]", () => {
    expectmat2dEqualsApprox(mat2dFromTranslation(NaN, NaN), mat2dReset(1, 0, 0, 1, NaN, NaN));
  });
});
