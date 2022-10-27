import type { EJSON, RuleExpression } from "@realm-fun/types"

export type AccurateReturn<Res extends EJSON> =
  | {
    success: true;
    result: Res | null;
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
  Args extends unknown[],
  Rtrn extends EJSON | void
> = (args: Args) => Promise<Rtrn>;

export type FuncArgs<
  Args extends unknown[] | unknown
> = {
  args: Args;
};