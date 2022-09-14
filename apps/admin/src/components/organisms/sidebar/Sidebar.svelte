<script>
  import { onMount } from 'svelte';
  import LinkMenu from '@components/atoms/LinkMenu.svelte';
  import PrimaryLogo from '@components/atoms/logo/PrimaryLogo.svelte';
  import MenuToggleButton from '@components/atoms/buttons/ButtonToggle.svelte';
  import SidebarButtonClose from '@components/atoms/buttons/ButtonX.svelte';
  import SidebarInner from './SidebarInner.svelte';
  import SidebarLogo from './SidebarLogo.svelte';
  import SidebarMenu from './SidebarMenu.svelte';
  import SidebarMenuItem from './SidebarMenuItem.svelte';
  import SidebarTitle from './SidebarTitle.svelte';
  import SidebarWrapper from './SidebarWrapper.svelte';
  import NavbarMobile from '../navbar/NavbarMobile.svelte';
  import SidebarIconText from './SidebarIconText.svelte';

  let primaryMenu;
  const toggleClass = 'lt-lg:hidden';

  onMount(() => {
    primaryMenu = document.getElementById('primaryMenu');
  });

  function handleToggleMenu() {
    if (primaryMenu.classList.contains(toggleClass)) {
      primaryMenu.classList.remove(toggleClass);
    } else {
      primaryMenu.classList.add(toggleClass);
    }
  }
</script>

<NavbarMobile>
  <PrimaryLogo />
  <MenuToggleButton on:click={handleToggleMenu} />
</NavbarMobile>
<SidebarWrapper>
  <SidebarInner>
    <SidebarButtonClose className="lg:hidden" on:click={handleToggleMenu} />
    <SidebarLogo />
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarTitle title="Ragnarok" />
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="/admin/dashboard">
          <SidebarIconText
            text="Dashboard"
            iconClass="i-tabler-layout-dashboard"
          />
        </LinkMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="/admin/accounts">
          <SidebarIconText text="Accounts" iconClass="i-tabler-user" />
        </LinkMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="/admin/characters">
          <SidebarIconText text="Characters" iconClass="i-tabler-users" />
        </LinkMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="/admin/guilds">
          <SidebarIconText
            text="Guilds"
            iconClass="i-tabler-building-skyscraper"
          />
        </LinkMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarTitle title="General" className="mt-4" />
      </SidebarMenuItem>
      <SidebarMenuItem>
        <LinkMenu to="/admin/characters">
          <SidebarIconText text="Settings" iconClass="i-tabler-settings" />
        </LinkMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarInner>
</SidebarWrapper>
