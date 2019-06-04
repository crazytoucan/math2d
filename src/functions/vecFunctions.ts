import { _vecAlloc } from "../internal/dataClasses";
import { EPSILON_SQ } from "../internal/parameters";
import { IMat2x3, IVec } from "../types";

/**
 * Computes the result of adding the two given vectors.
 * @param a
 * @param b
 * @param out
 */
export function vecAdd(a: IVec, b: IVec, out = vecAlloc()) {
  return vecReset(a.x + b.x, a.y + b.y, out);
}

/**
 * Creates a new Vec object in memory, with all values initialized to NaN.
 * This is useful to hold the result of vectormath function calls in performance
 * critical workflows.
 */
export function vecAlloc(): IVec {
  return _vecAlloc();
}

/**
 * Copies the values from the given vector into a new vector.
 * @param vec
 * @param out
 */
export function vecClone(vec: IVec, out = vecAlloc()) {
  return vecReset(vec.x, vec.y, out);
}

/**
 * Computes the straight-line (Euclidean) distance between the two vectors, interpreted as points in the plane.
 * @param a
 * @param b
 */
export function vecDistance(a: IVec, b: IVec) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Computes the squared straight-line (i.e. Euclidean) distance between the two vectors, interpreted as points in the plane.
 * @param a
 * @param b
 */
export function vecDistanceSq(a: IVec, b: IVec) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

/**
 * Computes the dot product of the two vectors, i.e. `a.x * b.x + a.y * b.y`.
 * @param a
 * @param b
 */
export function vecDot(a: IVec, b: IVec) {
  return a.x * b.x + a.y * b.y;
}

/**
 * Computes the straight-line length (i.e. Euclidean norm) of the given vector.
 * @param vec
 */
export function vecGetLength(vec: IVec) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

/**
 * Computes the squared straight-line length (i.e. square of the Euclidean norm) of the given vector.
 * @param vec
 */
export function vecGetLengthSq(vec: IVec) {
  return vec.x * vec.x + vec.y * vec.y;
}

/**
 * Computes the Manhattan length of the given vector, i.e. `|x| + |y|`.
 * @param vec
 */
export function vecGetManhattanLength(vec: IVec) {
  return Math.abs(vec.x) + Math.abs(vec.y);
}

/**
 * Performs a linear interpolation between the two vectors. The `r` parameter is allowed to be outside `[0, 1]`.
 * @param a
 * @param b
 * @param r
 * @param out
 */
export function vecLerp(a: IVec, b: IVec, r: number, out = vecAlloc()) {
  return vecReset(a.x * (1 - r) + b.x * r, a.y * (1 - r) + b.y * r, out);
}

/**
 * Computes the Manhattan distance between the two vectors, interpreted as points in the plane.
 * Equivalent to `|b.x - a.x| + |b.y - a.y|`.
 * @param a
 * @param b
 */
export function vecManhattanDistance(a: IVec, b: IVec) {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

/**
 * Normalizes the vector to be length 1. If the given vector is the zero-vector, this method
 * returns `(NaN, NaN)`.
 * @param vec
 * @param out
 */
export function vecNormalize(vec: IVec, out = vecAlloc()) {
  const lenSq = vec.x * vec.x + vec.y * vec.y;
  if (lenSq < EPSILON_SQ) {
    return vecReset(NaN, NaN, out);
  } else {
    const lenInverse = 1 / Math.sqrt(lenSq);
    return vecReset(lenInverse * vec.x, lenInverse * vec.y, out);
  }
}

/**
 * Returns the 2d origin vector, `(0, 0)`.
 * @param out
 */
export function vecOrigin(out = vecAlloc()) {
  return vecReset(0, 0, out);
}

/**
 * Computes the perp of the given vector, as defined by `vecPerp(a, b) = (-b, a)`.
 * This is equivalent to a counter-clockwise rotation in the standard plane.
 * @param vec
 * @param out
 */
export function vecPerp(vec: IVec, out = vecAlloc()) {
  return vecReset(-vec.y, vec.x, out);
}

/**
 * Constuct a new vector given an `x` and `y` value.
 * @param x
 * @param y
 * @param out
 */
export function vecReset(x: number, y: number, out = vecAlloc()) {
  out.x = x;
  out.y = y;
  return out;
}

/**
 * Scales both coordinates of this vector by the given scalar.
 * @param vec
 * @param scalar
 * @param out
 */
export function vecScale(vec: IVec, scalar: number, out = vecAlloc()) {
  return vecReset(vec.x * scalar, vec.y * scalar, out);
}

/**
 * Subtracts vector `b` from vector `a`.
 *
 * @param a
 * @param b
 * @param out
 */
export function vecSubtract(a: IVec, b: IVec, out = vecAlloc()) {
  return vecReset(a.x - b.x, a.y - b.y, out);
}

/**
 * Multiplies the vector by an affine matrix.
 *
 * Per usual linear algebra, multiplying the vector `vec = (x, y)` according to an affine matrix
 * `[a b c d e f]` is defined by:
 *
 * ```
 * ⎡a c e⎤ ⎛x⎞   ⎛ax + cy + e⎞
 * ⎢b d f⎥ ⎜y⎟ = ⎜bx + dy + f⎟
 * ⎣0 0 1⎦ ⎝1⎠   ⎝     1     ⎠
 * ```
 *
 * @param vec
 * @param mat
 * @param out
 */
export function vecTransformByAff(vec: IVec, mat: IMat2x3, out = vecAlloc()) {
  return vecReset(mat.a * vec.x + mat.c * vec.y + mat.e, mat.b * vec.x + mat.d * vec.y + mat.f, out);
}
