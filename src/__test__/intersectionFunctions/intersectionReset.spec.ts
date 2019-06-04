import { intersectionAlloc } from "../../intersectionFunctions/intersectionAlloc";
import { intersectionReset } from "../../intersectionFunctions/intersectionReset";

describe("intersectionReset", () => {
  it("should copy components", () => {
    const res = intersectionReset(true, 4, 5, 6, 7);
    expect(res.exists).toBe(true);
    expect(res.x).toBe(4);
    expect(res.y).toBe(5);
    expect(res.t0).toBe(6);
    expect(res.t1).toBe(7);
  });

  it("should return `out` if given", () => {
    const out = intersectionAlloc();
    const res = intersectionReset(true, 4, 5, 6, 7, out);
    expect(res).toBe(out);
  });
});
