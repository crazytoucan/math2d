import { intersectionResultAlloc } from "../../intersectionResultFunctions/intersectionResultAlloc";
import { expectIntersectionDNE } from "../helpers";

describe("intersectionResultAlloc", () => {
  it("returns (false, NaN, NaN, NaN, NaN)", () => {
    expectIntersectionDNE(intersectionResultAlloc());
  });
});
