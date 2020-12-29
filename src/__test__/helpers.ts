import { mat2dReset } from "../mat2dFunctions/mat2dReset";
import { IBox, IMat2d, IPointIntersectionResult, IVec } from "../types";

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

export function expectVecEqualsApprox(actual: IVec, expected: IVec) {
  expectEqualsApprox(actual.x, expected.x);
  expectEqualsApprox(actual.y, expected.y);
}

export function expectIntersectionEqualsApprox(actual: IPointIntersectionResult, expected: IPointIntersectionResult) {
  expect(actual.exists).toBe(expected.exists);
  expectEqualsApprox(actual.x, expected.x);
  expectEqualsApprox(actual.y, expected.y);
  expectEqualsApprox(actual.t0, expected.t0);
  expectEqualsApprox(actual.t1, expected.t1);
}

export function expectIntersectionDNE(intersection: IPointIntersectionResult) {
  expect(intersection.exists).toBe(false);
  expect(intersection.x).toBeNaN();
  expect(intersection.y).toBeNaN();
  expect(intersection.t0).toBeNaN();
  expect(intersection.t1).toBeNaN();
}

export function expectmat2dEqualsApprox(actual: IMat2d, expected: IMat2d) {
  expectEqualsApprox(actual.a, expected.a);
  expectEqualsApprox(actual.b, expected.b);
  expectEqualsApprox(actual.c, expected.c);
  expectEqualsApprox(actual.d, expected.d);
  expectEqualsApprox(actual.e, expected.e);
  expectEqualsApprox(actual.f, expected.f);
}

export function _mat2d(values: number[]) {
  expect(values).toHaveLength(6);
  return mat2dReset(...(values as [number, number, number, number, number, number]));
}
