import { vecGetLength } from "../../vecFunctions/vecGetLength";
import { vecReset } from "../../vecFunctions/vecReset";

describe("vecGetLength", () => {
  it("(0,0) => 0", () => {
    expect(vecGetLength(vecReset(0, 0))).toBe(0);
  });

  it("(0,-4) => 4", () => {
    expect(vecGetLength(vecReset(0, -4))).toBe(4);
  });

  it("(12,16) => 20", () => {
    expect(vecGetLength(vecReset(12, 16))).toBe(20);
  });
});
