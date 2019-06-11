import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { mat2dRotate } from "../../mat2dFunctions/mat2dRotate";
import { expectmat2dEqualsApprox } from "../helpers";

describe("mat2dRotate", () => {
  it("[1 0 0 1 0 0] rot π/3 => [1/2 -√3/2 √3/2 1/2 0 0]", () => {
    expectmat2dEqualsApprox(
      mat2dRotate(mat2dIdentity(), Math.PI / 3),
      mat2dReset(0.5, -0.5 * Math.sqrt(3), 0.5 * Math.sqrt(3), 0.5, 0, 0),
    );
  });

  it("[1 0 0 1 10 20] rot π/3 => [1/2 -√3/2 √3/2 1/2 10 20]", () => {
    expectmat2dEqualsApprox(
      mat2dRotate(mat2dReset(1, 0, 0, 1, 10, 20), Math.PI / 3),
      mat2dReset(0.5, -0.5 * Math.sqrt(3), 0.5 * Math.sqrt(3), 0.5, 10, 20),
    );
  });

  it("[1/2 -√3/2 √3/2 1/2 10 20] rot 2π/3 => [-1 0 0 -1 10 20]", () => {
    expectmat2dEqualsApprox(
      mat2dRotate(mat2dReset(0.5, -0.5 * Math.sqrt(3), 0.5 * Math.sqrt(3), 0.5, 10, 20), (2 * Math.PI) / 3),
      mat2dReset(-1, 0, 0, -1, 10, 20),
    );
  });
});
