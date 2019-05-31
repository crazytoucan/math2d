import { vecGetManhattanLength, vecReset } from "../../functions/vecFunctions";

describe("vecGetManhattanLength", () => {
  it("(0,0) => 0", () => {
    expect(vecGetManhattanLength(vecReset(0, 0))).toBe(0);
  });

  it("(0,-4) => 4", () => {
    expect(vecGetManhattanLength(vecReset(0, -4))).toBe(4);
  });

  it("(-12,16) => 28", () => {
    expect(vecGetManhattanLength(vecReset(-12, 16))).toBe(28);
  });
});
