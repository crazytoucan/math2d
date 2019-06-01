import { intersectionReset, intersectionAlloc } from "../../functions/intersectionFunctions";
import { expectIntersectionExistsApprox } from "../helpers";

describe("intersectionReset", () => {
  it("should copy components", () => {
    let res = intersectionReset(true, 4, 5, 6, 7);
    expectIntersectionExistsApprox(res, 4, 5, 6, 7);
  });

  it("should return `out` if given", () => {
    let out = intersectionAlloc();
    let res = intersectionReset(true, 4, 5, 6, 7, out);
    expect(res).toBe(out);
  });
});
