/**
 * Data type to hold an (x, y) value.
 *
 * The vector type in the Vectormath package is used interchangeably to represent both points in the plane
 * and vectors as in linear algebra.
 *
 * Vectormath chooses to lay out the (x, y) values in a JavaScript object rather than an array
 * for ease of use. After carefully benchmarking that difference, it's been confirmed that this
 * does not sacrifice performance or memory compactness.
 *
 * @see {@link vecAlloc}
 * @see {@link vecReset}
 */
export interface IVec {
  /** x-coordinate of the vector */
  x: number;

  /** y-coordinate of the vector */
  y: number;
}

/**
 * Data type to represent a 2D line segment.
 *
 * A segment object holds two (x, y) endpoints, representing the line segment connecting those points
 * in the plane. Unlike the similar {@link IRay} and {@link ILine} types, a segment has finite length.
 *
 * For a series of connected line segments, see the {@link IPolyline} data type.
 *
 * Where relevant, a segment is parameterized according to linear interpolation
 * between its endpoints, where _t_ = 0 represents its starting vertex and _t_ = 1 its
 * ending vertex.
 *
 * @see {@link segmentAlloc}
 * @see {@link segmentReset}
 */
export interface ISegment {
  /**
   * x-coordinate of the starting vertex of the segment.
   */
  x0: number;

  /**
   * y-coordinate of the starting vertex of the segment.
   */
  y0: number;

  /**
   * x-coordinate of the ending vertex of the segment.
   */
  x1: number;

  /**
   * y-coordinate of the ending vertex of the segment.
   */
  y1: number;
}

/**
 * Data type to represent a ray in 2D space, i.e. an initial point in the plane plus a unit-length direction
 * vector coming from that point.
 *
 * The data representation of a ray and the similar {@link ILine} type is actually the same, but Vectormath chooses
 * to export both names for clarity of usage. Functions that may interpret Rays and Lines differently will be
 * named differently to prevent ambiguity,
 * such as {@link polygonIntersectLineIterator} vs {@link polygonIntersectRayIterator}.
 *
 * Where relevant, a ray is parameterized according to _t_ ≥ 0 with movement of distance _t_ along its direction vector.
 * In this mapping, _t_ = 0 represents the initial point (x0, y0).
 *
 * @see {@link rayAlloc}
 * @see {@link rayReset}
 */
export interface IRay {
  /**
   * x-coordinate of the ray's initial point
   */
  x0: number;

  /**
   * y-coordinate of the ray's initial point
   */
  y0: number;

  /**
   * x-coordinate of the direction vector of the ray.
   * A ray's (dirX, dirY) direction vector is a unit vector emanating from its initial point.
   */
  dirX: number;

  /**
   * y-coordinate of the direction vector of the ray.
   * A ray's (dirX, dirY) direction vector is a unit vector emanating from its initial point.
   */
  dirY: number;
}

/**
 * Data type to represent a line in 2D space, i.e. some initial point in the plane plus a unit-length direction
 * vector coming from that point.
 *
 * The data representation of a line and the similar {@link IRay} type is actually the same, but Vectormath chooses
 * to export these two names for ease of clarity. Functions that may interpret Rays and Lines differently will be
 * named differently to prevent ambiguity, such as
 * {@link polygonIntersectLineIterator} vs {@link polygonIntersectRayIterator}.
 *
 * Where relevant, a line is parameterized according to _t_ with movement of distance _t_ along its direction vector.
 * In this mapping, _t_ = 0 represents the initial point (x0, y0), _t_ > 0 moves in the direction of its vector,
 * and _t_ < 0 in the opposite direction.
 *
 * @see {@link lineAlloc}
 * @see {@link lineReset}
 */
export interface ILine {
  /**
   * x-coordinate of the line's initial point
   */
  x0: number;

  /**
   * y-coordinate of the line's initial point
   */
  y0: number;

  /**
   * x-coordinate of the direction of the line, relative to its initial point
   */
  dirX: number;

