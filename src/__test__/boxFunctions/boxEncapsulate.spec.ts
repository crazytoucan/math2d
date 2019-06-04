import { boxEncapsulate } from "../../boxFunctions/boxEncapsulate";
import { boxReset } from "../../boxFunctions/boxReset";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxEncapsulate", () => {
  it("[-1 -1 +1 +1], (0,0) => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxEncapsulate(boxReset(-1, -1, 1, 1), vecReset(0, 0)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1], (1,0) => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxEncapsulate(boxReset(-1, -1, 1, 1), vecReset(1, 0)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1], (0,-2) => [-1 -2 +1 +1]", () => {
    expectBoxEqualsApprox(boxEncapsulate(boxReset(-1, -1, 1, 1), vecReset(0, -2)), -1, -2, 1, 1);
  });

  it("[-1 -1 +1 +1], (-2,-3) => [-2 -3 +1 +1]", () => {
    expectBoxEqualsApprox(boxEncapsulate(boxReset(-1, -1, 1, 1), vecReset(-2, -3)), -2, -3, 1, 1);
  });

  it("[-1 -1 +1 +1], (-2,4) => [-2 -1 +1 +4]", () => {
    expectBoxEqualsApprox(boxEncapsulate(boxReset(-1, -1, 1, 1), vecReset(-2, 4)), -2, -1, 1, 4);
  });

  it("[-1 -1 +1 +1], (NaN,NaN) => [NaN NaN NaN NaN]", () => {
    expectBoxEqualsApprox(boxEncapsulate(boxReset(-1, -1, 1, 1), vecReset(NaN, NaN)), NaN, NaN, NaN, NaN);
  });
});
