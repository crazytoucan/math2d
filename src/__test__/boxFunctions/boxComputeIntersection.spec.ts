import { boxComputeIntersection } from "../../boxFunctions/boxComputeIntersection";
import { boxReset } from "../../boxFunctions/boxReset";
import { expectBoxEqualsApprox } from "../helpers";

describe("boxComputeIntersection", () => {
  it("[-1 -1 +1 +1] ⋂ [-1 -1 +1 +1] => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxComputeIntersection(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 1)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1] ⋂ [-1 -1 +1 +2] => [-1 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxComputeIntersection(boxReset(-1, -1, 1, 1), boxReset(-1, -1, 1, 2)), -1, -1, 1, 1);
  });

  it("[-1 -1 +1 +1] ⋂ [0 0 0 0] => [0 0 0 0]", () => {
    expectBoxEqualsApprox(boxComputeIntersection(boxReset(-1, -1, 1, 1), boxReset(0, 0, 0, 0)), 0, 0, 0, 0);
  });

  it("[-1 -1 +1 +1] ⋂ [-0.5 -0.5 +0.5 +0.5] => true", () => {
    expectBoxEqualsApprox(
      boxComputeIntersection(boxReset(-1, -1, 1, 1), boxReset(-0.5, -0.5, 0.5, 0.5)),
      -0.5,
      -0.5,
      0.5,
      0.5,
    );
  });

  it("[-1 -1 +1 +1] ⋂ [+3 -1 +5 +1] => [+3 -1 +1 +1]", () => {
    expectBoxEqualsApprox(boxComputeIntersection(boxReset(-1, -1, 1, 1), boxReset(3, -1, 5, 1)), 3, -1, 1, 1);
  });

  it("[-∞ -∞ +∞ +∞] ⋂ [-0.5 -0.5 +0.5 +0.5] => [-0.5 -0.5 +0.5 +0.5]", () => {
    expectBoxEqualsApprox(
      boxComputeIntersection(boxReset(-Infinity, -Infinity, Infinity, Infinity), boxReset(-0.5, -0.5, 0.5, 0.5)),
      -0.5,
      -0.5,
      0.5,
      0.5,
    );
  });

  it("[+∞ +∞ -∞ -∞] ⋂ [-0.5 -0.5 +0.5 +0.5] => [+∞ +∞ -∞ -∞]", () => {
    expectBoxEqualsApprox(
      boxComputeIntersection(boxReset(Infinity, Infinity, -Infinity, -Infinity), boxReset(-0.5, -0.5, 0.5, 0.5)),
      Infinity,
      Infinity,
      -Infinity,
      -Infinity,
    );
  });
});
