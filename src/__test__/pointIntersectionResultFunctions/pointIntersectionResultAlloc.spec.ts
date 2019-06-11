import { pointIntersectionResultAlloc } from "../../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { expectIntersectionDNE } from "../helpers";

describe("pointIntersectionResultAlloc", () => {
  it("returns (false, NaN, NaN, NaN, NaN)", () => {
    expectIntersectionDNE(pointIntersectionResultAlloc());
  });
});
