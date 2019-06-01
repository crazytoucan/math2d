import { intersectionAlloc, intersectionClone, intersectionReset } from "../../functions/intersectionFunctions";
import { expectIntersectionEqualsApprox } from "../helpers";

describe("intersectionClone", () => {
  it("should copy components", () => {
    expectIntersectionEqualsApprox(
      intersectionClone(intersectionReset(true, 4, 5, 6, 7)),
      intersectionReset(true, 4, 5, 6, 7),
    );
  });

  it("should return a new intersection if no `out`", () => {
    const intersection = intersectionReset(true, 4, 5, 6, 7);
    const res = intersectionClone(intersection);
    expect(res).not.toBe(intersection);
  });

  it("should return `out` if given", () => {
    const out = intersectionAlloc();
    const res = intersectionClone(intersectionReset(true, 4, 5, 6, 7), out);
    expect(res).toBe(out);
  });
});
