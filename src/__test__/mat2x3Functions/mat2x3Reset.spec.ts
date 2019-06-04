import { mat2x3Alloc } from "../../mat2x3Functions/mat2x3Alloc";
import { mat2x3Reset } from "../../mat2x3Functions/mat2x3Reset";

describe("mat2x3Reset", () => {
  it("should copy components", () => {
    const res = mat2x3Reset(3, 4, 5, 6, 7, 8);
    expect(res.a).toBe(3);
    expect(res.b).toBe(4);
    expect(res.c).toBe(5);
    expect(res.d).toBe(6);
    expect(res.e).toBe(7);
    expect(res.f).toBe(8);
  });

  it("should return `out` if given", () => {
    const out = mat2x3Alloc();
    const res = mat2x3Reset(3, 4, 5, 6, 7, 8, out);
    expect(res).toBe(out);
  });
});
