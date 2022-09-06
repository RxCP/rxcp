import type { Component } from "solid-js";

type ParentProps<P = {}> = P & { text: string; iconClass?: string };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const IconText: ParentComponent = ({ text, iconClass }) => {
  return (
    <>
      <div class={`${iconClass} text-xl`}></div>
      <span class="ml-3">{text}</span>
    </>
  );
};
