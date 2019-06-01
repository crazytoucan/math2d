import { IBox, IVec, IIntersection } from "../types";

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

export function expectIntersectionExistsApprox(intersection: IIntersection, x: number, y: number, t0: number, t1: number) {
  expect(intersection.exists).toBe(true);
  expectEqualsApprox(intersection.x, x);
  expectEqualsApprox(intersection.y, y);
  expectEqualsApprox(intersection.t0, t0);
  expectEqualsApprox(intersection.t1, t1);
}

export function expectIntersectionDNE(intersection: IIntersection) {
  expect(intersection.exists).toBe(false);
  expect(intersection.x).toBeNaN();
  expect(intersection.y).toBeNaN();
  expect(intersection.t0).toBeNaN();
  expect(intersection.t1).toBeNaN();
}
