import { IBox, IIntersection, IMat2x3, IVec } from "../types";

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

export function expectIntersectionEqualsApprox(actual: IIntersection, expected: IIntersection) {
  expect(actual.exists).toBe(expected.exists);
  expectEqualsApprox(actual.x, expected.x);
  expectEqualsApprox(actual.y, expected.y);
  expectEqualsApprox(actual.t0, expected.t0);
  expectEqualsApprox(actual.t1, expected.t1);
}

export function expectIntersectionDNE(intersection: IIntersection) {
  expect(intersection.exists).toBe(false);
  expect(intersection.x).toBeNaN();
  expect(intersection.y).toBeNaN();
  expect(intersection.t0).toBeNaN();
  expect(intersection.t1).toBeNaN();
}

export function expectMat2x3EqualsApprox(actual: IMat2x3, expected: IMat2x3) {
  expectEqualsApprox(actual.a, expected.a);
  expectEqualsApprox(actual.b, expected.b);
  expectEqualsApprox(actual.c, expected.c);
  expectEqualsApprox(actual.d, expected.d);
  expectEqualsApprox(actual.e, expected.e);
  expectEqualsApprox(actual.f, expected.f);
}
