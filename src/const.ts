// tslint:disable:no-bitwise

/**
 * Sentinel values for the result of {@link boxGetOutCode}. The result of that
 * function may be a bitwise union (`|`) of these enum members.
 */
export const enum Out {
  /**
   * Sentinel value for the result of {@link boxGetOutCode} to represent that
   * the point was outside the min-X edge of the box.
   */
  MIN_X = 1 << 0,

  /**
   * Sentinel value for the result of {@link boxGetOutCode} to represent that
   * the point was outside the max-X edge of the box.
   */
  MIN_Y = 1 << 1,

  /**
   * Sentinel value for the result of {@link boxGetOutCode} to represent that
   * the point was outside the min-Y edge of the box.
   */
  MAX_X = 1 << 2,

  /**
   * Sentinel value for the result of {@link boxGetOutCode} to represent that
   * the point was outside the max-Y edge of the box.
   */
  MAX_Y = 1 << 3,
}

export const enum IntervalMode {
  OPEN = 0,
  CLOSED = 1,
  OPEN_ABOVE = 2,
}
