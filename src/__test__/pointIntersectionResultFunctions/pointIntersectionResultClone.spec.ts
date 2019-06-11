import { pointIntersectionResultAlloc } from "../../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { pointIntersectionResultClone } from "../../pointIntersectionResultFunctions/pointIntersectionResultClone";
import { pointIntersectionResultReset } from "../../pointIntersectionResultFunctions/pointIntersectionResultReset";
import { expectIntersectionEqualsApprox } from "../helpers";

describe("pointIntersectionResultClone", () => {
  it("should copy components", () => {
    expectIntersectionEqualsApprox(
      pointIntersectionResultClone(pointIntersectionResultReset(true, 4, 5, 6, 7)),
      pointIntersectionResultReset(true, 4, 5, 6, 7),
    );
  });

  it("should return a new intersection if no `out`", () => {
    const intersection = pointIntersectionResultReset(true, 4, 5, 6, 7);
    const res = pointIntersectionResultClone(intersection);
    expect(res).not.toBe(intersection);
  });

  it("should return `out` if given", () => {
    const out = pointIntersectionResultAlloc();
    const res = pointIntersectionResultClone(pointIntersectionResultReset(true, 4, 5, 6, 7), out);
    expect(res).toBe(out);
  });
});
