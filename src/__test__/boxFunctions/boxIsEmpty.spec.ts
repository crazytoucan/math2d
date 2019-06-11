import { boxIsEmpty } from "../../boxFunctions/boxIsEmpty";
import { boxReset } from "../../boxFunctions/boxReset";

describe("boxIsEmpty", () => {
  it("[-1 -1 +1 +1] => false", () => {
    expect(boxIsEmpty(boxReset(-1, -1, 1, 1))).toBe(false);
  });

  it("[+3 -1 +5 +1] => false", () => {
    expect(boxIsEmpty(boxReset(3, -1, 5, 1))).toBe(false);
  });

  it("[0 0 0 0] => true", () => {
    expect(boxIsEmpty(boxReset(0, 0, 0, 0))).toBe(true);
  });

  it("[-∞ -∞ +∞ +∞] => false", () => {
    expect(boxIsEmpty(boxReset(-Infinity, -Infinity, Infinity, Infinity))).toBe(false);
  });

  it("[+∞ +∞ -∞ -∞] => true", () => {
    expect(boxIsEmpty(boxReset(Infinity, Infinity, -Infinity, -Infinity))).toBe(true);
  });

  it("[0 0 -1 -1] => true", () => {
    expect(boxIsEmpty(boxReset(0, 0, -1, -1))).toBe(true);
  });

  it("[Infinity Infinity 0 0] => true", () => {
    expect(boxIsEmpty(boxReset(Infinity, Infinity, 0, 0))).toBe(true);
  });

  it("[NaN NaN NaN NaN] => true", () => {
    expect(boxIsEmpty(boxReset(NaN, NaN, NaN, NaN))).toBe(true);
  });
});
