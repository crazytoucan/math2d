import { vecReset } from "../../vecFunctions/vecReset";
import { vecScale } from "../../vecFunctions/vecScale";
import { expectVecEqualsApprox } from "../helpers";

describe("vecScale", () => {
  it("3(6,2) => (18,6)", () => {
    expectVecEqualsApprox(vecScale(vecReset(6, 2), 3), vecReset(18, 6));
  });

  it("-3(6,-2) => (-18,6)", () => {
    expectVecEqualsApprox(vecScale(vecReset(6, -2), -3), vecReset(-18, 6));
  });

  it("NaN(6,-2) => (NaN,NaN)", () => {
    expectVecEqualsApprox(vecScale(vecReset(6, -2), NaN), vecReset(NaN, NaN));
  });

  it("0(4,5) => (0,0)", () => {
    expectVecEqualsApprox(vecScale(vecReset(4, 5), 0), vecReset(0, 0));
  });
});
