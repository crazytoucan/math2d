import { intersectionAlloc } from "../../functions/intersectionFunctions";
import { expectIntersectionDNE } from "../helpers";

describe("intersectionAlloc", () => {
  it("returns (false, NaN, NaN, NaN, NaN)", () => {
    expectIntersectionDNE(intersectionAlloc());
  });
});
