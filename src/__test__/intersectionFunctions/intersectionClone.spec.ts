import { intersectionAlloc, intersectionClone, intersectionReset } from "../../functions/intersectionFunctions";
import { expectIntersectionExistsApprox } from "../helpers";

describe("intersectionClone", () => {
  it("should copy components", () => {
    expectIntersectionExistsApprox(intersectionClone(intersectionReset(true, 4, 5, 6, 7)), 4, 5, 6, 7);
  });

  it("should return a new intersection if no `out`", () => {
    let intersection = intersectionReset(true, 4, 5, 6, 7);
    let res = intersectionClone(intersection);
    expect(res).not.toBe(intersection);
  });

  it("should return `out` if given", () => {
    let out = intersectionAlloc();
    let res = intersectionClone(intersectionReset(true, 4, 5, 6, 7), out);
    expect(res).toBe(out);
  });
});
