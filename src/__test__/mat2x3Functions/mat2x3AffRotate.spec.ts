import { mat2x3AffIdentity, mat2x3AffRotate, mat2x3Reset } from "../../functions/mat2x3Functions";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3AffRotate", () => {
  it("[1 0 0 1 0 0] rot π/3 => [1/2 -√3/2 √3/2 1/2 0 0]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffRotate(mat2x3AffIdentity(), Math.PI / 3),
      mat2x3Reset(0.5, -0.5 * Math.sqrt(3), 0.5 * Math.sqrt(3), 0.5, 0, 0),
    );
  });

  it("[1 0 0 1 10 20] rot π/3 => [1/2 -√3/2 √3/2 1/2 10 20]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffRotate(mat2x3Reset(1, 0, 0, 1, 10, 20), Math.PI / 3),
      mat2x3Reset(0.5, -0.5 * Math.sqrt(3), 0.5 * Math.sqrt(3), 0.5, 10, 20),
    );
  });

  it("[1/2 -√3/2 √3/2 1/2 10 20] rot 2π/3 => [-1 0 0 -1 10 20]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffRotate(mat2x3Reset(0.5, -0.5 * Math.sqrt(3), 0.5 * Math.sqrt(3), 0.5, 10, 20), (2 * Math.PI) / 3),
      mat2x3Reset(-1, 0, 0, -1, 10, 20),
    );
  });
});
