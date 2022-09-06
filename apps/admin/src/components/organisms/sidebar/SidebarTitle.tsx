import type { Component } from "solid-js";

type ParentProps<P = {}> = P & { title?: string, className?: string };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const SidebarTitle: ParentComponent = ({ title, className }) => {
  return (
    <span class={`${className} inline-block ml-4 text-xs uppercase dark:text-gray-500`}>
      {title}
    </span>
  );
};
