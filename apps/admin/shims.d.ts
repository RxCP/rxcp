import type {
  AttributifyAttributes,
  AttributifyNames,
} from "@unocss/preset-attributify";

type Prefix = "un:";

declare module "solid-js" {
  namespace JSX {
    interface HTMLAttributes<T>
      extends Partial<Record<AttributifyNames<Prefix>, string>> {}
  }
  namespace astroHTML.JSX {
    interface HTMLAttributes
      extends Partial<Record<AttributifyNames<Prefix>, string>> {}
  }
}
