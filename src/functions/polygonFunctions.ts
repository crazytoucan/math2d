import { IMat2x3, IPolygon, IVec2 } from "../types";
import { aabb2Alloc } from "./aabb2Functions";
import { polylineGetBounds, polylineGetLength, polylineTransformBy } from "./polylineFunctions";
import { vec2Alloc, vec2Distance, vec2Reset } from "./vec2Functions";

const TMP_VEC0 = vec2Alloc();
const TMP_VEC1 = vec2Alloc();

export function polygonAlloc(): IPolygon {
  return [];
}

export function polygonContainsPoint(poly: IPolygon, point: IVec2) {
  const x = point.x;
  const y = point.y;

  let inside = false;
  for (let i = 0; i < poly.length; i += 2) {
    const x0 = poly[i];
    const y0 = poly[i + 1];
    const x1 = i < poly.length - 2 ? poly[i + 2] : poly[0];
    const y1 = i < poly.length - 2 ? poly[i + 3] : poly[1];
    const intersects = y0 > y !== y1 > y && x - x0 < ((x1 - x0) * (y - y0)) / (y1 - y0);

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

export function polygonGetBounds(poly: IPolygon, out = aabb2Alloc()) {
  return polylineGetBounds(poly, out);
}

export function polygonGetNumSides(poly: IPolygon) {
  return poly.length / 2;
}

export function polygonGetPerimeter(poly: IPolygon) {
  if (poly.length === 0) {
    return 0;
  }

  const length = polylineGetLength(poly);
  const end = vec2Reset(poly[poly.length - 2], poly[poly.length - 1], TMP_VEC0);
  const start = vec2Reset(poly[0], poly[1], TMP_VEC1);
  return length + vec2Distance(end, start);
}

export function polygonTransformBy(poly: IPolygon, mat: IMat2x3, out = polygonAlloc()) {
  return polylineTransformBy(poly, mat, out);
}
