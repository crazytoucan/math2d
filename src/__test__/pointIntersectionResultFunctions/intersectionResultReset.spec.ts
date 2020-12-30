import { intersectionResultAlloc } from "../../intersectionResultFunctions/intersectionResultAlloc";
import { intersectionResultReset } from "../../intersectionResultFunctions/intersectionResultReset";

describe("intersectionResultReset", () => {
  it("copies components", () => {
    const res = intersectionResultReset(true, 4, 5, 6, 7);
    expect(res.exists).toBe(true);
    expect(res.x).toBe(4);
    expect(res.y).toBe(5);
    expect(res.t0).toBe(6);
    expect(res.t1).toBe(7);
  });

  it("returns `out` if given", () => {
    const out = intersectionResultAlloc();
    expect(intersectionResultReset(true, 4, 5, 6, 7, out)).toBe(out);
  });
});
