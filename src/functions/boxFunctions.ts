// tslint:disable:no-bitwise
import { OUT_MAX_X, OUT_MAX_Y, OUT_MIN_X, OUT_MIN_Y } from "../const";
import { arrayReset } from "../internal/collectionsUtils";
import { _boxAlloc, _polylineAlloc } from "../internal/dataClasses";
import { IBox, IMat2x3, IVec } from "../types";
import { polylineGetBounds, polylineTransformByAff } from "./polylineFunctions";

/**
 * Creates a new Box object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like boxAlloc() are useful to hold results of
 * Vectormath function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 * const TMP_BOX = boxAlloc();
 *
 * // Use this temp memory to hold results of function calls.
 * // This avoids a heap allocation.
 * const result = polygonGetBounds(myPolygon, TMP_BOX);
 */
export function boxAlloc() {
  return _boxAlloc();
}

/**
 * Copies values from an existing IBox into a new box.
 *
 * @param box source to copy values from
 * @param out destination box to copy values to
 *
 * @example
 *  // make a copy of a given box
 *  const myBox = boxReset(-1, -1, 1, 1);
 *  const myBoxCopy = boxClone(myBox);
 *
 *  // copy a given box into preallocated memory
 *  const TMP_BOX = boxAlloc();
 *  boxClone(myBox, TMP_BOX);
 */
export function boxClone(box: IBox, out = boxAlloc()) {
  return boxReset(box.minX, box.minY, box.maxX, box.maxY, out);
}

/**
 * Determines where the specified point lies in relation to the given box.
 *
 * The returned value is a binary OR of the possible values
 * {@link OUT_MIN_X}, {@link OUT_MAX_X}, {@link OUT_MIN_Y}, and {@link OUT_MAX_Y}
 * indicating, for each side, whether the point lies beyond that edge. If the point
 * is inside the box, this function returns the value 0.
 *
 * @param box
 * @param point
 * @example
 *  const myBox = boxReset(-2, -2, 2, 2);
 *  const outCode1 = boxComputeOutCode(myBox, vecReset(-4, 4)); // returns OUT_MIN_X | OUT_MAX_Y
 *  const outCode2 = boxComputeOutCode(myBox, vec2Origin()); // returns 0
 * @see OUT_MIN_X
 * @see OUT_MAX_X
 * @see OUT_MIN_Y
 * @see OUT_MAX_Y
 */
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
 * Determines whether the second box is completely enclosed in the first.
 *
 * Returns true if the second box is contained in the first.
 * Each box is treated as a closed area, so e.g. the two boxes may share
 * an edge and the containment check would still pass.
 *
 * @param a
 * @param b
 */
export function boxContainsBox(a: IBox, b: IBox) {
  return b.minX >= a.minX && b.minY >= a.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
}

/**
 * Determines whether the box contains a given point.
 *
 * Checks whether the point is inside the box's enclosed region.
 * The box is treated as a closed area,
 * so points on the boundary of the box will return true.
 *
 * @param box
 * @param point
 */
export function boxContainsPoint(box: IBox, point: IVec) {
  return point.x >= box.minX && point.y >= box.minY && point.x <= box.maxX && point.y <= box.maxY;
}

/**
 * Grows the box to include a given point.
 *
 * Extends the box's bounding edges, if needed, to encapsulate the given point.
 * If the point is already inside the box, this function does nothing.
 *
 * @param box the box to potentially grow
 * @param point the point that the box should grow to include
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
 * Computes the area intersection of the two box regions.
 *
 * Given two boxes, this function computes the region where they overlap.
 * If the two boxes do not overlap,
 * the returned value will be an empty box, i.e. with `maxX < minX` or `maxY < minY`.
 *
 * The similar function {@link boxIntersectsBox} will check whether two
 * boxes intersect, without actually computing that intersection region.
 *
 * @param a first box to compute intersection for
 * @param b second box to compute intersection for
 * @param out
 * @see {@link boxUnion}
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
 * Determines whether two boxes overlap.
 *
 * This function checks whether the two boxes intersect, as areas. Both boxes are treated as closed
 * regions, so e.g. this function will return true if the boxes share only a single edge.
 *
 * The similar function {@link boxIntersection} can compute the overlap region.
 *
 * @param a first box to check for overlap
 * @param b second box to check for overlap
 */
export function boxIntersectsBox(a: IBox, b: IBox) {
  return a.minX <= b.maxX && a.minY <= b.maxY && a.maxX >= b.minX && a.maxY >= b.minY;
}

/**
 * Determines whether this box represents an empty area.
 *
 * A box is considered empty if its `maxX` is less than its `minX` or its `maxY` is less than its `minY`.
 *
 * This function handles `Infinity`, `-Infinity`, and `NaN` values:
 * - Any box that contains a NaN edge is considered empty
 * - Edges with non-finite values are compared according to normal mathematical rules, so e.g. the
 *    [-∞, +∞]×[-∞, +∞] box is NOT empty, but the [+∞, -∞]×[-1, 1] box IS empty.
 *
 * @param box
 */
export function boxIsEmpty(box: IBox) {
  // Remark: prefer this comparison over distributing the ! to handle NaNs.
  return !(box.maxX >= box.minX && box.maxY >= box.minY);
}

/**
 * Construct a new box given `minX`, `minY`, `maxX`, and `maxY` bounding values.
 *
 * @param minX
 *  min-X boundary of the box, which is typically the _left_ edge
 * @param minY
 *  min-Y boundary of the box, which could be the _top_ OR the _bottom_ edge of the box depending on how your
 *  rendering and coordinate systems are laid out.
 * @param maxX
 *  max-X boundary of the box, which is typically the _right_ edge
 * @param maxY
 *  min-Y boundary of the box, which could be the _top_ OR the _bottom_ edge of the box depending on how your
 *  rendering and coordinate systems are laid out.
 * @param out
 * @example
 *  // initialize a new box that's [-1, 1]×[-1, 1]
 *  const myBox = boxReset(-1, -1, 1, 1);
 *
 *  // reset an existing box's values to [4, 8]×[0, 8]
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

const TMP_boxTransformByAff_0 = _polylineAlloc();
/**
 * Compute the bounds of the image of this box after applying a 2D affine transformation.
 *
 * This function calculates the minimum bounds that will contain the image after applying a transformation
 * to the given bounding box. Note that the actual geometric result of transforming a given
 * box may not be an axis-aligned box! For example, spinning the [-1, 1]×[-1, 1] box 45° clockwise yields a diamond
 * connecting the four points (√2, 0), (0, √2), (-√2, 0), (0, -√2). The bounding box of _that diamond_
 * is [-√2, √2]x[-√2, √2].
 *
 * @param box the box to transform
 * @param mat the affine transformation to apply to the box
 * @param out
 */
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
