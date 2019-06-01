import { boxIntersectsBox, boxReset } from "../../functions/boxFunctions";

describe("boxIntersectsBox", () => {
  it("[-1 -1 +1 +1] ⋂? [-1 -1 +1 +1] => true", () => {
    expect(boxIntersectsBox(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 1))).toBe(true);
  });

  it("[-1 -1 +1 +1] ⋂? [-1 -1 +1 +2] => true", () => {
    expect(boxIntersectsBox(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 2))).toBe(true);
  });

  it("[-1 -1 +1 +1] ⋂? [0 0 0 0] => true", () => {
    expect(boxIntersectsBox(boxReset(-1, -1, 1, 1), boxReset(0, 0, 0, 0))).toBe(true);
  });

  it("[-1 -1 +1 +1] ⋂? [-0.5 -0.5 +0.5 +0.5] => true", () => {
    expect(boxIntersectsBox(boxReset(-1, -1, 1, 1), boxReset(-0.5, -0.5, 0.5, 0.5))).toBe(true);
  });

  it("[-1 -1 +1 +1] ⋂? [+3 -1 +5 +1] => false", () => {
    expect(boxIntersectsBox(boxReset(-1, -1, 1, 1), boxReset(3, -1, 5, 1))).toBe(false);
  });

  it("[-∞ -∞ +∞ +∞] ⋂? [-0.5 -0.5 +0.5 +0.5] => true", () => {
    expect(boxIntersectsBox(boxReset(-Infinity, -Infinity, Infinity, Infinity), boxReset(-0.5, -0.5, 0.5, 0.5))).toBe(
      true,
    );
  });

  it("[∞ ∞ -∞ -∞] ⋂? [-0.5 -0.5 +0.5 +0.5] => false", () => {
    expect(boxIntersectsBox(boxReset(Infinity, Infinity, -Infinity, -Infinity), boxReset(-0.5, -0.5, 0.5, 0.5))).toBe(
      false,
    );
  });
});
