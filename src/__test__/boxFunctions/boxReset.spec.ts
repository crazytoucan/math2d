import { boxAlloc } from "../../boxFunctions/boxAlloc";
import { boxReset } from "../../boxFunctions/boxReset";

describe("boxReset", () => {
  it("should copy components", () => {
    const res = boxReset(4, 5, 6, 7);
    expect(res.minX).toBe(4);
    expect(res.minY).toBe(5);
    expect(res.maxX).toBe(6);
    expect(res.maxY).toBe(7);
  });

  it("should return `out` if given", () => {
    const out = boxAlloc();
    const res = boxReset(4, 5, 6, 7, out);
    expect(res).toBe(out);
  });
});
