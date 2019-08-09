import { boxAlloc } from "../../boxFunctions/boxAlloc";
import { boxEnclosingPoints } from "../../boxFunctions/boxEnclosingPoints";
import { vecReset } from "../../vecFunctions/vecReset";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxEnclosingPoints", () => {
  it("no points => [Infinity, Infinity, -Infinity, -Infinity]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints([]), Infinity, Infinity, -Infinity, -Infinity);
  });

  it("(NaN, NaN) => [Infinity, Infinity, -Infinity, -Infinity]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints([vecReset(NaN, NaN)]), Infinity, Infinity, -Infinity, -Infinity);
  });

  it("(1, 2) => [1 2 1 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints([vecReset(1, 2)]), 1, 2, 1, 2);
  });

  it("(1, 2), (-1, -2) => [-1 -2 1 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints([vecReset(1, 2), vecReset(-1, -2)]), -1, -2, 1, 2);
  });

  it("(1, 2), (-1, -2), (2, -1) => [-1 -2 2 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints([vecReset(1, 2), vecReset(-1, -2), vecReset(2, -1)]), -1, -2, 2, 2);
  });

  it("(1, 2), (-1, -2), (2, -1), (-2, 1) => [-2 -2 2 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints([vecReset(1, 2), vecReset(-1, -2), vecReset(2, -1), vecReset(-2, 1)]), -2, -2, 2, 2);
  });

  it("(NaN, NaN), (-1, -2), (2, -1), (-2, 1) => [-2 -2 2 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints([vecReset(NaN, NaN), vecReset(-1, -2), vecReset(2, -1), vecReset(-2, 1)]), -2, -2, 2, 1);
  });

  it("(-3, NaN), (-1, -2), (2, -1), (-2, 1) => [-2 -2 2 2]", () => {
    expectBoxEqualsApprox(boxEnclosingPoints([vecReset(-3, NaN), vecReset(-1, -2), vecReset(2, -1), vecReset(-2, 1)]), -3, -2, 2, 1);
  });

  it("updates an `out` box if provided", () => {
    const out = boxAlloc();
    boxEnclosingPoints([vecReset(1, 2)], out);
    expectBoxEqualsApprox(out, 1, 2, 1, 2);
  });
});
