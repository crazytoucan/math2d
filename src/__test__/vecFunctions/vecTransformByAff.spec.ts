import { mat2x3AffIdentity, mat2x3Reset } from "../../functions/mat2x3Functions";
import { vecReset, vecTransformByAff } from "../../functions/vecFunctions";
import { expectVecEqualsApprox } from "../helpers";

describe("vecTransformByAff", () => {
  it("[1 0 0 1 0 0](3, 4) => (3, 4)", () => {
    expectVecEqualsApprox(vecTransformByAff(vecReset(3, 4), mat2x3AffIdentity()), vecReset(3, 4));
  });

  it("[2 0 0 2 10 20](3, 4) => (16,28)", () => {
    expectVecEqualsApprox(vecTransformByAff(vecReset(3, 4), mat2x3Reset(2, 0, 0, 2, 10, 20)), vecReset(16, 28));
  });

  it("[0 -1 1 0 10 20](3, 4) => (14,17)", () => {
    expectVecEqualsApprox(vecTransformByAff(vecReset(3, 4), mat2x3Reset(0, -1, 1, 0, 10, 20)), vecReset(14, 17));
  });
});
