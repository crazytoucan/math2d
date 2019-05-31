import { IMat2x3 } from "../types";
import { EPSILON } from "../internal/parameters";

class Mat2x3 implements IMat2x3 {
  constructor(public a = NaN, public b = NaN, public c = NaN, public d = NaN, public e = NaN, public f = NaN) {}
}

export function mat2x3AffDeterminant(mat: IMat2x3) {
  return mat.a * mat.d - mat.b * mat.c;
}

export function mat2x3AffFromRotation(theta: number, out = mat2x3Alloc()) {
  const sin = Math.sin(theta);
  const cos = Math.cos(theta);
  return mat2x3Reset(cos, -sin, sin, cos, 0, 0, out);
}

export function mat2x3AffFromTranslation(tx: number, ty: number, out = mat2x3Alloc()) {
  return mat2x3Reset(0, 0, 0, 0, tx, ty, out);
}

export function mat2x3AffInvert(mat: IMat2x3, out = mat2x3Alloc()) {
  const det = mat.a * mat.d - mat.b * mat.c;
  if (det < EPSILON) {
    return mat2x3Reset(NaN, NaN, NaN, NaN, NaN, NaN, out);
  } else {
    const detInverse = 1 / det;
    return mat2x3Reset(
      detInverse * mat.d,
      -detInverse * mat.b,
      -detInverse * mat.c,
      detInverse * mat.a,
      detInverse * (mat.c * mat.f - mat.d * mat.e),
      detInverse * (mat.b * mat.e - mat.a * mat.f),
      out,
    );
  }
}

export function mat2x3AffIsTranslationOnly(mat: IMat2x3) {
  return mat.a === 1 && mat.b === 0 && mat.c === 0 && mat.d === 1;
}

export function mat2x3AffMulMat2x3Aff(m1: IMat2x3, m2: IMat2x3, out = mat2x3Alloc()) {
  const a = m1.a * m2.a + m1.c * m2.b;
  const b = m1.b * m2.a + m1.d * m2.b;
  const c = m1.a * m2.c + m1.c * m2.d;
  const d = m1.b * m2.c + m1.d * m2.d;
  const e = m1.a * m2.e + m1.c * m2.f + m1.e;
  const f = m1.b * m2.e + m1.c * m2.f + m1.f;
  return mat2x3Reset(a, b, c, d, e, f, out);
}

export function mat2x3AffScale(mat: IMat2x3, scalar: number, out = mat2x3Alloc()) {
  return mat2x3Reset(scalar * mat.a, scalar * mat.b, scalar * mat.c, scalar * mat.d, mat.e, mat.f, out);
}

export function mat2x3AffTranslate(mat: IMat2x3, tx: number, ty: number, out = mat2x3Alloc()) {
  return mat2x3Reset(mat.a, mat.b, mat.c, mat.d, mat.e + tx, mat.f + ty, out);
}

export function mat2x3Alloc(): IMat2x3 {
  return new Mat2x3();
}

export function mat2x3Clone(mat: IMat2x3, out = mat2x3Alloc()) {
  return mat2x3Reset(mat.a, mat.b, mat.c, mat.d, mat.e, mat.f, out);
}

export function mat2x3Reset(a: number, b: number, c: number, d: number, e: number, f: number, out = mat2x3Alloc()) {
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.e = e;
  out.f = f;
  return out;
}