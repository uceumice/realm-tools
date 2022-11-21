import type { EJSON, RuleExpression } from "@realm.w/types"

export type AccurateReturn<Res extends EJSON | null> =
  | {
    success: true;
    result: Res;
  }
  | {
    success: false;
    error: string;
  };

export interface Configuration<
  Args extends unknown[] | unknown = unknown
> {
  arguments?: {
    validate?(args: Args): void;
    log?: boolean;
  };
  execution?: {
    throw?: boolean;
    private?: boolean;
    condition?: RuleExpression;
    authorization?: 'system' | string | undefined;
  };
}

export type Func<
  Args extends EJSON[],
  Rtrn extends EJSON | void
> = (args: Args) => Promise<Rtrn>;