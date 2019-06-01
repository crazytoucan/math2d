import { boxReset, boxAlloc } from "../../functions/boxFunctions";

describe("boxReset", () => {
  it("should copy components", () => {
    let res = boxReset(4, 5, 6, 7);
    expect(res.minX).toBe(4);
    expect(res.minY).toBe(5);
    expect(res.maxX).toBe(6);
    expect(res.maxY).toBe(7);
  });

  it("should return `out` if given", () => {
    let out = boxAlloc();
    let res = boxReset(4, 5, 6, 7, out);
    expect(res).toBe(out);
  });
});
