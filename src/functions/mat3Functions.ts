import { IMat3 } from "../types";
import { EPSILON } from "../internal/parameters";

class Mat3 implements IMat3 {
  constructor(
    public m11 = NaN,
    public m12 = NaN,
    public m13 = NaN,
    public m21 = NaN,
    public m22 = NaN,
    public m23 = NaN,
    public m31 = NaN,
    public m32 = NaN,
    public m33 = NaN,
  ) {}
}

export function mat3Alloc(): IMat3 {
  return new Mat3();
}

export function mat3Clone(mat: IMat3, out = mat3Alloc()) {
  return mat3Reset(mat.m11, mat.m12, mat.m13, mat.m21, mat.m22, mat.m23, mat.m31, mat.m32, mat.m33, out);
}

export function mat3Determinant(mat: IMat3) {
  return (
    mat.m11 * mat.m22 * mat.m33 +
    mat.m21 * mat.m32 * mat.m13 +
    mat.m31 * mat.m12 * mat.m23 -
    mat.m11 * mat.m32 * mat.m23 -
    mat.m21 * mat.m12 * mat.m33 -
    mat.m31 * mat.m22 * mat.m13
  );
}

export function mat3Invert(mat: IMat3, out = mat3Alloc()) {
  const t11 = mat.m33 * mat.m22 - mat.m32 * mat.m23;
  const t12 = mat.m32 * mat.m13 - mat.m33 * mat.m12;
  const t13 = mat.m23 * mat.m12 - mat.m22 * mat.m13;
  const det = mat.m11 * t11 + mat.m21 * t12 + mat.m31 * t13;

  if (det < EPSILON) {
    return mat3Reset(NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, out);
  } else {
    const detInverse = 1 / det;
    return mat3Reset(
      t11 * detInverse,
      (mat.m31 * mat.m23 - mat.m33 * mat.m21) * detInverse,
      (mat.m32 * mat.m21 - mat.m31 * mat.m22) * detInverse,
      t12 * detInverse,
      (mat.m33 * mat.m11 - mat.m31 * mat.m13) * detInverse,
      (mat.m31 * mat.m12 - mat.m32 * mat.m11) * detInverse,
      t13 * detInverse,
      (mat.m21 * mat.m13 - mat.m23 * mat.m11) * detInverse,
      (mat.m22 * mat.m11 - mat.m21 * mat.m12) * detInverse,
      out,
    );
  }
}

export function mat3MulMat3(a: IMat3, b: IMat3, out = mat3Alloc()) {
  return mat3Reset(
    a.m11 * b.m11 + a.m21 * b.m12 + a.m31 * b.m13,
    a.m12 * b.m11 + a.m22 * b.m12 + a.m32 * b.m13,
    a.m13 * b.m11 + a.m23 * b.m12 + a.m33 * b.m13,
    a.m11 * b.m21 + a.m21 * b.m22 + a.m31 * b.m23,
    a.m12 * b.m21 + a.m22 * b.m22 + a.m32 * b.m23,
    a.m13 * b.m21 + a.m23 * b.m22 + a.m33 * b.m23,
    a.m11 * b.m31 + a.m21 * b.m32 + a.m31 * b.m33,
    a.m12 * b.m31 + a.m22 * b.m32 + a.m32 * b.m33,
    a.m13 * b.m31 + a.m23 * b.m32 + a.m33 * b.m33,
    out,
  );
}

export function mat3Reset(
  m11: number,
  m12: number,
  m13: number,
  m21: number,
  m22: number,
  m23: number,
  m31: number,
  m32: number,
  m33: number,
  out = mat3Alloc(),
) {
  out.m11 = m11;
  out.m12 = m12;
  out.m13 = m13;
  out.m21 = m21;
  out.m22 = m22;
  out.m23 = m23;
  out.m31 = m31;
  out.m32 = m32;
  out.m33 = m33;
  return out;
}

export function mat3Scale(mat: IMat3, scalar: number, out = mat3Alloc()) {
  return mat3Reset(
    mat.m11 * scalar,
    mat.m12 * scalar,
    mat.m13 * scalar,
    mat.m21 * scalar,
    mat.m22 * scalar,
    mat.m23 * scalar,
    mat.m31 * scalar,
    mat.m32 * scalar,
    mat.m33 * scalar,
    out,
  );
}
