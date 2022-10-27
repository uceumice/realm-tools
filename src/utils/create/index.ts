import { EJSON, RealmFunction } from '@realm-fun/types';
import { isFunction, isUndefined } from 'lodash';
import {
  Configuration,
  Func,
} from '../../types/create';

/**
 * TODO improve return types for case if Throw configuration is selected to false (previously no success, need help!)
 */

/**
 *
 * @param configuration Configuration
 * @param func Func
 * @returns RealmFunction<Args, Rtrn | { success: false; error: string }>
 */

export const crf = <
  Args extends EJSON[] = [],
  Rtrn extends EJSON | void = void
>(
  configuration: Configuration<Args>,
  func: Func<Args, Rtrn>
): RealmFunction<Args, Promise<Rtrn | { success: false; error: string }>> => {
  // [1] read configuration options
  const isThrowable = (
    isUndefined(configuration?.execution?.throw) ? true : (configuration?.execution?.throw as boolean)
  );

  // [2] create returned realm function
  return async (args: Args) => {
    // [1] catch all errors
    try {
      // [1] validate function arguments
      if (isFunction(configuration?.arguments?.validate)) {
        configuration?.arguments?.validate(args);
      }

      // [2] execute provided function
      const execution = await func(args);

      return execution;
    } catch (error) {
      if (isThrowable) {
        throw error;
      } else {
        return {
          success: false,
          error: String(error)
        };
      }
    }
  };
};
