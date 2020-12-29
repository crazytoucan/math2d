import { mat2dIsOrthogonal } from "../../mat2dFunctions/mat2dIsOrthogonal";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";
import { IMat2dValuesArray } from "../testTypes";

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
    expect(mat2dIsOrthogonal(mat2dReset(...(mat as IMat2dValuesArray)))).toBe(result);
  });
});
