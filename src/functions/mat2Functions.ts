import { ENGINE } from "../internal/engine";
import { IMat2 } from "../types";

class Mat2 implements IMat2 {
  constructor(public m11 = NaN, public m12 = NaN, public m21 = NaN, public m22 = NaN) {}
}

export function mat2Alloc(): IMat2 {
  return new Mat2();
}

export function mat2Clone(mat: IMat2, out = mat2Alloc()) {
  return mat2Reset(mat.m11, mat.m12, mat.m21, mat.m22, out);
}

export function mat2Determinant(mat: IMat2) {
  return mat.m11 * mat.m22 - mat.m12 * mat.m21;
}

export function mat2Invert(mat: IMat2, out = mat2Alloc()) {
  const det = mat2Determinant(mat);
  if (det < ENGINE.epsilon) {
    return mat2Reset(NaN, NaN, NaN, NaN, out);
  } else {
    const detInverse = 1 / det;
    return mat2Reset(detInverse * mat.m22, -detInverse * mat.m12, -detInverse * mat.m21, detInverse * mat.m11, out);
  }
}

export function mat2MulMat2(a: IMat2, b: IMat2, out = mat2Alloc()) {
  return mat2Reset(
    a.m11 * b.m11 + a.m21 * b.m12,
    a.m12 * b.m11 + a.m22 * b.m12,
    a.m11 * b.m21 + a.m21 * b.m22,
    a.m12 * b.m21 + a.m22 * b.m22,
    out,
  );
}

export function mat2Reset(m11: number, m12: number, m21: number, m22: number, out = mat2Alloc()) {
  out.m11 = m11;
  out.m12 = m12;
  out.m21 = m21;
  out.m22 = m22;
  return out;
}

export function mat2Scale(mat: IMat2, scalar: number, out = mat2Alloc()) {
  return mat2Reset(scalar * mat.m11, scalar * mat.m12, scalar * mat.m21, scalar * mat.m22, out);
}