  /**
   * y-coordinate of the direction of the line, relative to its initial point
   */
  dirY: number;
}

/**
 * Data type to hold a 2D affine transformation matrix.
 *
 * Two-dimensional vector graphics operations are usually represented using an affine transform matrix,
 * i.e. a linear 2x2 matrix plus a 2D translation. Vectormath chooses to lay out this data in a
 * flat object structure, as opposed to an array or nested arrays, for ease of use and performance.
 * The field names used here match other standards, like the native DOMMatrix
 * specification and the Canvas reference APIs.
 *
 * ```
 * ⎡a c e⎤
 * ⎣b d f⎦
 * ```
 *
 * Per usual linear algebra, multiplying a vector `v = (x, y)` according to this affine matrix is defined by:
 *
 * ```
 * ⎡a c e⎤ ⎛x⎞   ⎛ax + cy + e⎞
 * ⎢b d f⎥ ⎜y⎟ = ⎜bx + dy + f⎟
 * ⎣0 0 1⎦ ⎝1⎠   ⎝     1     ⎠
 * ```
 *
 * @see {@link mat2dAlloc}
 * @see {@link mat2dReset}
 */
export interface IMat2d {
  /**
   * Col 1, row 1 component, usually called `m11` in a 4x4 graphics matrix.
   */
  a: number;

  /**
   * Col 1, row 2 component, usually called `m12` in a 4x4 graphics matrix.
   */
  b: number;

  /**
   * Col 2, row 1 component, usually called `m21` in a 4x4 graphics matrix.
   */
  c: number;

  /**
   * Col 2, row 2 component, usually called `m22` in a 4x4 graphics matrix.
   */
  d: number;

  /**
   * Col 3, row 1 component, usually called `tx` or `m41` in a 4x4 graphics matrix.
   */
  e: number;

  /**
   * Col 3, row 2 component, usually called `ty` or `m42` in a 4x4 graphics matrix.
   */
  f: number;
}

/**
 * Data type to represent an axis-aligned bounding box (AABB).
 *
 * Bounding boxes are often used for approximations of geometric shapes or for certain
 * categories of performance-optimized spatial calculations, such as spatial index queries
 * and viewbox culling.
 *
 * A box in Vectormath is defined by its `minX`, `minY`, `maxX`, and `maxY` edges. Where
 * relevant and unless documented otherwise, boxes are interpreted as _closed_ regions,
 * i.e. they include those points that lie along their edges.
 *
 * ```
 * ┌╴x+
 * y+     minY ─┌──────┐
 *        maxY ─└──────┘
 *              │      │
 *            minX    maxX
 * ```
 *
 * Vectormath chooses to lay out this data in a
 * flat object structure, as opposed to an array or nested arrays, for ease of use and performance.
 *
 * @see {@link boxAlloc}
 * @see {@link boxReset}
 */
export interface IBox {
  /**
   * Min-X boundary of this box, typically the "left" edge.
   */
  minX: number;

  /**
   * Min-Y boundary of this box. Note that this could be either the "top" or the "bottom" of the
   * box, depending on how your rendering and coordinate systems are laid out.
   */
  minY: number;

  /**
   * Min-X boundary of this box, typically the "right" edge.
   */
  maxX: number;

  /**
   * Max-Y boundary of this box. Note that this could be either the "top" or the "bottom" of the
   * box, depending on how your rendering and coordinate system are laid out.
   */
  maxY: number;
}

/**
 * An alias for `number[]`. Data type to represent a polygon in the plane,
 * as an interleaved sequence of vertex coordinates.
 *
 * The `IPolygon` type is just an alias for an array of number values. For example,
 * a polygon with vertices v0, v1, v2, ..., vn is represented in Vectormath as the array:
 *
 * ```
 * [v0x, v0y, v1x, v1y, v2x, v2y, ..., vnx, vny]
 * ```
 *
 * Unlike the similar {@link IPolyline} type, a polygon's perimeter is always interpreted as a closed shape.
 *
 * Where relevant, a polygon with _N_ sides is parameterized according to _t_,
 * where integer values of _t_ correspond to the polygon's
 * vertices in order, and smooth values of _t_ therein interpolate linearly between adjacent vertices, with an
 * additional segment connecting the last vertex to the first.
 *
 * Vectormath chooses to lay out this data in a flattened (interleaved) array, as opposed to e.g. an array of
 * IVecs, for performance and more compact storage.
 */
