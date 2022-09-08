<script>
import LinkMenu from "@components/atoms/LinkMenu.svelte";
import IconText from "@components/molecules/IconText.svelte";
import SidebarInner from "./SidebarInner.svelte";
import SidebarLogo from "./SidebarLogo.svelte";
import SidebarMenu from "./SidebarMenu.svelte";
import SidebarMenuItem from "./SidebarMenuItem.svelte";
import SidebarTitle from "./SidebarTitle.svelte";
import SidebarWrapper from "./SidebarWrapper.svelte";

</script>
<SidebarWrapper>
  <SidebarInner>
    <SidebarLogo />
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarTitle title="Ragnarok" />
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="/admin/dashboard">
          <IconText
            text="Dashboard"
            iconClass="i-tabler-layout-dashboard"
          />
        </LinkMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="/admin/accounts">
          <IconText text="Accounts" iconClass="i-tabler-user" />
        </LinkMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="#">
          <IconText text="Characters" iconClass="i-tabler-users" />
        </LinkMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="#">
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
        <LinkMenu to="#">
          <IconText text="Settings" iconClass="i-tabler-settings" />
        </LinkMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarInner>
</SidebarWrapper>
