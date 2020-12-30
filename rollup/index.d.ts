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
 * __see {@link vecAlloc}
 * __see {@link vecReset}
 */
interface IVec {
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
 * __see {@link segmentAlloc}
 * __see {@link segmentReset}
 */
interface ISegment {
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
 * __see {@link rayAlloc}
 * __see {@link rayReset}
 */
interface IRay {
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
 * __see {@link mat2dAlloc}
 * __see {@link mat2dReset}
 */
interface IMat2d {
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
 * __see {@link boxAlloc}
 * __see {@link boxReset}
 */
interface IBox {
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
type IPolyline = number[];
/**
 * Data type to hold the result of a point intersection between two pieces of geometry.
 *
 * __see {@link polygonIntersectRay}
 * __see {@link polygonIntersectSegment}
 * __see {@link polylineIntersectRay}
 * __see {@link polylineIntersectSegment}
 * __see {@link rayIntersectPolyline}
 * __see {@link rayIntersectRay}
 * __see {@link rayIntersectSegment}
 * __see {@link segmentIntersectPolyline}
 * __see {@link segmentIntersectRay}
 * __see {@link segmentIntersectSegment}
 */
interface IIntersectionResult {
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
interface INearestPointResult {
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
/**
 * Creates a new Box object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `boxAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = boxAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `polygonGetBounds()`.
 *    // This avoids a heap allocation.
 *    const result = polygonGetBounds(existingObj.geometry, TMP0);
 *  }
 */
declare function boxAlloc(): IBox;
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
declare function boxClone(box: IBox, out?: IBox): IBox;
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
declare function boxContainsBox(a: IBox, b: IBox): boolean;
// tslint:disable:no-bitwise
/**
 * Sentinel values for the result of {@link boxGetOutCode}. The result of that
 * function may be a bitwise union (`|`) of these enum members.
 */
declare const enum Out {
    /**
     * Sentinel value for the result of {@link boxGetOutCode} to represent that
     * the point was outside the min-X edge of the box.
     */
    MIN_X = 1,
    /**
     * Sentinel value for the result of {@link boxGetOutCode} to represent that
     * the point was outside the max-X edge of the box.
     */
    MIN_Y = 2,
    /**
     * Sentinel value for the result of {@link boxGetOutCode} to represent that
     * the point was outside the min-Y edge of the box.
     */
    MAX_X = 4,
    /**
     * Sentinel value for the result of {@link boxGetOutCode} to represent that
     * the point was outside the max-Y edge of the box.
     */
    MAX_Y = 8
}
declare const enum IntervalMode {
    OPEN = 0,
    CLOSED = 1,
    OPEN_ABOVE = 2
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
declare function boxContainsPoint(box: IBox, point: IVec, mode: IntervalMode): boolean;
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
declare function boxEncapsulate(box: IBox, point: IVec, out?: IBox): IBox;
/**
 * Computes the smallest bounding box that contains all of the provided points.
 *
 * If the provided array is empty, this method returns a box with `minX` and
 * `minY` set to `Infinity` and `maxX` and `maxY` set to `-Infinity`.
 *
 * @param points the points to contain
 * @param out
 */
declare function boxEnclosingPoints(points: IVec[], out?: IBox): IBox;
/**
 * Determines where the specified point lies in relation to the given box.
 *
 * The returned value is a binary OR of the possible values
 * {@link Out.MIN_X}, {@link Out.MAX_X}, {@link Out.MIN_Y}, and {@link Out.MAX_Y}
 * indicating, for each side, whether the point lies beyond that edge. If the point
 * is inside the box, this function returns the value 0.
 *
 * @param box
 * @param point
 * @example
 *  const myBox = boxReset(-2, -2, 2, 2);
 *  const outCode1 = boxGetOutCode(myBox, vecReset(-4, 4)); // returns Out.MIN_X | Out.MAX_Y
 *  const outCode2 = boxGetOutCode(myBox, vec2Origin()); // returns 0
 * __see Out.MIN_X
 * __see Out.MAX_X
 * __see Out.MIN_Y
 * __see Out.MAX_Y
 */
declare function boxGetOutCode(box: IBox, point: IVec): number;
/**
 * Expands a box by a given amount in all directions.
 *
 * Forms a new box with bounding edges `[(minX - amount) (minY - amount) (maxX + amount) (maxY + amount)]`.
 *
 * The `amount` parameter is allowed to be negative, which effectively shrinks the box.
 *
 * @param box the box to grow
 * @param amount amount to expand from each edge. Is allowed to be negative.
 * @param out
 */
declare function boxGrow(box: IBox, amount: number, out?: IBox): IBox;
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
 * __see {@link boxUnion}
 */
declare function boxIntersection(a: IBox, b: IBox, out?: IBox): IBox;
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
 * @param mode whether to include the boundaries of the boxes
 */
declare function boxIntersectsBox(a: IBox, b: IBox, mode: IntervalMode): boolean;
/**
 * Determines whether this box represents an empty area.
 *
 * A box is considered empty if its `maxX` is less than or equal to its `minX` or
 * its `maxY` is less than or equal to its `minY`.
 *
 * This function handles `Infinity`, `-Infinity`, and `NaN` values:
 * - Any box that contains a NaN edge is considered empty
 * - Edges with non-finite values are compared according to normal mathematical rules, so e.g. the
 *    [-∞, +∞]×[-∞, +∞] box is NOT empty, but the [+∞, -∞]×[-1, 1] box IS empty.
 *
 * @param box
 */
declare function boxIsEmpty(box: IBox): boolean;
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
declare function boxReset(minX: number, minY: number, maxX: number, maxY: number, out?: IBox): IBox;
/**
 * Scales a box by a fixed scalar in both directions.
 *
 * @param box the box to scale
 * @param scalar the value by which to multiply all of the box's components
 * @param out
 */
declare function boxScale(box: IBox, scalar: number, out?: IBox): IBox;
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
declare function boxTransformBy(box: IBox, mat: IMat2d, out?: IBox): IBox;
/**
 * Translate a box by an offset in the x- and y- directions.
 *
 * @param box the box to translate
 * @param tx the amount to translate in the x direction
 * @param ty the amount to translate in the y direction
 * @param out
 */
declare function boxTranslate(box: IBox, tx: number, ty: number, out?: IBox): IBox;
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
declare function boxUnion(a: IBox, b: IBox, out?: IBox): IBox;
declare function _box(minX: number, minY: number, maxX: number, maxY: number): IBox;
/**
 * Creates a new IntersectionResult object in memory, with all values initialized to `false` and `NaN`.
 * This is useful to hold the result of math2d function calls in performance
 * critical workflows.
 */
declare function intersectionResultAlloc(): IIntersectionResult;
/**
 * Copies the values from the given intersection into a new intersection object.
 * @param intersection
 * @param out
 */
declare function intersectionResultClone(intersection: IIntersectionResult, out?: IIntersectionResult): IIntersectionResult;
/**
 * Construct a new intersection given `exists`, `x`, `y`, `t0`, and `t1` values.
 *
 * @param exists whether an intersection was found. If `false`, the other passed values should be `NaN`
 * @param x the x-coordinate of the intersection, if an intersection point was found.
 * @param y the y-coordinate of the intersection, if an intersection point was found.
 * @param t0 the parameterization of the intersection along the first shape's geometry,
 *  if an intersection point was found.
 * @param t1 the parameterization of the intersection along the second shape's geometry,
 *  if an intersection point was found.
 * @param out
 */
declare function intersectionResultReset(exists: boolean, x: number, y: number, t0: number, t1: number, out?: IIntersectionResult): IIntersectionResult;
/**
 * Creates a new mat2d object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `mat2dAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = mat2dAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `mat2dInvert()`.
 *    // This avoids a heap allocation.
 *    const result = mat2dInvert(existingObj.transform, TMP0);
 *  }
 */
declare function mat2dAlloc(): IMat2d;
/**
 * Copies the values from the given matrix into a new matrix.
 *
 * @param mat the matrix to copy
 * @param out
 */
declare function mat2dClone(mat: IMat2d, out?: IMat2d): IMat2d;
/**
 * Computes the determinant of the affine matrix
 *
 * The determinant in 2D space is given by `a * d - b * c`.
 *
 * @param mat matrix to take determinant of
 */
declare function mat2dDeterminant(mat: IMat2d): number;
/**
 * Computes the affine transform corresponding to a given rotation, in radians
 *
 * Calculates the matrix that would yield a rotation of `theta` radians around the origin.
 * The rotation is from the `x+` to `y+` direction, which is _counter-clockwise_ in the
 * standard Cartesian coordinate system or _clockwise_ in most standard graphics
 * coordinate systems, as in Canvas and the DOM.
 *
 * @param theta angle in radians to create rotation for
 * @param out
 * __see {@link mat2dFromTranslation}
 * __see {@link mat2dRotate}
 * __see {@link mat2dReset}
 */
declare function mat2dFromRotation(theta: number, out?: IMat2d): IMat2d;
/**
 * Computes the affine transform corresponding to a given (tx, ty) translation
 *
 * @param tx the x translation component
 * @param ty the y translation component
 * @param out
 * __see {@link mat2dFromRotation}
 * __see {@link mat2dTranslate}
 * __see {@link mat2dReset}
 */
declare function mat2dFromTranslation(tx: number, ty: number, out?: IMat2d): IMat2d;
/**
 * Returns the identity affine matrix, `[1 0 0 1 0 0]`
 *
 * @param out
 */
declare function mat2dIdentity(out?: IMat2d): IMat2d;
/**
 * Computes the inverse of the given 2d affine matrix
 *
 * @param mat the matrix to invert
 * @param out
 */
declare function mat2dInvert(mat: IMat2d, out?: IMat2d): IMat2d;
/**
 * Returns whether the matrix is an orthogonal matrix.
 *
 * An orthogonal matrix is defined as one whose rows and columns are orthogonal unit vectors.
 * (For a 2d affine matrix, this is constrained to its first 2x2 submatrix, i.e. excluding the translation.)
 *
 * This is a useful property for a matrix because it means the transform preserves lengths and angles,
 * so in particular it preserves normals.
 *
 * @param mat the matrix to check for orthogonality
 * __see {@link mat2dIsTranslationOnly}
 */
declare function mat2dIsOrthogonal(mat: IMat2d): boolean;
/**
 * Returns whether the matrix corresponds to only a translation.
 *
 * Affine translation matrices have the form
 *
 * ```
 * ⎡1 0 tx⎤
 * ⎣0 1 ty⎦
 * ```
 *
 * @param mat the matrix to inspect
 * __see {@link mat2dIsOrthogonal}
 */
declare function mat2dIsTranslationOnly(mat: IMat2d): boolean;
/**
 * Computes the result of affine matrix multiplication _m1_ × _m2_.
 *
 * The resulting matrix is equivalent to a transform that first applies _m2_ and then applies
 * _m1_; that is, `(m1×m2)v = m1(m2×v)`.
 *
 * Affine matrix multiplication is defined by
 *
 * ```
 * ⎡m1.a m1.c m1.e⎤ ⎡m2.a m2.c m2.e⎤   ⎡r.a r.c r.e⎤
 * ⎢m1.b m1.d m1.f⎥ ⎢m2.b m2.d m2.f⎥ = ⎢r.b r.d r.f⎥
 * ⎣   0    0    1⎦ ⎣   0    0    1⎦   ⎣  0   0   1⎦
 * ```
 *
 * where:
 *  - `r.a = m1.a * m2.a + m1.c * m2.b`
 *  - `r.b = m1.b * m2.a + m1.d * m2.b`
 *  - `r.c = m1.a * m2.c + m1.c * m2.d`
 *  - `r.d = m1.b * m2.c + m1.d * m2.d`
 *  - `r.e = m1.a * m2.e + m1.c * m2.f + m1.e`
 *  - `r.f = m1.b * m2.e + m1.c * m2.f + m1.f`
 *
 * @param m1 the first matrix to multiply
 * @param m2 the second matrix to multiply
 * @param out
 * __see {@link IMatrix}
 * __see {@link vecTransformBy}
 */
declare function mat2dMulMat2d(m1: IMat2d, m2: IMat2d, out?: IMat2d): IMat2d;
/**
 * Construct a new matrix given component values.
 *
 * The resulting matrix will have the shape
 *
 * ```
 * ⎡a c e⎤
 * ⎣b d f⎦
 * ```
 *
 * @param a col 1, row 1 component, usually called `m11` in a 4x4 graphics matrix
 * @param b col 1, row 2 component, usually called `m12` in a 4x4 graphics matrix
 * @param c col 2, row 1 component, usually called `m21` in a 4x4 graphics matrix
 * @param d col 2, row 2 component, usually called `m22` in a 4x4 graphics matrix
 * @param e col 3, row 1 component, usually called `tx` or `m41` in a 4x4 graphics matrix
 * @param f col 3, row 2 component, usually called `ty` or `m42` in a 4x4 graphics matrix
 * @param out
 * __see {@link Imat2d}
 * __see {@link mat2dAlloc}
 * __see {@link mat2dClone}
 */
declare function mat2dReset(a: number, b: number, c: number, d: number, e: number, f: number, out?: IMat2d): IMat2d;
/**
 * Applies a rotation in radians to the given matrix, returning the result.
 *
 * This is equivalent to _left_-multiplying the matrix by a rotation transform; that is,
 * the result of this function is equivalent to a transform that first applies the matrix _mat_
 * and then rotates according to the angle _theta_.
 *
 * The rotation is from the `x+` to `y+` direction, which is _counter-clockwise_ in the
 * standard Cartesian coordinate system or _clockwise_ in most standard graphics
 * coordinate systems, as in Canvas and the DOM.
 *
 * @param mat the matrix to transform
 * @param theta rotation angle in radians to apply on top of the given matrix
 * @param out
 * __see {@link mat2dFromRotation}
 * __see {@link mat2dMulMat2d}
 */
declare function mat2dRotate(mat: IMat2d, theta: number, out?: IMat2d): IMat2d;
/**
 * Applies a scaling transform on top of the given affine matrix, returning the result.
 *
 * Multiplies all components of the matrix by a given scalar value.
 *
 * This is equivalent to _left_-multiplying the matrix by a scaling transform; that is,
 * the result of this function is equivalent to a transform that first applies the matrix _mat_
 * and then scales in both the x- and y-directions according to _scale_.
 *
 * @param mat the matrix to transform
 * @param theta rotation angle in radians to apply on top of the given matrix
 * @param out
 * __see {@link mat2dMulMat2d}
 */
declare function mat2dScale(mat: IMat2d, scale: number, out?: IMat2d): IMat2d;
/**
 * Applies a translation on top of the given matrix, returning the result.
 *
 * This is equivalent to _left_-multiplying the matrix by a translation transform; that is,
 * the result of this function is equivalent to a transform that first applies the matrix _mat_
 * and then translates according to (+tx, +ty).
 *
 * @param mat the matrix to transform
 * @param tx x-component of the translation to apply
 * @param ty y-component of the translation to apply
 * @param out
 * __see {@link mat2dFromTranslation}
 * __see {@link mat2dMulMat2d}
 */
declare function mat2dTranslate(mat: IMat2d, tx: number, ty: number, out?: IMat2d): IMat2d;
declare function _mat2d(a: number, b: number, c: number, d: number, e: number, f: number): IMat2d;
/**
 * Creates a new NearestPointResult object in memory, with all values initialized to `NaN`.
 * This is useful to hold the result of math2d function calls in performance
 * critical workflows.
 */
declare function nearestPointResultAlloc(): INearestPointResult;
/**
 * Copies the values from the given NearestPointResult into a new NearestPointResult object.
 *
 * @param nearestPointResult
 * @param out
 */
declare function nearestPointResultClone(nearestPointResult: INearestPointResult, out?: INearestPointResult): INearestPointResult;
/**
 * Construct a new intersection given `exists`, `x`, `y`, `t0`, and `t1` values.
 *
 * @param exists whether an intersection was found. If `false`, the other passed values should be `NaN`
 * @param x the x-coordinate of the intersection, if an intersection point was found.
 * @param y the y-coordinate of the intersection, if an intersection point was found.
 * @param t0 the parameterization of the intersection along the first shape's geometry,
 *  if an intersection point was found.
 * @param t1 the parameterization of the intersection along the second shape's geometry,
 *  if an intersection point was found.
 * @param out
 */
declare function nearestPointResultReset(x: number, y: number, t: number, distanceValue: number, out?: INearestPointResult): INearestPointResult;
/**
 * Creates a new Ray object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `rayAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = rayAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `rayLookAt()`.
 *    // This avoids a heap allocation.
 *    const result = rayLookAt(existingObj.source, existingObj.target, TMP0);
 *  }
 */
declare function rayAlloc(): IRay;
/**
 * Copies the values from the given ray into a new ray.
 *
 * @param ray source ray from which values should be copied
 * @param out
 */
declare function rayClone(ray: IRay, out?: IRay): IRay;
/**
 * Determines if the point is on the ray
 *
 * This function tests whether the point lies along the ray's geometry,
 * using allowed error _ε_ = 1e-8. The point must lie on the positive side
 *  of the ray (_t_ >= 0).
 *
 * @param ray the ray to inspect
 * @param vec point to be checked
 * __see {@link lineContainsPoint}
 * __see {@link lineWhichSide}
 */
declare function rayContainsPoint(ray: IRay, vec: IVec): boolean;
/**
 * Gets a point along the ray, parameterized according to distance along its
 * direction vector.
 *
 * Retrieves a point on the ray's geometry according to moving distance _t_
 * along the direction vector from its initial point. This function does allow
 * negative values of _t_, returning points in the direction "behind" the ray.
 *
 * Synonymous to {@link lineGetPointAt}.
 *
 * @param ray the ray to inspect
 * @param t distance along the ray at which to compute point
 * @param out
 * __see {@link IRay}
 */
declare function rayGetPointAtT(ray: IRay, t: number, out?: IVec): IVec;
/**
 * Computes all locations at which a ray crosses a given polyline.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the ray's geometry
 * according to {@link IRay} parameterization:
 * _t0_ ≥ 0, corresponds to travel of distance _t0_ along the ray's direction vector. (See {@link rayGetPointAt}.)
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would hit the intersections if one were to start from the ray's initial point and
 * shoot along its direction vector.
 *
 * Almost equivalent to {@link polylineIntersectRay}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the ray's geometry.
 *
 * @param poly
 * @param ray
 * __see {@link IIntersectionResult}
 * __see {@link IPolyline}
 * __see {@link lineIntersectPolyline}
 * __see {@link polylineIntersectSegment}
 */
declare function rayIntersectPolyline(ray: IRay, poly: IPolyline): IIntersectionResult[];
/**
 * Computes the intersection point between the two rays, if it exists.
 *
 * Finds the location at which the two rays meet. If the rays point away or "miss" each other,
 * or they are parallel, this function returns no intersection.
 *
 * The returned value is an {@link IIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the first ray's geometry the intersection was found,
 *      according to the ray's parameterization
 * - `t1` – where along the second ray's geometry the intersection was found,
 *      according to the ray's parameterization
 *
 * @param a the first ray to intersect
 * @param b the second ray to intersect
 * @param out
 */
declare function rayIntersectRay(a: IRay, b: IRay, out?: IIntersectionResult): IIntersectionResult;
/**
 * Computes the intersection point between the ray and the segment, if it exists.
 *
 * Finds the location at which the ray and segment meet. If the ray "misses" the segment,
 * this function returns no intersection. For edge cases where the ray completely overlaps the segment,
 * or starts within the segment, this function returns the _first_ point that the intersection occurs,
 * according to the ray's parameterization.
 *
 * The returned value is an {@link IIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the ray's geometry the intersection was found,
 *      according to the ray's parameterization
 * - `t1` – where along the segment's geometry the intersection was found,
 *      according to the segment's parameterization
 *
 * Almost equivalent to {@link segmentIntersectRay}, except the _t0_ and _t1_ values are reversed.
 *
 * @param ray the ray to intersect
 * @param segment the segment to intersect
 * @param out
 */
declare function rayIntersectSegment(ray: IRay, segment: ISegment, out?: IIntersectionResult): IIntersectionResult;
/**
 * Constructs a ray from an initial point, pointing in the direction of a target point.
 *
 * This function initializes a ray with a given `from` initial point, and with a direction vector
 * that goes through the target `to` point. The direction vector will be normalized even if `from`
 * and `to` are not one unit apart.
 *
 * If `from` and `to` are the same point, the returned vector will still have the `from` initial
 * point but its direction vector will be (NaN, NaN).
 *
 * @param from initial point of the ray
 * @param to point that the ray should go through
 * @param out
 */
declare function rayLookAt(from: IVec, to: IVec, out?: IRay): IRay;
/**
 * Determines the closest the ray comes to a given reference point
 *
 * If the point lies on the positive side of the ray (_t_ ≥ 0), this function
 * finds the projection of the point onto the ray's geometry.
 * If the point lies on the negative side of the ray (_t_ < 0),
 * this function returns the ray's initial point.
 *
 * This function returns the squared distance in the result's `distanceValue`.
 * This is preferred over returning the (non-squared) distance because points
 * behind the ray need to measure distance to the ray's initial point, which would otherwise involve a square root.
 * If you know the point lies in front of the ray, and want to measure the distance while avoiding a square
 * root, prefer {@link lineNearestDistanceToPoint}. To determine which side of the ray a point lies on,
 * see {@link lineProjectPoint}.
 *
 * @param ray the ray to inspect
 * @param point the reference point to project onto the ray
 * @param out
 * __see {@link lineProjectPoint}
 * __see {@link lineNearestDistanceToPoint}
 */
declare function rayNearestDistanceSqToPoint(ray: IRay, point: IVec, out?: INearestPointResult): INearestPointResult;
/**
 * Construct a new ray given an (x0, y0) initial point and (dirX, dirY) direction vector.
 *
 * This function creates a new ray from given values. The (dirX, dirY) values given should
 * describe a unit vector: no checks or operations are done internally to guarantee that is so.
 *
 * @param x0 x-coordinate of the ray's initial point
 * @param y0 y-coordinate of the ray's initial point
 * @param dirX x-coordinate of the ray's direction vector, which should form a unit vector
 *  along with the provided `dirY`
 * @param dirY y-coordinate of the ray's direction vector, which should form a unit vector
 *  along with the provided `dirX`
 * @param out
 * __see {@link IRay}
 * __see {@link rayAlloc}
 * __see {@link rayClone}
 */
declare function rayReset(x0: number, y0: number, dirX: number, dirY: number, out?: IRay): IRay;
/**
 * Transforms a ray by an affine matrix.
 *
 * This function computes the result of applying a transform to the ray's geometry.
 * The resulting initial point will be the result of applying the given transform to the original
 * initial point, and its direction will be the result of applying any rotations or shears from
 * the matrix. The resulting direction vector will be correctly normalized when applicable.
 *
 * Affine transformations and their specifics within Math2d are described in more detail
 * in the {@link vecTransformBy} docs.
 *
 * Synonymous to {@link lineTransformBy}.
 *
 * @param ray the ray to transform
 * @param mat the affine transform to apply
 * @param out
 * __see {@link vecTransformBy}
 * __see {@link Imat2d}
 */
declare function rayTransformBy(ray: IRay, mat: IMat2d, out?: IRay): IRay;
declare function _ray(x0: number, y0: number, dirX: number, dirY: number): IRay;
/**
 * Creates a new Segment object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `segmentAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = segmentAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `polygonGetSideSegment()`.
 *    // This avoids a heap allocation.
 *    const result = polygonGetSideSegment(existingObj.geometry, 0, TMP0);
 *  }
 */
declare function segmentAlloc(): ISegment;
/**
 * Retrieves the starting endpoint (_t_ = 0) of the segment, as a vector.
 *
 * @param segment segment to inspect
 * @param out
 */
declare function segmentGetEndpoint0(segment: ISegment, out?: IVec): IVec;
/**
 * Retrives the ending endpoint (_t_ = 1) of the segment, as a vector.
 *
 * @param segment segment to inspect
 * @param out
 */
declare function segmentGetEndpoint1(segment: ISegment, out?: IVec): IVec;
/**
 * Computes the length of the line segment
 *
 * This is simply `√((x1 - x0)² + (y1 - y0)²)`.
 *
 * @param segment segment to measure
 * __see {@link segmentGetLengthSq}
 * __see {@link vecDistance}
 */
declare function segmentGetLength(segment: ISegment): number;
/**
 * Computes the squared length of the line segment
 *
 * This is simply `(x1 - x0)² + (y1 - y0)²`.
 *
 * @param segment segment to measure
 * __see {@link segmentGetLength}
 * __see {@link vecDistanceSq}
 */
declare function segmentGetLengthSq(segment: ISegment): number;
/**
 * Gets a point along the line segment, parameterized according to linear interpolation
 * between its endpoints.
 *
 * A segment is parameterized according to linear interpolation between its endpoints,
 * where _t_ = 0 represents its starting vertex and _t_ = 1 its ending vertex.
 * Smooth values of _t_ within that range will move along the segment, so for example
 * _t_ = 0.5 is its midpoint.
 *
 * This function does allow for _t_ values outside the range `[0, 1]`, which will return
 * points in the same direction as the segment but outside in either direction.
 *
 * @param segment the segment to inspect
 * @param t linear ratio along the segment to return
 * @param out
 * __see {@link ISegment}
 * __see {@link vecLerp}
 */
declare function segmentGetPointAtT(segment: ISegment, t: number, out?: IVec): IVec;
/**
 * Computes all locations at which a line segment meets a given polyline.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the segment's geometry
 * according to {@link ISegment} parameterization:
 * linear interpolation between its endpoints where _t0_ = 0 represents its starting vertex
 * and _t0_ = 1 its ending vertex.
 * Smooth values of _t_ within that range will move along the segment, so for example
 * _t0_ = 0.5 is its midpoint.
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would visit those locations if one were to travel from the line segment's starting
 * vertex to its ending vertex.
 *
 * Almost equivalent to {@link polylineIntersectSegment}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the segment's geometry.
 *
 * @param segment the segment to intersect
 * @param poly the polyline to find intersections with
 * __see {@link IIntersectionResult}
 * __see {@link ISegment}
 * __see {@link polylineIntersectSegment}
 * __see {@link segmentIntersectRay}
 * __see {@link segmentIntersectSegment}
 */
declare function segmentIntersectPolyline(segment: ISegment, poly: IPolyline): IIntersectionResult[];
/**
 * Computes the intersection point between the ray and the segment, if it exists.
 *
 * Finds the location at which the ray and segment meet. If the ray "misses" the segment,
 * this function returns no intersection. For edge cases where the ray completely overlaps the segment,
 * or starts within the segment, this function returns the _first_ point that the intersection occurs,
 * according to the segment's parameterization.
 *
 * The returned value is an {@link IIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the segment's geometry the intersection was found,
 *      according to the segment's parameterization
 * - `t1` – where along the ray's geometry the intersection was found,
 *      according to the ray's parameterization
 *
 * Almost equivalent to {@link rayIntersectSegment}, except the _t0_ and _t1_ values are reversed.
 *
 * @param segment the segment to intersect
 * @param ray the ray to find intersection with
 * @param out
 * __see {@link IIntersectionResult}
 * __see {@link ISegment}
 * __see {@link segmentIntersectPolyline}
 * __see {@link segmentIntersectSegment}
 */
declare function segmentIntersectRay(segment: ISegment, ray: IRay, out?: IIntersectionResult): IIntersectionResult;
/**
 * Computes the intersection point between the two line segments, if it exists.
 *
 * Finds the location at which the two segments meet. If the two segments "miss" each other,
 * this function returns no intersection. If the two segments overlap along an entire interval
 * (i.e. they are parallel and lie partly on top of each other), this function returns the first
 * point they have in common, according to the first segment's parameterization.
 *
 * The returned value is an {@link IIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the first segment's geometry the intersection was found,
 *      according to the first segment's parameterization
 * - `t1` – where along the second segment's geometry the intersection was found,
 *      according to the second segment's parameterization
 *
 * @param a the first segment to intersect
 * @param b the second segment to find intersections with
 * @param out
 * __see {@link IIntersectionResult}
 * __see {@link ISegment}
 * __see {@link segmentIntersectPolyline}
 * __see {@link segmentIntersectRay}
 */
declare function segmentIntersectSegment(a: ISegment, b: ISegment, out?: IIntersectionResult): IIntersectionResult;
/**
 * Finds the closest the segment comes to a given reference point.
 *
 * This function returns the squared euclidean distance in the `distanceValue` field of the result.
 *
 * @param segment segment to inspect
 * @param point point to measure squared distance to
 * @param out
 * __see {@link ISegment}
 * __see {@link INearestPointResult}
 */
declare function segmentNearestDistanceSqToPoint(segment: ISegment, point: IVec, out?: INearestPointResult): INearestPointResult;
/**
 * Construct a new line segment given an (x0, y0) starting vertex and (x1, y1) ending vertex.
 * The two points are allowed to be the same.
 *
 * @param x0 x-coordinate of the segment's starting vertex
 * @param y0 y-coordinate of the segment's starting vertex
 * @param x1 x-coordinate of the segment's ending vertex
 * @param y1 y-coordinate of the segment's ending vertex
 * @param out
 * __see {@link ISegment}
 * __see {@link segmentAlloc}
 * __see {@link segmentClone}
 */
declare function segmentReset(x0: number, y0: number, x1: number, y1: number, out?: ISegment): ISegment;
/**
 * Computes the reverse of the segment, i.e. swapping its starting vertex and ending vertex.
 *
 * @param segment the segment to reverse
 * @param out
 */
declare function segmentReverse(segment: ISegment, out?: ISegment): ISegment;
declare function _segment(x0: number, y0: number, x1: number, y1: number): ISegment;
/**
 * Computes the result of adding the two given vectors.
 *
 * @param a
 * @param b
 * @param out
 * __see {@link vecSubtract}
 * __see {@link vecScale}
 */
declare function vecAdd(a: IVec, b: IVec, out?: IVec): IVec;
/**
 * Creates a new Vec object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `vecAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = vecAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `vecNormalize()`.
 *    // This avoids a heap allocation.
 *    const result = vecNormalize(existingObj.velocity, TMP0);
 *  }
 */
declare function vecAlloc(): IVec;
/**
 * Copies the values from the given vector into a new vector.
 *
 * @param vec the vector to copy
 * @param out
 */
declare function vecClone(vec: IVec, out?: IVec): IVec;
/**
 * Computes the two-dimensional cross product of the two vectors.
 *
 * The two-dimensional cross product is defined to be the scalar value:
 *
 * ```
 * u × v = u.x * v.y - u.y * v.x
 * ```
 *
 * Note that the cross product is antisymmetric, i.e. `u × v = -v × u`.
 *
 * @param u the first vector
 * @param v the vector to cross with the first
 * __see {@link vecDot}
 */
declare function vecCross(u: IVec, v: IVec): number;
/**
 * Computes the straight-line (Euclidean) distance between the two points
 *
 * @param u the first point
 * @param v the second point, to which distance should be measured from the first
 * __see {@link vecDistanceSq}
 * __see {@link vecGetLength}
 */
declare function vecDistance(u: IVec, v: IVec): number;
/**
 * Computes the squared straight-line (i.e. Euclidean) distance between the two points
 *
 * @param u the first point
 * @param v the second point to which squared distance should be measured
 * __see {@link vecDistance}
 * __see {@link vecGetLengthSq}
 */
declare function vecDistanceSq(u: IVec, v: IVec): number;
/**
 * Computes the dot product of the two vectors, i.e. `u.x * v.x + u.y * v.y`.
 *
 * @param u the first vector
 * @param v the vector to dot with the first
 * __see {@link vecCross}
 */
declare function vecDot(u: IVec, v: IVec): number;
/**
 * Computes the straight-line length (i.e. Euclidean norm) of the given vector.
 *
 * Equivalent to `√(v.x² + v.y²)`.
 *
 * @param v the vector whose length should be measured
 */
declare function vecGetLength(v: IVec): number;
/**
 * Computes the squared straight-line length (i.e. square of the Euclidean norm) of the given vector.
 *
 * Equivalent to `v.x² + v.y²`.
 *
 * @param v the vector whose squared length should be measured
 */
declare function vecGetLengthSq(v: IVec): number;
/**
 * Performs a linear interpolation between the two vectors. The `r` parameter is allowed to be outside `[0, 1]`.
 *
 * @param u the vector to start interpolation from
 * @param v the vector to end interpolation with
 * @param r the ratio to interpolate the two vectors, with _r_ = 0 returning the first vector `u` and _r_ = 1 returning
 *  the second vector `v`
 * @param out
 */
declare function vecLerp(u: IVec, v: IVec, r: number, out?: IVec): IVec;
/**
 * Normalizes the vector to be length 1. If the given vector is the zero-vector, this method
 * returns `(NaN, NaN)`.
 *
 * @param vec the vector to normalize
 * @param out
 * __see {@link vecGetLength}
 * __see {@link vecGetLengthSq}
 */
declare function vecNormalize(vec: IVec, out?: IVec): IVec;
/**
 * Computes the perp of the given vector, as defined by `vecPerp(a, b) = (-b, a)`.
 * This is equivalent to a counter-clockwise rotation in the standard plane.
 *
 * @param vec the vector whose perp should be calculated
 * @param out
 */
declare function vecPerp(vec: IVec, out?: IVec): IVec;
/**
 * Construct a new vector given an `x` and `y` value.
 *
 * @param x x-coordinate of the vector
 * @param y y-coordinate of the vector
 * @param out
 * __see {@link IVec}
 * __see {@link vecAlloc}
 * __see {@link vecClone}
 */
declare function vecReset(x: number, y: number, out?: IVec): IVec;
/**
 * Scales both coordinates of this vector by a given scalar.
 *
 * @param v the vector to scale
 * @param scalar the value by which the vector's components should be scaled
 * @param out
 * __see {@link vecAdd}
 * __see {@link vecTransformBy}
 */
declare function vecScale(v: IVec, scalar: number, out?: IVec): IVec;
/**
 * Computes `u - v`, i.e. subtracting the second vector from the first.
 *
 * @param u the first vector
 * @param v the second vector
 * @param out
 * __see {@link vecAdd}
 * __see {@link vecScale}
 * __see {@link vecTransformBy}
 */
declare function vecSubtract(u: IVec, v: IVec, out?: IVec): IVec;
/**
 * Multiplies the vector by an affine matrix.
 *
 * This computes a left multiplication of the vector by a matrix, i.e. _M_ × _v_.
 *
 * Per usual linear algebra rules, multiplying the vector `(x, y)` according to an affine matrix
 * `[a b c d e f]` is defined by:
 *
 * ```
 * ⎡a c e⎤ ⎛x⎞   ⎛ax + cy + e⎞
 * ⎢b d f⎥ ⎜y⎟ = ⎜bx + dy + f⎟
 * ⎣0 0 1⎦ ⎝1⎠   ⎝     1     ⎠
 * ```
 *
 * @param v the vector to transform
 * @param mat the matrix to multiply this vector by
 * @param out
 * __see {@link Imat2d}
 * __see {@link vecAdd}
 */
declare function vecTransformBy(v: IVec, mat: IMat2d, out?: IVec): IVec;
declare function _vec(x: number, y: number): IVec;
export { boxAlloc, boxClone, boxContainsBox, boxContainsPoint, boxEncapsulate, boxEnclosingPoints, boxGetOutCode, boxGrow, boxIntersection, boxIntersectsBox, boxIsEmpty, boxReset, boxScale, boxTransformBy, boxTranslate, boxUnion, _box, IntervalMode, Out, intersectionResultAlloc, intersectionResultClone, intersectionResultReset, mat2dAlloc, mat2dClone, mat2dDeterminant, mat2dFromRotation, mat2dFromTranslation, mat2dIdentity, mat2dInvert, mat2dIsOrthogonal, mat2dIsTranslationOnly, mat2dMulMat2d, mat2dReset, mat2dRotate, mat2dScale, mat2dTranslate, _mat2d, nearestPointResultAlloc, nearestPointResultClone, nearestPointResultReset, rayAlloc, rayClone, rayContainsPoint, rayGetPointAtT, rayIntersectPolyline, rayIntersectRay, rayIntersectSegment, rayLookAt, rayNearestDistanceSqToPoint, rayReset, rayTransformBy, _ray, segmentAlloc, segmentGetEndpoint0, segmentGetEndpoint1, segmentGetLength, segmentGetLengthSq, segmentGetPointAtT, segmentIntersectPolyline, segmentIntersectRay, segmentIntersectSegment, segmentNearestDistanceSqToPoint, segmentReset, segmentReverse, _segment, IBox, IIntersectionResult, IMat2d, IPolyline, IRay, ISegment, IVec, vecAdd, vecAlloc, vecClone, vecCross, vecDistance, vecDistanceSq, vecDot, vecGetLength, vecGetLengthSq, vecLerp, vecNormalize, vecPerp, vecReset, vecScale, vecSubtract, vecTransformBy, _vec };
