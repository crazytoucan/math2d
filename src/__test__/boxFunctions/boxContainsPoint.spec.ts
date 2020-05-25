import { boxContainsPoint } from "../../boxFunctions/boxContainsPoint";
import { boxReset } from "../../boxFunctions/boxReset";
import { IntervalMode } from "../../const";
import { vecReset } from "../../vecFunctions/vecReset";

describe("boxContainsPoint", () => {
  it("[-1 -1 +1 +1] ∋ (0, 0) => true", () => {
    expect(boxContainsPoint(boxReset(-1, -1, 1, 1), vecReset(0, 0), IntervalMode.CLOSED)).toBe(true);
  });

  it("[-1 -1 +1 +1] ∋ (1, 0) => true", () => {
    expect(boxContainsPoint(boxReset(-1, -1, 1, 1), vecReset(1, 0), IntervalMode.CLOSED)).toBe(true);
  });

  it("[-1 -1 +1 +1] ∋ (0, -2) => false", () => {
    expect(boxContainsPoint(boxReset(-1, -1, 1, 1), vecReset(0, -2), IntervalMode.CLOSED)).toBe(false);
  });

  it("[-1 -1 +1 +1] ∋ (-2, -3) => false", () => {
    expect(boxContainsPoint(boxReset(-1, -1, 1, 1), vecReset(-2, -3), IntervalMode.CLOSED)).toBe(false);
  });

  it("[-1 -1 +1 +1] ∋ (NaN, NaN) => false", () => {
    expect(boxContainsPoint(boxReset(-1, -1, 1, 1), vecReset(NaN, NaN), IntervalMode.CLOSED)).toBe(false);
  });

  it("[-∞ -∞ +∞ +∞] ∋ (1, 1) => true", () => {
    expect(
      boxContainsPoint(boxReset(-Infinity, -Infinity, Infinity, Infinity), vecReset(1, 1), IntervalMode.CLOSED),
    ).toBe(true);
  });

  it("[+∞ +∞ -∞ -∞] ∋ (1, 1) => true", () => {
    expect(
      boxContainsPoint(boxReset(Infinity, Infinity, -Infinity, -Infinity), vecReset(1, 1), IntervalMode.CLOSED),
    ).toBe(false);
  });
});
