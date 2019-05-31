import { IVec, IBox } from "../types";

export const TEST_PRECISION_DIGITS = 10;

export function expectBoxEqualsApprox(box: IBox, minX: number, minY: number, maxX: number, maxY: number) {
  expect(box.minX).toBeCloseTo(minX, TEST_PRECISION_DIGITS);
  expect(box.minY).toBeCloseTo(minY, TEST_PRECISION_DIGITS);
  expect(box.maxX).toBeCloseTo(maxX, TEST_PRECISION_DIGITS);
  expect(box.maxY).toBeCloseTo(maxY, TEST_PRECISION_DIGITS);
}

export function expectVecEqualsApprox(vec: IVec, x: number, y: number) {
  expect(vec.x).toBeCloseTo(x, TEST_PRECISION_DIGITS);
  expect(vec.y).toBeCloseTo(y, TEST_PRECISION_DIGITS);
}

export function expectVecNaNs(vec: IVec) {
  expect(vec.x).toBeNaN();
  expect(vec.y).toBeNaN();
}
