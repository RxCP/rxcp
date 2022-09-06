import type { Component } from "solid-js";
import { LinkMenu } from "@components/atoms/LinkMenu";
import { IconText } from "@components/molecules/IconText";
import { SidebarWrapper } from "./SidebarWrapper";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarTitle } from "./SidebarTitle";
import { SidebarInner } from "./SidebarInner";

export const Sidebar: Component = () => {
  return (
    <SidebarWrapper>
      <SidebarInner>
        <SidebarLogo />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTitle title="Ragnarok" />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LinkMenu>
              <IconText
                text="Dashboard"
                iconClass="i-tabler-layout-dashboard"
              />
            </LinkMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LinkMenu>
              <IconText text="Accounts" iconClass="i-tabler-user" />
            </LinkMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LinkMenu>
              <IconText text="Characters" iconClass="i-tabler-users" />
            </LinkMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LinkMenu>
              <IconText
                text="Guilds"
                iconClass="i-tabler-building-skyscraper"
              />
            </LinkMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarTitle title="General" className="mt-4" />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LinkMenu>
              <IconText text="Settings" iconClass="i-tabler-settings" />
            </LinkMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarInner>
    </SidebarWrapper>
  );
};
