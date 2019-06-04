// tslint:disable:no-bitwise
/**
 * Sentinel value for the result of {@link boxComputeOutCode} to represent that
 * the point was outside the min-X edge of the box.
 */
export const OUT_MIN_X = 1;

/**
 * Sentinel value for the result of {@link boxComputeOutCode} to represent that
 * the point was outside the max-X edge of the box.
 */
export const OUT_MAX_X = 2;

/**
 * Sentinel value for the result of {@link boxComputeOutCode} to represent that
 * the point was outside the min-Y edge of the box.
 */
export const OUT_MIN_Y = 4;

/**
 * Sentinel value for the result of {@link boxComputeOutCode} to represent that
 * the point was outside the max-Y edge of the box.
 */
export const OUT_MAX_Y = 8;
// tslint:enable:no-bitwise
