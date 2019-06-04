import { vecDistanceSq } from "../../vecFunctions/vecDistanceSq";
import { vecReset } from "../../vecFunctions/vecReset";

describe("vecDistanceSq", () => {
  it("(2,4), (2,4) => 0", () => {
    expect(vecDistanceSq(vecReset(2, 4), vecReset(2, 4))).toBe(0);
  });

  it("(0,4), (0,-5) => 81", () => {
    expect(vecDistanceSq(vecReset(0, 4), vecReset(0, -5))).toBe(81);
  });

  it("(10,10), (16,18) => 100", () => {
    expect(vecDistanceSq(vecReset(10, 10), vecReset(16, 18))).toBe(100);
  });
});
