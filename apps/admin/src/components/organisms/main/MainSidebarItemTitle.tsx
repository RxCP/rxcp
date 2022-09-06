import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { text: string, className?: string };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const MainSidebarItemTitle: ParentComponent = ({ text, className }) => {
  return (
    <li>
      <span class={`${className} block dark:text-gray-500 py-2 px-4 uppercase text-xs`}>
        {text}
      </span>
    </li>
  );
};
