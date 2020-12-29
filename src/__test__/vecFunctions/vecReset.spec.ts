import { vecAlloc } from "../../vecFunctions/vecAlloc";
import { vecReset } from "../../vecFunctions/vecReset";

describe("vecReset", () => {
  it("copies components", () => {
    expect(vecReset(4, 5)).toEqual({
      x: 4,
      y: 5,
    });
  });

  it("returns `out` if given", () => {
    const out = vecAlloc();
    expect(vecReset(4, 5, out)).toBe(out);
  });
});
