import { mat2dIsOrthogonal } from "../../mat2dFunctions/mat2dIsOrthogonal";
import { _mat2d } from "../helpers";

describe("mat2dIsOrthogonal", () => {
  it.each`
    mat                            | result
    ${[1, 0, 0, 1, 0, 0]}          | ${true}
    ${[1, 0, 0, 1, 6, -8]}         | ${true}
    ${[1, 0, 0, -1, 0, 0]}         | ${true}
    ${[0.6, -0.8, 0.8, 0.6, 0, 0]} | ${true}
    ${[2, 0, 0, 2, 0, 0]}          | ${false}
    ${[2, 0, 0, 0.5, 0, 0]}        | ${false}
    ${[1, 0, 1, 0, 0, 0]}          | ${false}
    ${[NaN, NaN, NaN, NaN, 0, 0]}  | ${false}
  `("$mat => $result", ({ mat, result }) => {
    expect(mat2dIsOrthogonal(_mat2d(mat))).toBe(result);
  });
});
