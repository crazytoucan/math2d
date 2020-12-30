/**
 * Data type to hold an (x, y) value.
 *
 * The vector type in the Math2d package is used interchangeably to represent both points in the plane
 * and vectors as in linear algebra.
 *
 * Math2d chooses to lay out the (x, y) values in a JavaScript object rather than an array
 * for ease of use. After carefully benchmarking that difference, it's been confirmed that this
 * does not sacrifice performance or memory compactness.
 *
 */
export interface Vec {
  /** x-coordinate of the vector */
  x: number;

  /** y-coordinate of the vector */
  y: number;
}

/**
 * Data type to represent a 2D line segment.
 *
 * A segment object holds two (x, y) endpoints, representing the line segment connecting those points
 * in the plane. Unlike the similar {@link IRay} type, a segment has finite length.
 *
 * For a series of connected line segments, see the {@link IPolyline} data type.
 *
 * Where relevant, a segment is parameterized according to linear interpolation
 * between its endpoints, where _t_ = 0 represents its starting vertex and _t_ = 1 its
 * ending vertex.
 *
 */
export interface Segment {
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
 * Where relevant, a ray is parameterized according to _t_ ≥ 0 with movement of distance _t_ along its direction vector.
 * In this mapping, _t_ = 0 represents the initial point (x0, y0).
 *
 */
export interface Ray {
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
 * Data type to hold a 2D affine transformation matrix.
 *
 * Two-dimensional vector graphics operations are usually represented using an affine transform matrix,
 * i.e. a linear 2x2 matrix plus a 2D translation. Math2d chooses to lay out this data in a
 * flat object structure, as opposed to an array or nested arrays, for ease of use and performance.
 * The field names used here match other standards, like the native DOMMatrix
 * specification, the Canvas reference APIs, and the open-source glMatrix library.
 *
 * ```
 * ⎡a c tx⎤
 * ⎣b d ty⎦
 * ```
 *
 * Per usual linear algebra, multiplying a vector `v = (x, y)` according to this affine matrix is defined by:
 *
 * ```
 * ⎡a c e⎤ ⎛x⎞   ⎛ax + cy + tx⎞
 * ⎢b d f⎥ ⎜y⎟ = ⎜bx + dy + ty⎟
 * ⎣0 0 1⎦ ⎝1⎠   ⎝      1     ⎠
 * ```
 *
 */
export interface Mat2d {
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
   * Col 3, row 1 component, usually called `m41` in a 4x4 graphics matrix.
   */
  tx: number;

  /**
   * Col 3, row 2 component, usually called `m42` in a 4x4 graphics matrix.
   */
  ty: number;
}

/**
 * Data type to represent an axis-aligned bounding box (AABB).
 *
 * Bounding boxes are often used for approximations of geometric shapes or for certain
 * categories of performance-optimized spatial calculations, such as spatial index queries
 * and viewbox culling.
 *
 * A box in Math2d is defined by its `minX`, `minY`, `maxX`, and `maxY` edges. Where
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
 * Math2d chooses to lay out this data in a
 * flat object structure, as opposed to an array or nested arrays, for ease of use and performance.
 *
 */
export interface Box {
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
 * An alias for `number[]`. Data type to represent a sequence of connected line segments in the plane,
 * as an interleaved array of vertex coordinates.
 *
 * The `IPolyline` type is just an alias for an array of number values. For example,
 * a polyline connecting the points p0, p1, p2, ..., pn in space is represented in Math2d as the array:
 * A polyline is not necessary closed.
 *
 * ```
 * [p0x, p0y, p1x, p1y, p2x, p2y, ..., pnx, pny]
 * ```
 *
 * Where relevant, a polyline with _N_ points is parameterized according to _t_ with linear interpolation between
 * adjacent points by index. For example, _t_ = 3.5 represents the midpoint between the index 3 and index 4 point
 * of the polyline, _t_ = 0 is its first point, and _t_ = _N_ is its final point. Any _t_ value falling
 * outside of the range [0, _N_] is disallowed.
 *
 * Math2d chooses to lay out this data in a flattened (interleaved) array, as opposed to e.g. an array of
 * IVecs, for performance and more compact storage.
 */
export type Polyline = number[];

/**
 * Data type to hold the result of a point intersection between two pieces of geometry.
 *
 */
export interface IntersectionResult {
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
export interface NearestPointResult {
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
