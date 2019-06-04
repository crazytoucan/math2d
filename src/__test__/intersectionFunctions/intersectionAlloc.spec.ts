import { intersectionAlloc } from "../../intersectionFunctions/intersectionAlloc";
import { expectIntersectionDNE } from "../helpers";

describe("intersectionAlloc", () => {
  it("returns (false, NaN, NaN, NaN, NaN)", () => {
    expectIntersectionDNE(intersectionAlloc());
  });
});
