import { IVec2, IMat2x3 } from "../types";
import { ENGINE_STATIC } from "../internal/engine";
import { vec2Alloc } from "./vec2Functions";

class Mat2x3 implements IMat2x3 {
  constructor(
    public m11 = NaN,
    public m12 = NaN,
    public m21 = NaN,
    public m22 = NaN,
    public tx = NaN,
    public ty = NaN
  ) {}
}

export function mat2x3Alloc(): IMat2x3 {
  return new Mat2x3();
}

export function mat2x3Copy(mat: IMat2x3, out = mat2x3Alloc()) {
  out.m11 = mat.m11;
  out.m12 = mat.m12;
  out.m21 = mat.m21;
  out.m22 = mat.m22;
  out.tx = mat.tx;
  out.ty = mat.ty;
  return out;
}

export function mat2x3Determinant(mat: IMat2x3) {
  return mat.m11 * mat.m22 - mat.m12 * mat.m21;
}

export function mat2x3Inverse(mat: IMat2x3, out = mat2x3Alloc()) {
  const det = mat.m11 * mat.m22 - mat.m12 * mat.m21;
  if (det < ENGINE_STATIC.epsilon) {
    return mat2x3Reset(NaN, NaN, NaN, NaN, NaN, NaN, out);
  } else {
    const detInverse = 1 / det;
    const m11 = detInverse * mat.m22;
    const m12 = -detInverse * mat.m12;
    const m21 = -detInverse * mat.m21;
    const m22 = detInverse * mat.m11;
    const tx = detInverse * (mat.m21 * mat.ty - mat.m22 * mat.tx);
    const ty = detInverse * (mat.m12 * mat.tx - mat.m11 * mat.ty);
    return mat2x3Reset(m11, m12, m21, m22, tx, ty, out);
  }
}

export function mat2x3IsTranslationOnly(mat: IMat2x3) {
  return mat.m11 === 1 && mat.m12 === 0 && mat.m21 === 0 && mat.m22 === 1;
}

export function mat2x3MulMat2x3(a: IMat2x3, b: IMat2x3, out = mat2x3Alloc()) {
  const m11 = a.m11 * b.m11 + a.m21 * b.m12;
  const m12 = a.m12 * b.m11 + a.m22 * b.m12;
  const m21 = a.m11 * b.m21 + a.m21 * b.m22;
  const m22 = a.m12 * b.m21 + a.m22 * b.m22;
  const tx = a.m11 * b.tx + a.m21 * b.ty + a.tx;
  const ty = a.m12 * b.tx + a.m21 * b.ty + a.ty;
  return mat2x3Reset(m11, m12, m21, m22, tx, ty, out);
}

export function mat2x3MulVec2(mat: IMat2x3, vec: IVec2, out = vec2Alloc()) {
  const x = mat.m11 * vec.x + mat.m21 * vec.y + mat.tx;
  const y = mat.m12 * vec.x + mat.m22 * vec.y + mat.ty;
  out.x = x;
  out.y = y;
  return out;
}

export function mat2x3Reset(
  m11: number,
  m12: number,
  m21: number,
  m22: number,
  tx: number,
  ty: number,
  out = mat2x3Alloc()
) {
  out.m11 = m11;
  out.m12 = m12;
  out.m21 = m21;
  out.m22 = m22;
  out.tx = tx;
  out.ty = ty;
  return out;
}

export function mat2x3Scale(mat: IMat2x3, scalar: number, out = mat2x3Alloc()) {
  out.m11 = scalar * mat.m11;
  out.m12 = scalar * mat.m12;
  out.m21 = scalar * mat.m21;
  out.m22 = scalar * mat.m22;
  out.tx = scalar * mat.tx;
  out.ty = scalar * mat.ty;
  return out;
}
