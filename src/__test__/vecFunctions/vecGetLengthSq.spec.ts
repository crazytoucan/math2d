import { vecGetLengthSq, vecReset } from "../../functions/vecFunctions";

describe("vecGetLengthSq", () => {
  it("(0,0) => 0", () => {
    expect(vecGetLengthSq(vecReset(0, 0))).toBe(0);
  });

  it("(0,-4) => 16", () => {
    expect(vecGetLengthSq(vecReset(0, -4))).toBe(16);
  });

  it("(12,16) => 400", () => {
    expect(vecGetLengthSq(vecReset(12, 16))).toBe(400);
  });
});
