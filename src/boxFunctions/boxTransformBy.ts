import { _arrayReset } from "../internal/_arrayReset";
import { polylineAlloc } from "../polylineFunctions/polylineAlloc";
import { polylineGetBounds } from "../polylineFunctions/polylineGetBounds";
import { polylineTransformBy } from "../polylineFunctions/polylineTransformBy";
import { IBox, IMat2d } from "../types";
import { boxAlloc } from "./boxAlloc";

const TMP0 = polylineAlloc();

/**
 * Compute the bounds of the image of this box after applying a 2D affine transformation.
 *
 * This function calculates the minimum bounds that will contain the image after applying a transformation
 * to the given bounding box. Note that the actual geometric result of transforming a given
 * box may not be an axis-aligned box! For example, spinning the [-1, 1]×[-1, 1] box 45° clockwise yields a diamond
 * connecting the four points (√2, 0), (0, √2), (-√2, 0), (0, -√2). The bounding box of _that diamond_
 * is [-√2, √2]×[-√2, √2].
 *
 * @param box the box to transform
 * @param mat the affine transformation to apply to the box
 * @param out
 */
export function boxTransformBy(box: IBox, mat: IMat2d, out = boxAlloc()) {
  const poly = TMP0;
  _arrayReset(poly, box.minX, box.minY, box.minX, box.maxY, box.maxX, box.maxY, box.maxX, box.minY);
  polylineTransformBy(poly, mat, poly);
  return polylineGetBounds(poly, out);
}
