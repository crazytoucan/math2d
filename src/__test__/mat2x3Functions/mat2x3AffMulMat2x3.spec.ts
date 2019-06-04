import { mat2x3AffMulMat2x3 } from '../../mat2x3Functions/mat2x3AffMulMat2x3';
import { mat2x3Reset } from "../../mat2x3Functions/mat2x3Reset";
import { expectMat2x3EqualsApprox } from "../helpers";

describe("mat2x3AffMulMat2x3", () => {
  it("[1 0 0 1 0 0][1 0 0 1 0 0] => [1 0 0 1 0 0]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffMulMat2x3(mat2x3Reset(1, 0, 0, 1, 0, 0), mat2x3Reset(1, 0, 0, 1, 0, 0)),
      mat2x3Reset(1, 0, 0, 1, 0, 0),
    );
  });

  it("[3 4 5 6 7 8][1 0 0 1 0 0] => [3 4 5 6 7 8]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffMulMat2x3(mat2x3Reset(3, 4, 5, 6, 7, 8), mat2x3Reset(1, 0, 0, 1, 0, 0)),
      mat2x3Reset(3, 4, 5, 6, 7, 8),
    );
  });

  it("[+1 -1 +1 +1 0 0][+1 +1 -1 +1 0 0] => [2 0 0 2 0 0]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffMulMat2x3(mat2x3Reset(1, -1, 1, 1, 0, 0), mat2x3Reset(1, 1, -1, 1, 0, 0)),
      mat2x3Reset(2, 0, 0, 2, 0, 0),
    );
  });

  it("[3 4 5 6 7 8][1 -2 3 -4 5 -6] => [-7 -8 -11 -12 -8 -2]", () => {
    expectMat2x3EqualsApprox(
      mat2x3AffMulMat2x3(mat2x3Reset(3, 4, 5, 6, 7, 8), mat2x3Reset(1, -2, 3, -4, 5, -6)),
      mat2x3Reset(-7, -8, -11, -12, -8, -2),
    );
  });
});
