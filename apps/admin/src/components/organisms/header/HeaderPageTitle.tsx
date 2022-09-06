import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { to?: string; text: string };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const HeaderPageTitle: ParentComponent = ({ to, text }) => {
  return (
    <a href={to} class="dark:text-gray-500">
      <h2 class="dark:text-gray-200 text-2xl font-medium">{text}</h2>
    </a>
  );
};
