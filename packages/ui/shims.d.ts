import type { AttributifyNames } from '@unocss/preset-attributify';

type Prefix = 'un-';

declare global {
  namespace svelte.JSX {
    interface HTMLAttributes<T>
      extends Partial<Record<AttributifyNames<Prefix>, string>> {}
  }
}