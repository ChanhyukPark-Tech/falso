import {
  fake,
  FakeOptions,
  getRandomInRange,
  RandomInRangeOptions,
} from './core/core';

export interface RandomFloatOptions extends RandomInRangeOptions, FakeOptions {}

/**
 * Generate a random float.
 *
 * @category general, math
 *
 * @example
 *
 * randFloat()
 *
 * @example
 *
 * randFloat({ length: 10 })
 *
 * @example
 *
 * randFloat({ min: 10, max: 20, fraction: 1 }) // 12.5
 *
 * @example
 *
 * randFloat({ min: 10, max: 20, fraction: 2 }) // 12.52
 */
export function randFloat<Options extends RandomFloatOptions = never>(
  options?: Options
) {
  const o: RandomFloatOptions = {
    ...options,
    fraction: options?.fraction ?? 2,
  };

  function factory(): number {
    const result = getRandomInRange(o);
    const stringfiedResult = String(result);

    if (
      stringfiedResult.includes('.') &&
      stringfiedResult.split('.')[1].length === o.fraction
    ) {
      return result;
    } else {
      return factory();
    }
  }

  return fake(factory, options);
}
