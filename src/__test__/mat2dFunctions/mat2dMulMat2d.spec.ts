import { mat2dMulMat2d } from '../../mat2dFunctions/mat2dMulMat2d';
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { expectmat2dEqualsApprox } from "../helpers";

describe("mat2dMulMat2d", () => {
  it("[1 0 0 1 0 0][1 0 0 1 0 0] => [1 0 0 1 0 0]", () => {
    expectmat2dEqualsApprox(
      mat2dMulMat2d(mat2dReset(1, 0, 0, 1, 0, 0), mat2dReset(1, 0, 0, 1, 0, 0)),
      mat2dReset(1, 0, 0, 1, 0, 0),
    );
  });

  it("[3 4 5 6 7 8][1 0 0 1 0 0] => [3 4 5 6 7 8]", () => {
    expectmat2dEqualsApprox(
      mat2dMulMat2d(mat2dReset(3, 4, 5, 6, 7, 8), mat2dReset(1, 0, 0, 1, 0, 0)),
      mat2dReset(3, 4, 5, 6, 7, 8),
    );
  });

  it("[+1 -1 +1 +1 0 0][+1 +1 -1 +1 0 0] => [2 0 0 2 0 0]", () => {
    expectmat2dEqualsApprox(
      mat2dMulMat2d(mat2dReset(1, -1, 1, 1, 0, 0), mat2dReset(1, 1, -1, 1, 0, 0)),
      mat2dReset(2, 0, 0, 2, 0, 0),
    );
  });

  it("[3 4 5 6 7 8][1 -2 3 -4 5 -6] => [-7 -8 -11 -12 -8 -2]", () => {
    expectmat2dEqualsApprox(
      mat2dMulMat2d(mat2dReset(3, 4, 5, 6, 7, 8), mat2dReset(1, -2, 3, -4, 5, -6)),
      mat2dReset(-7, -8, -11, -12, -8, -2),
    );
  });
});
