import { pointIntersectionResultAlloc } from "../../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { pointIntersectionResultReset } from "../../pointIntersectionResultFunctions/pointIntersectionResultReset";

describe("pointIntersectionResultReset", () => {
  it("copies components", () => {
    const res = pointIntersectionResultReset(true, 4, 5, 6, 7);
    expect(res.exists).toBe(true);
    expect(res.x).toBe(4);
    expect(res.y).toBe(5);
    expect(res.t0).toBe(6);
    expect(res.t1).toBe(7);
  });

  it("returns `out` if given", () => {
    const out = pointIntersectionResultAlloc();
    expect(pointIntersectionResultReset(true, 4, 5, 6, 7, out)).toBe(out);
  });
});
