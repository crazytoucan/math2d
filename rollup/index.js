class Box {
    constructor() {
        this.minX = NaN;
        this.minY = NaN;
        this.maxX = NaN;
        this.maxY = NaN;
    }
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
function boxAlloc() {
    return new Box();
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
function boxReset(minX, minY, maxX, maxY, out = boxAlloc()) {
    out.minX = minX;
    out.minY = minY;
    out.maxX = maxX;
    out.maxY = maxY;
    return out;
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
function boxClone(box, out = boxAlloc()) {
    return boxReset(box.minX, box.minY, box.maxX, box.maxY, out);
}

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
function boxContainsBox(a, b) {
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
function boxContainsPoint(box, point, mode) {
    switch (mode) {
        case 0 /* OPEN */:
            return point.x > box.minX && point.y > box.minY && point.x < box.maxX && point.y < box.maxY;
        case 1 /* CLOSED */:
            return point.x >= box.minX && point.y >= box.minY && point.x <= box.maxX && point.y <= box.maxY;
        case 2 /* OPEN_ABOVE */:
            return point.x >= box.minX && point.y >= box.minY && point.x < box.maxX && point.y < box.maxY;
    }
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
function boxEncapsulate(box, point, out = boxAlloc()) {
    return boxReset(Math.min(box.minX, point.x), Math.min(box.minY, point.y), Math.max(box.maxX, point.x), Math.max(box.maxY, point.y), out);
}

/**
 * Computes the smallest bounding box that contains all of the provided points.
 *
 * If the provided array is empty, this method returns a box with `minX` and
 * `minY` set to `Infinity` and `maxX` and `maxY` set to `-Infinity`.
 *
 * @param points the points to contain
 * @param out
 */
function boxEnclosingPoints(points, out = boxAlloc()) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const point of points) {
        if (point.x < minX) {
            minX = point.x;
        }
        if (point.y < minY) {
            minY = point.y;
        }
        if (point.x > maxX) {
            maxX = point.x;
        }
        if (point.y > maxY) {
            maxY = point.y;
        }
    }
    return boxReset(minX, minY, maxX, maxY, out);
}

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
function boxGetOutCode(box, point) {
    let out = 0;
    if (point.x < box.minX) {
        out |= 1 /* MIN_X */;
    }
    else if (point.x > box.maxX) {
        out |= 4 /* MAX_X */;
    }
    if (point.y < box.minY) {
        out |= 2 /* MIN_Y */;
    }
    else if (point.y > box.maxY) {
        out |= 8 /* MAX_Y */;
    }
    return out;
}

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
function boxGrow(box, amount, out = boxAlloc()) {
    return boxReset(box.minX - amount, box.minY - amount, box.maxX + amount, box.maxY + amount, out);
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
 * __see {@link boxUnion}
 */
function boxIntersection(a, b, out = boxAlloc()) {
    return boxReset(Math.max(a.minX, b.minX), Math.max(a.minY, b.minY), Math.min(a.maxX, b.maxX), Math.min(a.maxY, b.maxY), out);
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
 * @param mode whether to include the boundaries of the boxes
 */
function boxIntersectsBox(a, b, mode) {
    switch (mode) {
        case 0 /* OPEN */:
        case 2 /* OPEN_ABOVE */:
            return a.minX < b.maxX && a.minY < b.maxY && a.maxX > b.minX && a.maxY > b.minY;
        case 1 /* CLOSED */:
            return a.minX <= b.maxX && a.minY <= b.maxY && a.maxX >= b.minX && a.maxY >= b.minY;
    }
}

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
function boxIsEmpty(box) {
    // Remark: prefer this comparison over distributing the ! to handle NaNs.
    return !(box.maxX > box.minX && box.maxY > box.minY);
}

/**
 * Scales a box by a fixed scalar in both directions.
 *
 * @param box the box to scale
 * @param scalar the value by which to multiply all of the box's components
 * @param out
 */
function boxScale(box, scalar, out = boxAlloc()) {
    return boxReset(box.minX * scalar, box.minY * scalar, box.maxX * scalar, box.maxY * scalar, out);
}

function _arrayReset() {
    const out = arguments[0];
    const len = arguments.length - 1;
    if (out.length !== len) {
        out.length = len;
    }
    for (let i = 0; i < len; i++) {
        out[i] = arguments[i + 1];
    }
}

class Vec {
    constructor() {
        this.x = NaN;
        this.y = NaN;
    }
}
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
function vecAlloc() {
    return new Vec();
}

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
function vecReset(x, y, out = vecAlloc()) {
    out.x = x;
    out.y = y;
    return out;
}

/**
 * Computes bounding box of polyline's geometry
 *
 * @param poly
 * @param out
 */
function polylineGetBounds(poly, out = boxAlloc()) {
    const tmp0 = vecAlloc();
    boxReset(Infinity, Infinity, -Infinity, -Infinity, out);
    for (let i = 0; i < poly.length; i += 2) {
        const v0 = vecReset(poly[i], poly[i + 1], tmp0);
        boxEncapsulate(out, v0, out);
    }
    return out;
}

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
function vecTransformBy(v, mat, out = vecAlloc()) {
    return vecReset(mat.a * v.x + mat.c * v.y + mat.e, mat.b * v.x + mat.d * v.y + mat.f, out);
}

/**
 * Creates a new Array object in memory to hold Polyline data.
 * Its initial length is 0.
 *
 * Data allocation functions like `polylineAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = polylineAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `polylineTransformBy()`.
 *    // This will avoid a heap allocation if the array doesn't have to be resized.
 *    const result = polylineTransformBy(existingObj.path, existingObj.transform, TMP0);
 *  }
 */
function polylineAlloc() {
    return [];
}

/**
 * Transforms a polyline by an affine matrix.
 *
 * Simply transforms each of the polyline's vertices by the given matrix.
 * Affine transformations and their specifics within Math2d are described in more detail
 * in the {@link vecTransformBy} docs.
 *
 * @param poly polyline to transform
 * @param mat affine transform to apply
 * @param out
 * __see {@link vecTransformBy}
 * __see {@link Imat2d}
 */
function polylineTransformBy(poly, mat, out = polylineAlloc()) {
    const tmp0 = vecAlloc();
    if (out.length !== poly.length) {
        out.length = poly.length;
    }
    for (let i = 0; i < poly.length; i += 2) {
        const v0 = vecReset(poly[i], poly[i + 1], tmp0);
        vecTransformBy(v0, mat, v0);
        out[i] = v0.x;
        out[i + 1] = v0.y;
    }
    return out;
}

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
function boxTransformBy(box, mat, out = boxAlloc()) {
    const tmp = [];
    _arrayReset(tmp, box.minX, box.minY, box.minX, box.maxY, box.maxX, box.maxY, box.maxX, box.minY);
    polylineTransformBy(tmp, mat, tmp);
    return polylineGetBounds(tmp, out);
}

/**
 * Translate a box by an offset in the x- and y- directions.
 *
 * @param box the box to translate
 * @param tx the amount to translate in the x direction
 * @param ty the amount to translate in the y direction
 * @param out
 */
function boxTranslate(box, tx, ty, out = boxAlloc()) {
    return boxReset(box.minX + tx, box.minY + ty, box.maxX + tx, box.maxY + ty, out);
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
function boxUnion(a, b, out = boxAlloc()) {
    return boxReset(Math.min(a.minX, b.minX), Math.min(a.minY, b.minY), Math.max(a.maxX, b.maxX), Math.max(a.maxY, b.maxY), out);
}

function _box(minX, minY, maxX, maxY) {
    const out = boxAlloc();
    out.minX = minX;
    out.minY = minY;
    out.maxX = maxX;
    out.maxY = maxY;
    return out;
}

class IntersectionResult {
    constructor() {
        this.exists = false;
        this.x = NaN;
        this.y = NaN;
        this.t0 = NaN;
        this.t1 = NaN;
    }
}
/**
 * Creates a new IntersectionResult object in memory, with all values initialized to `false` and `NaN`.
 * This is useful to hold the result of math2d function calls in performance
 * critical workflows.
 */
function intersectionResultAlloc() {
    return new IntersectionResult();
}

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
function intersectionResultReset(exists, x, y, t0, t1, out = intersectionResultAlloc()) {
    out.exists = exists;
    out.x = x;
    out.y = y;
    out.t0 = t0;
    out.t1 = t1;
    return out;
}

/**
 * Copies the values from the given intersection into a new intersection object.
 * @param intersection
 * @param out
 */
function intersectionResultClone(intersection, out = intersectionResultAlloc()) {
    return intersectionResultReset(intersection.exists, intersection.x, intersection.y, intersection.t0, intersection.t1, out);
}

class Mat2d {
    constructor() {
        this.a = NaN;
        this.b = NaN;
        this.c = NaN;
        this.d = NaN;
        this.e = NaN;
        this.f = NaN;
    }
}
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
function mat2dAlloc() {
    return new Mat2d();
}

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
function mat2dReset(a, b, c, d, e, f, out = mat2dAlloc()) {
    out.a = a;
    out.b = b;
    out.c = c;
    out.d = d;
    out.e = e;
    out.f = f;
    return out;
}

/**
 * Copies the values from the given matrix into a new matrix.
 *
 * @param mat the matrix to copy
 * @param out
 */
function mat2dClone(mat, out = mat2dAlloc()) {
    return mat2dReset(mat.a, mat.b, mat.c, mat.d, mat.e, mat.f, out);
}

/**
 * Computes the determinant of the affine matrix
 *
 * The determinant in 2D space is given by `a * d - b * c`.
 *
 * @param mat matrix to take determinant of
 */
function mat2dDeterminant(mat) {
    return mat.a * mat.d - mat.b * mat.c;
}

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
function mat2dFromRotation(theta, out = mat2dAlloc()) {
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    return mat2dReset(cos, -sin, sin, cos, 0, 0, out);
}

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
function mat2dFromTranslation(tx, ty, out = mat2dAlloc()) {
    return mat2dReset(1, 0, 0, 1, tx, ty, out);
}

/**
 * Returns the identity affine matrix, `[1 0 0 1 0 0]`
 *
 * @param out
 */
function mat2dIdentity(out = mat2dAlloc()) {
    return mat2dReset(1, 0, 0, 1, 0, 0, out);
}

const EPSILON = 1e-8;
const EPSILON_SQ = 1e-16;

/**
 * Computes the inverse of the given 2d affine matrix
 *
 * @param mat the matrix to invert
 * @param out
 */
function mat2dInvert(mat, out = mat2dAlloc()) {
    const det = mat.a * mat.d - mat.b * mat.c;
    if (det > -EPSILON && det < EPSILON) {
        return mat2dReset(NaN, NaN, NaN, NaN, NaN, NaN, out);
    }
    else {
        const detInverse = 1 / det;
        return mat2dReset(detInverse * mat.d, -detInverse * mat.b, -detInverse * mat.c, detInverse * mat.a, detInverse * (mat.c * mat.f - mat.d * mat.e), detInverse * (mat.b * mat.e - mat.a * mat.f), out);
    }
}

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
function mat2dIsOrthogonal(mat) {
    const d1Sq = mat.a * mat.a + mat.b * mat.b;
    const d2Sq = mat.c * mat.c + mat.d * mat.d;
    const dot = mat.a * mat.c + mat.b * mat.d;
    return Math.abs(d1Sq - 1) < EPSILON_SQ && Math.abs(d2Sq - 1) < EPSILON_SQ && Math.abs(dot) < EPSILON;
}

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
function mat2dIsTranslationOnly(mat) {
    return mat.a === 1 && mat.b === 0 && mat.c === 0 && mat.d === 1;
}

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
function mat2dMulMat2d(m1, m2, out = mat2dAlloc()) {
    const a = m1.a * m2.a + m1.c * m2.b;
    const b = m1.b * m2.a + m1.d * m2.b;
    const c = m1.a * m2.c + m1.c * m2.d;
    const d = m1.b * m2.c + m1.d * m2.d;
    const e = m1.a * m2.e + m1.c * m2.f + m1.e;
    const f = m1.b * m2.e + m1.c * m2.f + m1.f;
    return mat2dReset(a, b, c, d, e, f, out);
}

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
function mat2dRotate(mat, theta, out = mat2dAlloc()) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    return mat2dReset(cos * mat.a - sin * mat.c, cos * mat.b - sin * mat.d, sin * mat.a + cos * mat.c, sin * mat.b + cos * mat.d, mat.e, mat.f, out);
}

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
function mat2dScale(mat, scale, out = mat2dAlloc()) {
    return mat2dReset(scale * mat.a, scale * mat.b, scale * mat.c, scale * mat.d, scale * mat.e, scale * mat.f, out);
}

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
function mat2dTranslate(mat, tx, ty, out = mat2dAlloc()) {
    return mat2dReset(mat.a, mat.b, mat.c, mat.d, mat.e + tx, mat.f + ty, out);
}

function _mat2d(a, b, c, d, e, f) {
    const out = mat2dAlloc();
    out.a = a;
    out.b = b;
    out.c = c;
    out.d = d;
    out.e = e;
    out.f = f;
    return out;
}

class NearestPointResult {
    constructor() {
        this.x = NaN;
        this.y = NaN;
        this.t = NaN;
        this.distanceValue = NaN;
    }
}
/**
 * Creates a new NearestPointResult object in memory, with all values initialized to `NaN`.
 * This is useful to hold the result of math2d function calls in performance
 * critical workflows.
 */
function nearestPointResultAlloc() {
    return new NearestPointResult();
}

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
function nearestPointResultReset(x, y, t, distanceValue, out = nearestPointResultAlloc()) {
    out.x = x;
    out.y = y;
    out.t = t;
    out.distanceValue = distanceValue;
    return out;
}

/**
 * Copies the values from the given NearestPointResult into a new NearestPointResult object.
 *
 * @param nearestPointResult
 * @param out
 */
function nearestPointResultClone(nearestPointResult, out = nearestPointResultAlloc()) {
    return nearestPointResultReset(nearestPointResult.x, nearestPointResult.y, nearestPointResult.t, nearestPointResult.distanceValue, out);
}

class Ray {
    constructor() {
        this.x0 = NaN;
        this.y0 = NaN;
        this.dirX = NaN;
        this.dirY = NaN;
    }
}
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
function rayAlloc() {
    return new Ray();
}

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
function rayReset(x0, y0, dirX, dirY, out = rayAlloc()) {
    out.x0 = x0;
    out.y0 = y0;
    out.dirX = dirX;
    out.dirY = dirY;
    return out;
}

/**
 * Copies the values from the given ray into a new ray.
 *
 * @param ray source ray from which values should be copied
 * @param out
 */
function rayClone(ray, out = rayAlloc()) {
    return rayReset(ray.x0, ray.y0, ray.dirX, ray.dirY, out);
}

function _dot(ray, vec) {
    return ray.dirX * (vec.x - ray.x0) + ray.dirY * (vec.y - ray.y0);
}

function _dotPerp(ray, point) {
    return ray.dirX * (point.y - ray.y0) - ray.dirY * (point.x - ray.x0);
}

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
function rayContainsPoint(ray, vec) {
    const t = _dot(ray, vec);
    if (t < -EPSILON) {
        return false;
    }
    return Math.abs(_dotPerp(ray, vec)) < EPSILON;
}

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
function rayGetPointAtT(ray, t, out = vecAlloc()) {
    return vecReset(ray.x0 + ray.dirX * t, ray.y0 + ray.dirY * t, out);
}

/**
 * Returns the number of individual line segments in this polyline
 *
 * This function computes the number of line segments represented by this polyline,
 * which is always `Math.max(0, poly.length / 2 - 1)`. This function makes no effort to identify and filter
 * "trivial" or "empty" segments that may exist along its path.
 *
 * @param poly
 */
function polylineGetNumSegments(poly) {
    return Math.max(0, poly.length / 2 - 1);
}

class Segment {
    constructor() {
        this.x0 = NaN;
        this.y0 = NaN;
        this.x1 = NaN;
        this.y1 = NaN;
    }
}
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
function segmentAlloc() {
    return new Segment();
}

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
function segmentReset(x0, y0, x1, y1, out = segmentAlloc()) {
    out.x0 = x0;
    out.y0 = y0;
    out.x1 = x1;
    out.y1 = y1;
    return out;
}

/**
 * Returns a polyline's segment by given index, starting at 0.
 *
 * @param poly
 * @param index
 * @param out
 */
function polylineGetSegment(poly, index, out = segmentAlloc()) {
    const l = 2 * index;
    return segmentReset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
}

function _polylineIntersectHelper(poly, value, doIntersectSegment) {
    const tmp0 = segmentAlloc();
    const tmp1 = intersectionResultAlloc();
    const allIntersections = [];
    const numSegments = polylineGetNumSegments(poly);
    // prevent repeated intersections at the same vertex in successive segments
    let lastIntersection = NaN;
    for (let i = 0; i < numSegments; i++) {
        const segment = polylineGetSegment(poly, i, tmp0);
        const out = doIntersectSegment(segment, value, tmp1);
        if (out.exists && lastIntersection !== out.t1) {
            lastIntersection = out.t1;
            allIntersections.push(intersectionResultReset(true, out.x, out.y, i + out.t0, out.t1));
        }
    }
    return allIntersections;
}

function _intersectionSwapTs(out) {
    const tmp = out.t0;
    out.t0 = out.t1;
    out.t1 = tmp;
    return out;
}

function sortByT0Increasing(a, b) {
    return a.t0 < b.t0 ? -1 : a.t0 > b.t0 ? 1 : 0;
}
function _swapAndReorderIntersections(intersections) {
    intersections.forEach(_intersectionSwapTs);
    intersections.sort(sortByT0Increasing);
    return intersections;
}

function _intersectionDNE(out) {
    out.exists = false;
    out.x = out.y = out.t0 = out.t1 = NaN;
    return out;
}

function _lookAt(x0, y0, x1, y1, out = rayAlloc()) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const lenSq = dx * dx + dy * dy;
    if (lenSq < EPSILON_SQ) {
        return rayReset(x0, y0, NaN, NaN, out);
    }
    else {
        const lenInverse = 1 / Math.sqrt(lenSq);
        return rayReset(x0, y0, dx * lenInverse, dy * lenInverse, out);
    }
}

/**
 * Computes the length of the line segment
 *
 * This is simply `√((x1 - x0)² + (y1 - y0)²)`.
 *
 * @param segment segment to measure
 * __see {@link segmentGetLengthSq}
 * __see {@link vecDistance}
 */
function segmentGetLength(segment) {
    const dx = segment.x1 - segment.x0;
    const dy = segment.y1 - segment.y0;
    return Math.sqrt(dx * dx + dy * dy);
}

function _rayTransformByOrtho(ray, mat, out = rayAlloc()) {
    const initial = vecReset(ray.x0, ray.y0);
    vecTransformBy(initial, mat, initial);
    return rayReset(initial.x, initial.y, mat.a * ray.dirX + mat.c * ray.dirY, mat.b * ray.dirX + mat.d * ray.dirY, out);
}

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
function rayIntersectRay(a, b, out = intersectionResultAlloc()) {
    // Transform ray `b` by the same matrix that maps `a` to the x- basis.
    // We then compute the intersection (with the x-axis) in the transformed space.
    // This transform is equivalent to "translate by (-a.x0, -a.y0) then rotate by -a.angle".
    const transform = mat2dReset(a.dirX, -a.dirY, a.dirY, a.dirX, -a.x0 * a.dirX - a.y0 * a.dirY, a.x0 * a.dirY - a.y0 * a.dirX);
    const localB = _rayTransformByOrtho(b, transform);
    const isParallel = Math.abs(localB.dirY) < EPSILON;
    if (isParallel && Math.abs(localB.y0) >= EPSILON) {
        return _intersectionDNE(out);
    }
    if (isParallel) {
        intersectionResultReset(true, a.x0, a.y0, 0, -localB.x0 * localB.dirX, out);
    }
    else {
        const t0 = localB.x0 - (localB.dirX / localB.dirY) * localB.y0;
        const intersectionPoint = rayGetPointAtT(a, t0);
        const t1 = _dot(b, intersectionPoint);
        intersectionResultReset(true, intersectionPoint.x, intersectionPoint.y, t0, t1, out);
    }
    return out.t0 >= 0 && out.t1 >= 0 ? out : _intersectionDNE(out);
}

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
function rayIntersectSegment(ray, segment, out = intersectionResultAlloc()) {
    const segmentRay = _lookAt(segment.x0, segment.y0, segment.x1, segment.y1);
    rayIntersectRay(ray, segmentRay, out);
    if (!out.exists) {
        return out;
    }
    const segmentLength = segmentGetLength(segment);
    if (out.t1 < segmentLength + EPSILON) {
        out.t1 /= segmentLength;
        return out;
    }
    return _intersectionDNE(out);
}

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
function segmentIntersectRay(segment, ray, out = intersectionResultAlloc()) {
    return _intersectionSwapTs(rayIntersectSegment(ray, segment, out));
}

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
function rayIntersectPolyline(ray, poly) {
    return _swapAndReorderIntersections(_polylineIntersectHelper(poly, ray, segmentIntersectRay));
}

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
function rayLookAt(from, to, out = rayAlloc()) {
    return _lookAt(from.x, from.y, to.x, to.y, out);
}

/**
 * Computes the squared straight-line (i.e. Euclidean) distance between the two points
 *
 * @param u the first point
 * @param v the second point to which squared distance should be measured
 * __see {@link vecDistance}
 * __see {@link vecGetLengthSq}
 */
function vecDistanceSq(u, v) {
    const dx = v.x - u.x;
    const dy = v.y - u.y;
    return dx * dx + dy * dy;
}

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
function rayNearestDistanceSqToPoint(ray, point, out = nearestPointResultAlloc()) {
    const t = Math.max(0, _dot(ray, point));
    const closest = rayGetPointAtT(ray, t);
    const distanceSq = vecDistanceSq(closest, point);
    return nearestPointResultReset(closest.x, closest.y, t, distanceSq, out);
}

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
function rayTransformBy(ray, mat, out = rayAlloc()) {
    const p0 = vecReset(ray.x0, ray.y0);
    vecTransformBy(p0, mat, p0);
    const p1 = vecReset(ray.x0 + ray.dirX, ray.y0 + ray.dirY);
    vecTransformBy(p1, mat, p1);
    return _lookAt(p0.x, p0.y, p1.x, p1.y, out);
}

function _ray(x0, y0, dirX, dirY) {
    const out = rayAlloc();
    out.x0 = x0;
    out.y0 = y0;
    out.dirX = dirX;
    out.dirY = dirY;
    return out;
}

/**
 * Retrieves the starting endpoint (_t_ = 0) of the segment, as a vector.
 *
 * @param segment segment to inspect
 * @param out
 */
function segmentGetEndpoint0(segment, out = vecAlloc()) {
    return vecReset(segment.x0, segment.y0, out);
}

/**
 * Retrives the ending endpoint (_t_ = 1) of the segment, as a vector.
 *
 * @param segment segment to inspect
 * @param out
 */
function segmentGetEndpoint1(segment, out = vecAlloc()) {
    return vecReset(segment.x1, segment.y1, out);
}

/**
 * Computes the squared length of the line segment
 *
 * This is simply `(x1 - x0)² + (y1 - y0)²`.
 *
 * @param segment segment to measure
 * __see {@link segmentGetLength}
 * __see {@link vecDistanceSq}
 */
function segmentGetLengthSq(segment) {
    const dx = segment.x1 - segment.x0;
    const dy = segment.y1 - segment.y0;
    return dx * dx + dy * dy;
}

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
function segmentGetPointAtT(segment, t, out = vecAlloc()) {
    return vecReset(segment.x0 * (1 - t) + segment.x1 * t, segment.y0 * (1 - t) + segment.y1 * t, out);
}

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
function segmentIntersectSegment(a, b, out = intersectionResultAlloc()) {
    const aRay = _lookAt(a.x0, a.y0, a.x1, a.y1);
    rayIntersectSegment(aRay, b, out);
    const segmentLength = segmentGetLength(a);
    if (out.exists && out.t0 > -EPSILON && out.t0 < segmentLength + EPSILON) {
        out.t0 /= segmentLength;
        return out;
    }
    else {
        return _intersectionDNE(out);
    }
}

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
function segmentIntersectPolyline(segment, poly) {
    return _swapAndReorderIntersections(_polylineIntersectHelper(poly, segment, segmentIntersectSegment));
}

function _lerp(a, b, r) {
    return a * (1 - r) + b * r;
}

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
function vecCross(u, v) {
    return u.x * v.y - u.y * v.x;
}

/**
 * Computes the dot product of the two vectors, i.e. `u.x * v.x + u.y * v.y`.
 *
 * @param u the first vector
 * @param v the vector to dot with the first
 * __see {@link vecCross}
 */
function vecDot(u, v) {
    return u.x * v.x + u.y * v.y;
}

/**
 * Computes the squared straight-line length (i.e. square of the Euclidean norm) of the given vector.
 *
 * Equivalent to `v.x² + v.y²`.
 *
 * @param v the vector whose squared length should be measured
 */
function vecGetLengthSq(v) {
    return v.x * v.x + v.y * v.y;
}

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
function segmentNearestDistanceSqToPoint(segment, point, out = nearestPointResultAlloc()) {
    const segVector = vecReset(segment.x1 - segment.x0, segment.y1 - segment.y0);
    const pointVector = vecReset(point.x - segment.x0, point.y - segment.y0);
    const segLengthSq = vecGetLengthSq(segVector);
    if (segLengthSq < EPSILON_SQ) {
        return nearestPointResultReset(segment.x0, segment.y0, 0, vecGetLengthSq(pointVector), out);
    }
    const dot = vecDot(pointVector, segVector);
    if (dot < 0) {
        return nearestPointResultReset(segment.x0, segment.y0, 0, vecGetLengthSq(pointVector), out);
    }
    else if (dot > segLengthSq) {
        const dx = point.x - segment.x1;
        const dy = point.y - segment.y1;
        return nearestPointResultReset(segment.x1, segment.y1, 1, dx * dx + dy * dy, out);
    }
    else {
        const perp = vecCross(segVector, pointVector);
        const distanceSq = (perp * perp) / segLengthSq;
        const t = dot / segLengthSq;
        return nearestPointResultReset(_lerp(segment.x0, segment.x1, t), _lerp(segment.y0, segment.y1, t), t, distanceSq, out);
    }
}

/**
 * Computes the reverse of the segment, i.e. swapping its starting vertex and ending vertex.
 *
 * @param segment the segment to reverse
 * @param out
 */
function segmentReverse(segment, out = segmentAlloc()) {
    return segmentReset(segment.x1, segment.y1, segment.x0, segment.y0, out);
}

function _segment(x0, y0, x1, y1) {
    const out = segmentAlloc();
    out.x0 = x0;
    out.y0 = y0;
    out.x1 = x1;
    out.y1 = y1;
    return out;
}

/**
 * Computes the result of adding the two given vectors.
 *
 * @param a
 * @param b
 * @param out
 * __see {@link vecSubtract}
 * __see {@link vecScale}
 */
function vecAdd(a, b, out = vecAlloc()) {
    return vecReset(a.x + b.x, a.y + b.y, out);
}

/**
 * Copies the values from the given vector into a new vector.
 *
 * @param vec the vector to copy
 * @param out
 */
function vecClone(vec, out = vecAlloc()) {
    return vecReset(vec.x, vec.y, out);
}

/**
 * Computes the straight-line (Euclidean) distance between the two points
 *
 * @param u the first point
 * @param v the second point, to which distance should be measured from the first
 * __see {@link vecDistanceSq}
 * __see {@link vecGetLength}
 */
function vecDistance(u, v) {
    const dx = v.x - u.x;
    const dy = v.y - u.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Computes the straight-line length (i.e. Euclidean norm) of the given vector.
 *
 * Equivalent to `√(v.x² + v.y²)`.
 *
 * @param v the vector whose length should be measured
 */
function vecGetLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * Performs a linear interpolation between the two vectors. The `r` parameter is allowed to be outside `[0, 1]`.
 *
 * @param u the vector to start interpolation from
 * @param v the vector to end interpolation with
 * @param r the ratio to interpolate the two vectors, with _r_ = 0 returning the first vector `u` and _r_ = 1 returning
 *  the second vector `v`
 * @param out
 */
function vecLerp(u, v, r, out = vecAlloc()) {
    return vecReset(_lerp(u.x, v.x, r), _lerp(u.y, v.y, r), out);
}

/**
 * Normalizes the vector to be length 1. If the given vector is the zero-vector, this method
 * returns `(NaN, NaN)`.
 *
 * @param vec the vector to normalize
 * @param out
 * __see {@link vecGetLength}
 * __see {@link vecGetLengthSq}
 */
function vecNormalize(vec, out = vecAlloc()) {
    const lenSq = vec.x * vec.x + vec.y * vec.y;
    if (lenSq < EPSILON_SQ) {
        return vecReset(NaN, NaN, out);
    }
    else {
        const lenInverse = 1 / Math.sqrt(lenSq);
        return vecReset(lenInverse * vec.x, lenInverse * vec.y, out);
    }
}

/**
 * Computes the perp of the given vector, as defined by `vecPerp(a, b) = (-b, a)`.
 * This is equivalent to a counter-clockwise rotation in the standard plane.
 *
 * @param vec the vector whose perp should be calculated
 * @param out
 */
function vecPerp(vec, out = vecAlloc()) {
    return vecReset(-vec.y, vec.x, out);
}

/**
 * Scales both coordinates of this vector by a given scalar.
 *
 * @param v the vector to scale
 * @param scalar the value by which the vector's components should be scaled
 * @param out
 * __see {@link vecAdd}
 * __see {@link vecTransformBy}
 */
function vecScale(v, scalar, out = vecAlloc()) {
    return vecReset(v.x * scalar, v.y * scalar, out);
}

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
function vecSubtract(u, v, out = vecAlloc()) {
    return vecReset(u.x - v.x, u.y - v.y, out);
}

function _vec(x, y) {
    const out = vecAlloc();
    out.x = x;
    out.y = y;
    return out;
}

export { _box, _mat2d, _ray, _segment, _vec, boxAlloc, boxClone, boxContainsBox, boxContainsPoint, boxEncapsulate, boxEnclosingPoints, boxGetOutCode, boxGrow, boxIntersection, boxIntersectsBox, boxIsEmpty, boxReset, boxScale, boxTransformBy, boxTranslate, boxUnion, intersectionResultAlloc, intersectionResultClone, intersectionResultReset, mat2dAlloc, mat2dClone, mat2dDeterminant, mat2dFromRotation, mat2dFromTranslation, mat2dIdentity, mat2dInvert, mat2dIsOrthogonal, mat2dIsTranslationOnly, mat2dMulMat2d, mat2dReset, mat2dRotate, mat2dScale, mat2dTranslate, nearestPointResultAlloc, nearestPointResultClone, nearestPointResultReset, rayAlloc, rayClone, rayContainsPoint, rayGetPointAtT, rayIntersectPolyline, rayIntersectRay, rayIntersectSegment, rayLookAt, rayNearestDistanceSqToPoint, rayReset, rayTransformBy, segmentAlloc, segmentGetEndpoint0, segmentGetEndpoint1, segmentGetLength, segmentGetLengthSq, segmentGetPointAtT, segmentIntersectPolyline, segmentIntersectRay, segmentIntersectSegment, segmentNearestDistanceSqToPoint, segmentReset, segmentReverse, vecAdd, vecAlloc, vecClone, vecCross, vecDistance, vecDistanceSq, vecDot, vecGetLength, vecGetLengthSq, vecLerp, vecNormalize, vecPerp, vecReset, vecScale, vecSubtract, vecTransformBy };
