import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { to: string, text: string };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const MainSidebarItemLink: ParentComponent = ({ to, text }) => {
  return (
    <li>
      <a
        href={to}
        class="block dark:text-slate-400 dark:hover:bg-slate-800/50 py-2 px-4 text-sm"
      >
        {text}
      </a>
    </li>
  );
};
