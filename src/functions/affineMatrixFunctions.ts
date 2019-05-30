import { ENGINE } from "../internal/engine";
import { IAffineMatrix } from "../types";

class AffineMatrix implements IAffineMatrix {
  constructor(public a = NaN, public b = NaN, public c = NaN, public d = NaN, public e = NaN, public f = NaN) {}
}

export function affineMatrixAlloc(): IAffineMatrix {
  return new AffineMatrix();
}

export function affineMatrixClone(mat: IAffineMatrix, out = affineMatrixAlloc()) {
  out.a = mat.a;
  out.b = mat.b;
  out.c = mat.c;
  out.d = mat.d;
  out.e = mat.e;
  out.f = mat.f;
  return out;
}

export function affineMatrixGetDeterminant(mat: IAffineMatrix) {
  return mat.a * mat.d - mat.b * mat.c;
}

export function affineMatrixInvert(mat: IAffineMatrix, out = affineMatrixAlloc()) {
  const det = mat.a * mat.d - mat.b * mat.c;
  if (det < ENGINE.epsilon) {
    return affineMatrixReset(NaN, NaN, NaN, NaN, NaN, NaN, out);
  } else {
    const detInverse = 1 / det;
    const a = detInverse * mat.d;
    const b = -detInverse * mat.b;
    const c = -detInverse * mat.c;
    const d = detInverse * mat.a;
    const e = detInverse * (mat.c * mat.f - mat.d * mat.e);
    const f = detInverse * (mat.b * mat.e - mat.a * mat.f);
    return affineMatrixReset(a, b, c, d, e, f, out);
  }
}

export function affineMatrixIsTranslationOnly(mat: IAffineMatrix) {
  return mat.a === 1 && mat.b === 0 && mat.c === 0 && mat.d === 1;
}

export function affineMatrixMulMat2x3(m1: IAffineMatrix, m2: IAffineMatrix, out = affineMatrixAlloc()) {
  const a = m1.a * m2.a + m1.c * m2.b;
  const b = m1.b * m2.a + m1.d * m2.b;
  const c = m1.a * m2.c + m1.c * m2.d;
  const d = m1.b * m2.c + m1.d * m2.d;
  const e = m1.a * m2.e + m1.c * m2.f + m1.e;
  const f = m1.b * m2.e + m1.c * m2.f + m1.f;
  return affineMatrixReset(a, b, c, d, e, f, out);
}

export function affineMatrixReset(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  out = affineMatrixAlloc(),
) {
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.e = e;
  out.f = f;
  return out;
}

export function affineMatrixScale(mat: IAffineMatrix, scalar: number, out = affineMatrixAlloc()) {
  out.a = scalar * mat.a;
  out.b = scalar * mat.b;
  out.c = scalar * mat.c;
  out.d = scalar * mat.d;
  out.e = scalar * mat.e;
  out.f = scalar * mat.f;
  return out;
}
