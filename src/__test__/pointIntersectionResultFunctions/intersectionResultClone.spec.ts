import { intersectionResultAlloc } from "../../intersectionResultFunctions/intersectionResultAlloc";
import { intersectionResultClone } from "../../intersectionResultFunctions/intersectionResultClone";
import { intersectionResultReset } from "../../intersectionResultFunctions/intersectionResultReset";
import { expectIntersectionEqualsApprox } from "../helpers";

describe("intersectionResultClone", () => {
  it("copies components", () => {
    expectIntersectionEqualsApprox(
      intersectionResultClone(intersectionResultReset(true, 4, 5, 6, 7)),
      intersectionResultReset(true, 4, 5, 6, 7),
    );
  });

  it("returns a new intersection if no `out`", () => {
    const intersection = intersectionResultReset(true, 4, 5, 6, 7);
    expect(intersectionResultClone(intersection)).not.toBe(intersection);
  });

  it("returns `out` if given", () => {
    const out = intersectionResultAlloc();
    expect(intersectionResultClone(intersectionResultReset(true, 4, 5, 6, 7), out)).toBe(out);
  });
});
