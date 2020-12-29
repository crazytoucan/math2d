import { pointIntersectionResultAlloc } from "../../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { pointIntersectionResultClone } from "../../pointIntersectionResultFunctions/pointIntersectionResultClone";
import { pointIntersectionResultReset } from "../../pointIntersectionResultFunctions/pointIntersectionResultReset";
import { expectIntersectionEqualsApprox } from "../helpers";

describe("pointIntersectionResultClone", () => {
  it("copies components", () => {
    expectIntersectionEqualsApprox(
      pointIntersectionResultClone(pointIntersectionResultReset(true, 4, 5, 6, 7)),
      pointIntersectionResultReset(true, 4, 5, 6, 7),
    );
  });

  it("returns a new intersection if no `out`", () => {
    const intersection = pointIntersectionResultReset(true, 4, 5, 6, 7);
    expect(pointIntersectionResultClone(intersection)).not.toBe(intersection);
  });

  it("returns `out` if given", () => {
    const out = pointIntersectionResultAlloc();
    expect(pointIntersectionResultClone(pointIntersectionResultReset(true, 4, 5, 6, 7), out)).toBe(out);
  });
});
