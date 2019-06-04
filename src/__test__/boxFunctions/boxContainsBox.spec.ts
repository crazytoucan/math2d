import { boxContainsBox } from "../../boxFunctions/boxContainsBox";
import { boxReset } from "../../boxFunctions/boxReset";

describe("boxContainsBox", () => {
  it("[-1 -1 +1 +1] ⊇ [-1 -1 +1 +1] => true", () => {
    expect(boxContainsBox(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 1))).toBe(true);
  });

  it("[-1 -1 +1 +1] ⊇ [-1 -1 +1 +2] => false", () => {
    expect(boxContainsBox(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 2))).toBe(false);
  });

  it("[-1 -1 +1 +1] ⊇ [0 0 0 0] => true", () => {
    expect(boxContainsBox(boxReset(-1, -1, 1, 1), boxReset(0, 0, 0, 0))).toBe(true);
  });

  it("[-1 -1 +1 +1] ⊇ [-0.5 -0.5 +0.5 +0.5] => true", () => {
    expect(boxContainsBox(boxReset(-1, -1, 1, 1), boxReset(-0.5, -0.5, 0.5, 0.5))).toBe(true);
  });

  it("[-∞ -∞ +∞ +∞] ⊇ [-0.5 -0.5 +0.5 +0.5] => true", () => {
    expect(boxContainsBox(boxReset(-Infinity, -Infinity, Infinity, Infinity), boxReset(-0.5, -0.5, 0.5, 0.5))).toBe(
      true,
    );
  });

  it("[∞ ∞ -∞ -∞] ⊇ [-0.5 -0.5 +0.5 +0.5] => false", () => {
    expect(boxContainsBox(boxReset(Infinity, Infinity, -Infinity, -Infinity), boxReset(-0.5, -0.5, 0.5, 0.5))).toBe(
      false,
    );
  });
});
