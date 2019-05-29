export { IAabb2, IMat2x3, IPolygon, IPolyline, IVec2 } from "./types";
export {
  aabb2Alloc,
  aabb2Clone,
  aabb2ContainsPoint,
  aabb2IncludePoint,
  aabb2Intersection,
  aabb2IntersectsAabb2,
  aabb2IsEmpty,
  aabb2Reset,
  aabb2TransformBy,
  aabb2Union,
} from "./functions/aabb2Functions";
export {
  mat2x3Alloc,
  mat2x3Clone,
  mat2x3GetDeterminant,
  mat2x3Invert,
  mat2x3IsTranslationOnly,
  mat2x3MulMat2x3,
  mat2x3Reset,
  mat2x3Scale,
} from "./functions/mat2x3Functions";
export {
  polygonAlloc,
  polygonContainsPoint,
  polygonGetBounds,
  polygonGetNumSides,
  polygonGetPerimeter,
  polygonTransformBy,
} from "./functions/polygonFunctions";
export {
  polylineAlloc,
  polylineClose,
  polylineGetBounds,
  polylineGetLength,
  polylineGetNumSegments,
  polylineGetSegmentIndexAtDistance,
  polylineGetSegmentLength,
  polylineTransformBy,
} from "./functions/polylineFunctions";
export {
  vec2Add,
  vec2Alloc,
  vec2Clone,
  vec2Distance,
  vec2DistanceSquared,
  vec2GetLength,
  vec2GetLengthSquared,
  vec2Normalize,
  vec2Perp,
  vec2Reset,
  vec2Scale,
  vec2Subtract,
  vec2TransformBy,
} from "./functions/vec2Functions";
