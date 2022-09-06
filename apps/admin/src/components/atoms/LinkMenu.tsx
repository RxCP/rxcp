import type { Component, JSX } from "solid-js";

type MenuItemSidebarProps<P = {}> = P & { children?: JSX.Element };
type MenuItemSidebarComponent<P = {}> = Component<MenuItemSidebarProps<P>>;

export const LinkMenu: MenuItemSidebarComponent = (props) => {
  return (
    <a
      href="#"
      class="flex items-center
        py-2 px-4 rounded
        text-sm font-normal text-slate-900
        dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-800/50"
    >
      {props.children}
    </a>
  );
};
