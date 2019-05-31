import { vecReset, vecScale } from "../../functions/vecFunctions";
import { expectVecEqualsApprox, expectVecNaNs } from "../helpers";

describe("vecScale", () => {
  it("3(6,2) => (18,6)", () => {
    expectVecEqualsApprox(vecScale(vecReset(6, 2), 3), 18, 6);
  });

  it("-3(6,-2) => (-18,6)", () => {
    expectVecEqualsApprox(vecScale(vecReset(6, -2), -3), -18, 6);
  });

  it("NaN(6,-2) => (NaN,NaN)", () => {
    expectVecNaNs(vecScale(vecReset(6, -2), NaN));
  });

  it("0(4,5) => (0,0)", () => {
    expectVecEqualsApprox(vecScale(vecReset(4, 5), 0), 0, 0);
  });
});
