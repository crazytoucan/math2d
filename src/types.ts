/**
 * Data type to hold an (x, y) value.
 *
 * The vector type in the Vectormath package is used interchangeably to represent either points or linear vectors.
 * For example, a vertex of a polygon can be interepreted as a vector,
 * or the direction of a ray emanating from its initial point can be interpreted as a vector.
 *
 * Vectormath chooses to lay out this data in a
 * flat object structure, as opposed to an array, for ease of use, clarity, and performance.
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
 * A segment object represents the shortest path between two given points in the
 * plane. Unlike the similar {@link IRay} and {@link ILine} types, the segment type
 * does not extend infinitely in any direction.
 *
 * Where relevant, a segment is parameterized according to linear interpolation
 * between its endpoints, where _t_ = 0 represents its starting vertex and _t_ = 1 its
 * ending vertex.
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
 * The representation of a ray and the similar {@link ILine} type is actually the same, but Vectormath chooses
 * to export both names for clarity of usage. Functions that may interpret Rays and Lines differently will be
 * named differently to prevent any ambiguity, such as {@link polygonIntersectLine} vs {@link polygonIntersectRay}.
 *
 * Where relevant, a ray is parameterized according to _t_ ≥ 0 with movement of distance _t_ along its direction vector.
 * In this mapping, _t_ = 0 represents its initial point (x0, y0).
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
   * x-coordinate of the direction of the ray, relative to its initial point
   */
  dirX: number;

  /**
   * y-coordinate of the direction of the ray, relative to its initial point
   */
  dirY: number;
}

/**
 * Data type to represent a line in 2D space, i.e. some initial point in the plane plus a unit-length direction
 * vector coming from that point.
 *
 * The representation of a line and the similar {@link IRay} type is actually the same, but Vectormath chooses
 * to export these two names for ease of clarity. Functions that may interpret Rays and Lines differently will be
 * named differently to prevent any ambiguity, such as {@link polygonIntersectLine} vs {@link polygonIntersectRay}.
 *
 * Where relevant, a line is parameterized according to _t_ with movement of distance _t_ along its direction vector.
 * In this mapping, _t_ = 0 represents its initial point (x0, y0), _t_ > 0 moves in the direction of its vector,
 * and _t_ < 0 in the opposite direction.
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
 * flat object structure, as opposed to an array or nested arrays, for ease of use, clarity, and performance.
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
 */
export interface IMat2x3 {
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
 * relevant, boxes are interpreted as _closed_ regions, i.e. they include those points
 * that lie along their edges.
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
 * flat object structure, as opposed to an array or nested arrays, for ease of use, clarity, and performance.
 */
export interface IBox {
  /**
   * Min-X boundary of this box, typically the "left" edge.
   */
  minX: number;

  /**
   * Min-Y boundary of this box. Note that this could be either the "top" or the "bottom" of the
   * box, depending on how your rendering and coordinate system are laid out.
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
 * Data type to represent a polygon in the plane, as an interleaved sequence of vertex coordinates.
 * Unlike the similar {@link IPolyline} type, a polygon's perimeter is always interpreted as a closed shape.
 *
 * Vectormath chooses to lay out this data in a flattened (interleaved) array, as opposed to e.g. an array of
 * IVecs, for performance and more compact storage.
 */
export type IPolygon = number[];

/**
 * Data type to represent a sequence of connected line segments in the plane,
 * as an interleaved sequence of vertex coordinates.
 * Unlike the similar {@link IPolygon} type, a polyline is not necessary closed.
 *
 * Vectormath chooses to lay out this data in a flattened (interleaved) array, as opposed to e.g. an array of
 * IVecs, for performance and more compact storage.
 */
export type IPolyline = number[];

/**
 * Data type to hold the value of a point intersection between two pieces of geometry.
 */
export interface IIntersection {
  /**
   * Whether an intersection was found. If the return value of a function returns `false` for the `exists` field,
   * the other values will be set to `NaN` and should not be interpreted.
   */
  exists: boolean;

  /**
   * The x-coordinate of the point of intersection.
   */
  x: number;

  /**
   * The y-coordinate of the point of intersection.
   */
  y: number;

  /**
   * The parameterization of this point of intersection along the first shape's geometry.
   */
  t0: number;

  /**
   * The parameterization of this point of intersection along the second shape's geometry.
   */
  t1: number;
}
