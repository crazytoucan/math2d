import { OUT_MAX_X, OUT_MAX_Y, OUT_MIN_X, OUT_MIN_Y } from "../const";
import { arrayReset } from "../internal/collectionsUtils";
import { _boxAlloc, _polylineAlloc } from "../internal/dataClasses";
import { IBox, IMat2x3, IVec } from "../types";
import { polylineGetBounds, polylineTransformByAff } from "./polylineFunctions";

/**
 * Creates a new Box object in memory, with all values initialized to NaN.
 * This is useful to hold the result of vectormath function calls in performance
 * critical workflows.
 */
export function boxAlloc() {
  return _boxAlloc();
}

/**
 * Copies values from an existing IBox into a new box or memory location.
 *
 * Rukt
 *
 * @param box source to copy values from rofl
 * @param out destination box to copy values to
 */
export function boxClone(box: IBox, out = boxAlloc()) {
  return boxReset(box.minX, box.minY, box.maxX, box.maxY, out);
}

/**
 * Determines wehre the specified point lies in respect to the given box. The returned
 * value is an OR of the possible values OUT_MIN_X, OUT_MAX_X, OUT_MIN_Y, and OUT_MAX_Y
 * indicating, for each side, whether the point lies beyond that edge.
 *
 * @param box
 * @param point
 */
// tslint:disable:no-bitwise
export function boxComputeOutCode(box: IBox, point: IVec) {
  let out = 0;
  if (point.x < box.minX) {
    out |= OUT_MIN_X;
  } else if (point.x > box.maxX) {
    out |= OUT_MAX_X;
  }

  if (point.y < box.minY) {
    out |= OUT_MIN_Y;
  } else if (point.y > box.maxY) {
    out |= OUT_MAX_Y;
  }

  return out;
}
// tslint:enable:no-bitwise

/**
 * Determines whether the second box is completely enclosed in the first. Each box is treated
 * as a closed area, so e.g. the two boxes may share an edge and this method would still return `true`.
 * @param a
 * @param b
 */
export function boxContainsBox(a: IBox, b: IBox) {
  return b.minX >= a.minX && b.minY >= a.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
}

/**
 * Determines whether the box contains a given point. The box is treated as a closed area,
 * so points on the boundary of the box will still return `true`.
 * @param box
 * @param point
 */
export function boxContainsPoint(box: IBox, point: IVec) {
  return point.x >= box.minX && point.y >= box.minY && point.x <= box.maxX && point.y <= box.maxY;
}

/**
 * Grows the box to include a given point. If the point is already inside the box, this function
 * does nothing.
 * @param box
 * @param point
 * @param out
 */
export function boxEncapsulate(box: IBox, point: IVec, out = boxAlloc()) {
  return boxReset(
    Math.min(box.minX, point.x),
    Math.min(box.minY, point.y),
    Math.max(box.maxX, point.x),
    Math.max(box.maxY, point.y),
    out,
  );
}

/**
 * Computes the area intersection of the two box regions, as a box. If the two boxes do not intersect,
 * the returned value will be an empty box, i.e. with `maxX < minX` or `maxY < minY`.
 * @param a
 * @param b
 * @param out
 */
export function boxIntersection(a: IBox, b: IBox, out = boxAlloc()) {
  return boxReset(
    Math.max(a.minX, b.minX),
    Math.max(a.minY, b.minY),
    Math.min(a.maxX, b.maxX),
    Math.min(a.maxY, b.maxY),
    out,
  );
}

/**
 * Determines whether the two boxes intersect, as areas. Both boxes are treated as closed
 * regions, so e.g. this function will return `true` if the boxes share only a single edge.
 * @param a
 * @param b
 */
export function boxIntersectsBox(a: IBox, b: IBox) {
  return a.minX <= b.maxX && a.minY <= b.maxY && a.maxX >= b.minX && a.maxY >= b.minY;
}

/**
 * Determines whether this box represents an empty area. A box is considered empty if
 * its `maxX < minX` or its `maxY < minY`.
 * @param box
 */
export function boxIsEmpty(box: IBox) {
  // Remark: prefer this comparison over distributing the ! to handle NaNs.
  return !(box.maxX >= box.minX && box.maxY >= box.minY);
}

/**
 * Constuct a new box given `minX`, `minY`, `maxX`, and `maxY` bounding values.
 * @param minX
 * @param minY
 * @param maxX
 * @param maxY
 * @param out
 * @example
 *  // initialize a new box that's [-1, 1] × [-1, 1]
 *  const myBox = boxReset(-1, -1, 1, 1);
 *
 *  // reset an existing box's values to [4, 8] × [0, 8]
 *  const myBox2 = boxAlloc();
 *  boxReset(4, 0, 8, 8, myBox2);
 */
export function boxReset(minX: number, minY: number, maxX: number, maxY: number, out = boxAlloc()) {
  out.minX = minX;
  out.minY = minY;
  out.maxX = maxX;
  out.maxY = maxY;
  return out;
}

/**
 * Compute the bounds of the result of transforming this box by a given 2D affine transformation.
 * For example, spinning a unit square 45° clockwise yields a diamond, whose bounding box
 * has side length √2.
 */
const TMP_boxTransformByAff_0 = _polylineAlloc();
export function boxTransformByAff(box: IBox, mat: IMat2x3, out = boxAlloc()) {
  const poly = TMP_boxTransformByAff_0;
  arrayReset(poly, box.minX, box.minY, box.minX, box.maxY, box.maxX, box.maxY, box.maxX, box.minY);
  polylineTransformByAff(poly, mat, poly);
  return polylineGetBounds(poly, out);
}

/**
 * Compute the smallest bounding box that contains both given boxes.
 *
 * For example, if one box contains the other, this method returns the larger box.
 * If the two boxes don't intersect, this method returns a bounding region that covers both boxes.
 *
 * @param a
 * @param b
 * @param out
 */
export function boxUnion(a: IBox, b: IBox, out = boxAlloc()) {
  return boxReset(
    Math.min(a.minX, b.minX),
    Math.min(a.minY, b.minY),
    Math.max(a.maxX, b.maxX),
    Math.max(a.maxY, b.maxY),
    out,
  );
}
