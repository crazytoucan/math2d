import { mat2dIdentity } from "../../mat2dFunctions/mat2dIdentity";
import { mat2dIsTranslationOnly } from "../../mat2dFunctions/mat2dIsTranslationOnly";
import { mat2dReset } from "../../mat2dFunctions/mat2dReset";

describe("mat2dIsTranslationOnly", () => {
  it("[1 0 0 1 0 0] => true", () => {
    expect(mat2dIsTranslationOnly(mat2dIdentity())).toBe(true);
  });

  it("[1 0 0 1 6 -8] => true", () => {
    expect(mat2dIsTranslationOnly(mat2dReset(1, 0, 0, 1, 6, -8))).toBe(true);
  });

  it("[1 0 0 -1 0 0] => false", () => {
    expect(mat2dIsTranslationOnly(mat2dReset(1, 0, 0, -1, 0, 0))).toBe(false);
  });

  it("[0.6 -0.8 0.8 0.6 0 0] => false", () => {
    expect(mat2dIsTranslationOnly(mat2dReset(0.6, -0.8, 0.8, 0.6, 0, 0))).toBe(false);
  });

  it("[2 0 0 2 0 0] => false", () => {
    expect(mat2dIsTranslationOnly(mat2dReset(2, 0, 0, 2, 0, 0))).toBe(false);
  });

  it("[2 0 0 0.5 0 0] => false", () => {
    expect(mat2dIsTranslationOnly(mat2dReset(2, 0, 0, 0.5, 0, 0))).toBe(false);
  });

  it("[1 0 1 0 0 0] => false", () => {
    expect(mat2dIsTranslationOnly(mat2dReset(1, 0, 1, 0, 0, 0))).toBe(false);
  });

  it("[NaN NaN NaN NaN 0 0] => false", () => {
    expect(mat2dIsTranslationOnly(mat2dReset(NaN, NaN, NaN, NaN, 0, 0))).toBe(false);
  });

  it("[1 0 0 1 NaN NaN] => true", () => {
    expect(mat2dIsTranslationOnly(mat2dReset(1, 0, 0, 1, NaN, NaN))).toBe(true);
  });
});
