import { boxReset } from "../boxFunctions/boxReset";
import { mat2dReset } from "../mat2dFunctions/mat2dReset";
import { rayReset } from "../rayFunctions/rayReset";
import { segmentReset } from "../segmentFunctions/segmentReset";
import { Box, Mat2d, IntersectionResult, Vec } from "../types";
import { vecReset } from "../vecFunctions/vecReset";

export const TEST_PRECISION_DIGITS = 10;

export function expectEqualsApprox(actual: number, expected: number) {
  if (isNaN(expected)) {
    expect(actual).toBeNaN();
  } else if (isFinite(expected)) {
    expect(actual).toBeCloseTo(expected, TEST_PRECISION_DIGITS);
  } else {
    expect(actual).toBe(expected);
  }
}

export function expectBoxEqualsApprox(box: Box, expected: Box) {
  expectEqualsApprox(box.minX, expected.minX);
  expectEqualsApprox(box.minY, expected.minY);
  expectEqualsApprox(box.maxX, expected.maxX);
  expectEqualsApprox(box.maxY, expected.maxY);
}

export function expectVecEqualsApprox(actual: Vec, expected: Vec) {
  expectEqualsApprox(actual.x, expected.x);
  expectEqualsApprox(actual.y, expected.y);
}

export function expectIntersectionEqualsApprox(actual: IntersectionResult, expected: IntersectionResult) {
  expect(actual.exists).toBe(expected.exists);
  expectEqualsApprox(actual.x, expected.x);
  expectEqualsApprox(actual.y, expected.y);
  expectEqualsApprox(actual.t0, expected.t0);
  expectEqualsApprox(actual.t1, expected.t1);
}

export function expectIntersectionDNE(intersection: IntersectionResult) {
  expect(intersection).toEqual({
    exists: false,
    x: NaN,
    y: NaN,
    t0: NaN,
    t1: NaN,
  });
}

export function expectMat2dEqualsApprox(actual: Mat2d, expected: Mat2d) {
  expectEqualsApprox(actual.a, expected.a);
  expectEqualsApprox(actual.b, expected.b);
  expectEqualsApprox(actual.c, expected.c);
  expectEqualsApprox(actual.d, expected.d);
  expectEqualsApprox(actual.e, expected.e);
  expectEqualsApprox(actual.f, expected.f);
}

export function expectArrayEqualsApprox(actual: number[], expected: number[]) {
  expect(actual.length).toBe(expected.length);
  for (let i = 0; i < expected.length; i++) {
    expectEqualsApprox(actual[i], expected[i]);
  }
}

export function _mat2dValues(values: number[]) {
  expect(values).toHaveLength(6);
  const [a, b, c, d, e, f] = values;
  return mat2dReset(a, b, c, d, e, f);
}

export function _boxValues(values: number[]) {
  expect(values).toHaveLength(4);
  const [minX, minY, maxX, maxY] = values;
  return boxReset(minX, minY, maxX, maxY);
}

export function _vecValues(values: number[]) {
  expect(values).toHaveLength(2);
  const [x, y] = values;
  return vecReset(x, y);
}

export function _rayValues(values: number[]) {
  expect(values).toHaveLength(4);
  const [x0, y0, dirX, dirY] = values;
  expectEqualsApprox(dirX * dirX + dirY * dirY, 1);
  return rayReset(x0, y0, dirX, dirY);
}

export function _segmentValues(values: number[]) {
  expect(values).toHaveLength(4);
  const [x0, y0, x1, y1] = values;
  return segmentReset(x0, y0, x1, y1);
}