export type IPolygon = number[];

/**
 * An alias for `number[]`. Data type to represent a sequence of connected line segments in the plane,
 * as an interleaved array of vertex coordinates.
 *
 * The `IPolyline` type is just an alias for an array of number values. For example,
 * a polyline connecting the points p0, p1, p2, ..., pn in space is represented in Vectormath as the array:
 *
 * ```
 * [p0x, p0y, p1x, p1y, p2x, p2y, ..., pnx, pny]
 * ```
 *
 * Unlike the similar {@link IPolygon} type, a polyline is not necessary closed.
 *
 * Where relevant, a polyline with _N_ points is parameterized according to _t_ with linear interpolation between
 * adjacent points by index. For example, _t_ = 3.5 represents the midpoint between the index 3 and index 4 point
 * of the polyline, _t_ = 0 is its first point, and _t_ = _N_ is its final point. Any _t_ value falling
 * outside of the range [0, _N_] is disallowed.
 *
 * Vectormath chooses to lay out this data in a flattened (interleaved) array, as opposed to e.g. an array of
 * IVecs, for performance and more compact storage.
 */
export type IPolyline = number[];

/**
 * Data type to hold the result of a point intersection between two pieces of geometry.
 *
 * @see {@link lineIntersectLine}
 * @see {@link lineIntersectPolylineIterator}
 * @see {@link lineIntersectRay}
 * @see {@link lineIntersectSegment}
 * @see {@link polygonIntersectLineIterator}
 * @see {@link polygonIntersectRayIterator}
 * @see {@link polygonIntersectSegmentIterator}
 * @see {@link polylineIntersectLineIterator}
 * @see {@link polylineIntersectRayIterator}
 * @see {@link polylineIntersectSegmentIterator}
 * @see {@link rayIntersectLine}
 * @see {@link rayIntersectPolylineIterator}
 * @see {@link rayIntersectRay}
 * @see {@link rayIntersectSegment}
 * @see {@link segmentIntersectLine}
 * @see {@link segmentIntersectPolylineIterator}
 * @see {@link segmentIntersectRay}
 * @see {@link segmentIntersectSegment}
 */
export interface IPointIntersectionResult {
  /**
   * Whether an intersection was found. If the return value of a function is `false` for the `exists` field,
   * the other Intersection values will be set to `NaN` and should not be interpreted.
   */
  exists: boolean;

  /**
   * The x-coordinate of the intersection, if an intersection point was found.
   */
  x: number;

  /**
   * The y-coordinate of the intersection, if an intersection point was found.
   */
  y: number;

  /**
   * The parameterization of the intersection along the first shape's geometry,
   * if an intersection point was found.
   */
  t0: number;

  /**
   * The parameterization of the intersection along the second shape's geometry,
   * if an intersection point was found.
   */
  t1: number;
}

/**
 * Data type to hold the result of find the nearest point on a piece of geometry.
 */
export interface INearestPointResult {
  /**
   * The x-coordinate of the nearest point.
   */
  x: number;

  /**
   * The y-coordinate of the nearest point.
   */
  y: number;

  /**
   * The parameterization of the nearest point along the geometry.
   */
  t: number;

  /**
   * The value of the distance from the computed nearest point to the original point.
   * This may be the actual (Euclidean) distance, the signed euclidean distance, or the distance squared,
   * depending on the actual nearest function called.
   *
   * Consult the docs for the particular nearest function being called for specifics on what value
   * is returned in this field.
   */
  distanceValue: number;
}
