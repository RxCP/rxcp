import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const Main: ParentComponent = ({ children }) => {
  return (
    <main class="basis-0 flex-grow-[999] min-h-lg">
      {children}
    </main>
  );
};
