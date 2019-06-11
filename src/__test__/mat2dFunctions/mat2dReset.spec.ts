import { mat2dAlloc } from "../../mat2dFunctions/mat2dAlloc";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";

describe("mat2dReset", () => {
  it("should copy components", () => {
    const res = mat2dReset(3, 4, 5, 6, 7, 8);
    expect(res.a).toBe(3);
    expect(res.b).toBe(4);
    expect(res.c).toBe(5);
    expect(res.d).toBe(6);
    expect(res.e).toBe(7);
    expect(res.f).toBe(8);
  });

  it("should return `out` if given", () => {
    const out = mat2dAlloc();
    const res = mat2dReset(3, 4, 5, 6, 7, 8, out);
    expect(res).toBe(out);
  });
});
