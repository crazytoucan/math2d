import { vecDistance } from "../../vecFunctions/vecDistance";
import { vecReset } from "../../vecFunctions/vecReset";

describe("vecDistance", () => {
  it("(2,4), (2,4) => 0", () => {
    expect(vecDistance(vecReset(2, 4), vecReset(2, 4))).toBe(0);
  });

  it("(0,4), (0,-5) => 9", () => {
    expect(vecDistance(vecReset(0, 4), vecReset(0, -5))).toBe(9);
  });

  it("(10,10), (16,18) => 10", () => {
    expect(vecDistance(vecReset(10, 10), vecReset(16, 18))).toBe(10);
  });
});
