import { mat2x3AffIdentity } from "../../mat2x3Functions/mat2x3AffIdentity";
import { mat2x3AffIsTranslationOnly } from "../../mat2x3Functions/mat2x3AffIsTranslationOnly";
import { mat2x3Reset } from "../../mat2x3Functions/mat2x3Reset";

describe("mat2x3AffIsTranslationOnly", () => {
  it("[1 0 0 1 0 0] => true", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3AffIdentity())).toBe(true);
  });

  it("[1 0 0 1 6 -8] => true", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3Reset(1, 0, 0, 1, 6, -8))).toBe(true);
  });

  it("[1 0 0 -1 0 0] => false", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3Reset(1, 0, 0, -1, 0, 0))).toBe(false);
  });

  it("[0.6 -0.8 0.8 0.6 0 0] => false", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3Reset(0.6, -0.8, 0.8, 0.6, 0, 0))).toBe(false);
  });

  it("[2 0 0 2 0 0] => false", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3Reset(2, 0, 0, 2, 0, 0))).toBe(false);
  });

  it("[2 0 0 0.5 0 0] => false", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3Reset(2, 0, 0, 0.5, 0, 0))).toBe(false);
  });

  it("[1 0 1 0 0 0] => false", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3Reset(1, 0, 1, 0, 0, 0))).toBe(false);
  });

  it("[NaN NaN NaN NaN 0 0] => false", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3Reset(NaN, NaN, NaN, NaN, 0, 0))).toBe(false);
  });

  it("[1 0 0 1 NaN NaN] => true", () => {
    expect(mat2x3AffIsTranslationOnly(mat2x3Reset(1, 0, 0, 1, NaN, NaN))).toBe(true);
  });
});
