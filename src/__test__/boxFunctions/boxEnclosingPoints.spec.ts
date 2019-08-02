import { boxEnclosingPoints } from "../../boxFunctions/boxEnclosingPoints";
// import { boxReset } from "../../boxFunctions/boxReset";
import { vecReset } from '../../vecFunctions/vecReset';
import { expectBoxEqualsApprox } from "../helpers";

describe("boxEnclosingPoints", () => {
  it("no points => [NaN NaN NaN NaN]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints(), NaN, NaN, NaN, NaN);
  });

  it("(NaN, NaN) => [NaN, NaN, NaN, NaN]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints(vecReset(NaN, NaN)), NaN, NaN, NaN, NaN);
  });

  it("(1, 2) => [1 2 1 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints(vecReset(1, 2)), 1, 2, 1, 2);
  });

  it("(1, 2), (-1, -2) => [-1 -2 1 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints(vecReset(1, 2), vecReset(-1, -2)), -1, -2, 1, 2);
  });

  it("(1, 2), (-1, -2), (2, -1) => [-1 -2 2 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints(vecReset(1, 2), vecReset(-1, -2), vecReset(2, -1)), -1, -2, 2, 2);
  });

  it("(1, 2), (-1, -2), (2, -1), (-2, 1) => [-2 -2 2 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints(vecReset(1, 2), vecReset(-1, -2), vecReset(2, -1), vecReset(-2, 1)), -2, -2, 2, 2);
  });

  it("(NaN, NaN), (-1, -2), (2, -1), (-2, 1) => [-2 -2 2 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints(vecReset(NaN, NaN), vecReset(-1, -2), vecReset(2, -1), vecReset(-2, 1)), -2, -2, 2, 1);
  });

  it("(-3, NaN), (-1, -2), (2, -1), (-2, 1) => [-2 -2 2 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints(vecReset(-3, NaN), vecReset(-1, -2), vecReset(2, -1), vecReset(-2, 1)), -3, -2, 2, 1);
  });
});
