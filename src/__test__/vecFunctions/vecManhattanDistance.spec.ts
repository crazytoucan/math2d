import { vecManhattanDistance } from "../../vecFunctions/vecManhattanDistance";
import { vecReset } from "../../vecFunctions/vecReset";

describe("vecManhattanDistance", () => {
  it("(4,6), (4,6) => 0", () => {
    expect(vecManhattanDistance(vecReset(4, 6), vecReset(4, 6))).toBe(0);
  });

  it("(0,-4), (0,6) => 10", () => {
    expect(vecManhattanDistance(vecReset(0, -4), vecReset(0, 6))).toBe(10);
  });

  it("(-4,6), (6,20) => 24", () => {
    expect(vecManhattanDistance(vecReset(-4, 6), vecReset(6, 20))).toBe(24);
  });
});
