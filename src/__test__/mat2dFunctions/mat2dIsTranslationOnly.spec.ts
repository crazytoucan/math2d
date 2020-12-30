import { mat2dIsTranslationOnly } from "../../mat2dFunctions/mat2dIsTranslationOnly";
import { _mat2dValues } from "../helpers";

describe("mat2dIsTranslationOnly", () => {
  it.each`
    mat                            | result
    ${[1, 0, 0, 1, 0, 0]}          | ${true}
    ${[1, 0, 0, 1, 6, -8]}         | ${true}
    ${[1, 0, 0, -1, 0, 0]}         | ${false}
    ${[0.6, -0.8, 0.8, 0.6, 0, 0]} | ${false}
    ${[2, 0, 0, 2, 0, 0]}          | ${false}
    ${[2, 0, 0, 0.5, 0, 0]}        | ${false}
    ${[1, 0, 1, 0, 0, 0]}          | ${false}
    ${[NaN, NaN, NaN, NaN, 0, 0]}  | ${false}
    ${[1, 0, 0, 1, NaN, NaN]}      | ${true}
  `("$mat => $result", ({ mat, result }) => {
    expect(mat2dIsTranslationOnly(_mat2dValues(mat))).toBe(result);
  });
});
