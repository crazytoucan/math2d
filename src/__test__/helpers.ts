import { IBox, IVec } from "../types";

export const TEST_PRECISION_DIGITS = 10;

function expectEqualsApprox(actual: number, expected: number) {
  if (isNaN(expected)) {
    expect(actual).toBeNaN();
  } else if (isFinite(expected)) {
    expect(actual).toBeCloseTo(expected, TEST_PRECISION_DIGITS);
  } else {
    expect(actual).toBe(expected);
  }
}

export function expectBoxEqualsApprox(box: IBox, minX: number, minY: number, maxX: number, maxY: number) {
  expectEqualsApprox(box.minX, minX);
  expectEqualsApprox(box.minY, minY);
  expectEqualsApprox(box.maxX, maxX);
  expectEqualsApprox(box.maxY, maxY);
}

export function expectVecEqualsApprox(vec: IVec, x: number, y: number) {
  expectEqualsApprox(vec.x, x);
  expectEqualsApprox(vec.y, y);
}
