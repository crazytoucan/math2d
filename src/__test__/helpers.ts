import { IVec } from "../types";

export const TEST_PRECISION_DIGITS = 10;

export function expectVecEqualsApprox(vec: IVec, x: number, y: number) {
  expect(vec.x).toBeCloseTo(x, TEST_PRECISION_DIGITS);
  expect(vec.y).toBeCloseTo(y, TEST_PRECISION_DIGITS);
}

export function expectVecNaNs(vec: IVec) {
  expect(vec.x).toBeNaN();
  expect(vec.y).toBeNaN();
}
