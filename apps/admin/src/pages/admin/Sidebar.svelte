<script lang="ts">
  import { onMount } from 'svelte';
  import LinkMenu from '@pattern/atoms/LinkMenu.svelte';
  import PrimaryLogo from '@pattern/atoms/logo/PrimaryLogo.svelte';
  import MenuToggleButton from '@pattern/atoms/buttons/ButtonToggle.svelte';
  import SidebarButtonClose from '@pattern/atoms/buttons/ButtonX.svelte';
  import SidebarInner from './SidebarInner.svelte';
  import SidebarLogo from './SidebarLogo.svelte';
  import SidebarMenu from './SidebarMenu.svelte';
  import SidebarMenuItem from './SidebarMenuItem.svelte';
  import SidebarTitle from './SidebarTitle.svelte';
  import SidebarWrapper from './SidebarWrapper.svelte';
  import NavbarMobile from '../navbar/NavbarMobile.svelte';
  import SidebarIconText from './SidebarIconText.svelte';
  import { currentPath } from '@store/url';

  type MenuItem = {
    url: string;
    text: string;
    iconClass: string;
  };

  type Menu = {
    ragnarok: MenuItem[];
    plugins: MenuItem[];
  };

  let primaryMenu: HTMLElement | null;
  const toggleClass: string = 'lt-lg:hidden';

  const menu: Menu = {
    ragnarok: [
      {
        url: '/admin/dashboard',
        text: 'Dashboard',
        iconClass: 'i-tabler-layout-dashboard',
      },
      {
        url: '/admin/accounts',
        text: 'Accounts',
        iconClass: 'i-tabler-user',
      },
      {
        url: '/admin/characters',
        text: 'Characters',
        iconClass: 'i-tabler-building-skyscraper',
      },
      {
        url: '/admin/rankings',
        text: 'Rankings',
        iconClass: 'i-tabler-chart-bar',
      },
      {
        url: '/admin/vending',
        text: 'Vending',
        iconClass: 'i-tabler-zoom-money',
      },
      {
        url: '/admin/database',
        text: 'Database',
        iconClass: 'i-tabler-database',
      },
    ],
    plugins: [
      {
        url: '/admin/plugins/cms',
        text: 'CMS',
        iconClass: 'i-tabler-note',
      },
      {
        url: '/admin/plugins/vote',
        text: 'Vote4Points',
        iconClass: 'i-tabler-pencil',
      },
      {
        url: '/admin/plugins/shop',
        text: 'Shop',
        iconClass: 'i-tabler-shopping-cart',
      },
      {
        url: '/admin/plugins/tickets',
        text: 'Tickets',
        iconClass: 'i-tabler-ticket',
      },
      {
        url: '/admin/plugins/system',
        text: 'System',
        iconClass: 'i-tabler-heart-rate-monitor',
      },
    ],
  };

  onMount(() => {
    primaryMenu = document.getElementById('primaryMenu');
    console.log($currentPath);
  });

  function handleToggleMenu() {
    if (primaryMenu?.classList.contains(toggleClass)) {
      primaryMenu?.classList.remove(toggleClass);
    } else {
      primaryMenu?.classList.add(toggleClass);
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
      {#each menu.ragnarok as menuItem}
        <SidebarMenuItem>
          <LinkMenu to={menuItem.url} isActive={$currentPath === menuItem.url}>
            <SidebarIconText
              text={menuItem.text}
              iconClass={menuItem.iconClass}
            />
          </LinkMenu>
        </SidebarMenuItem>
      {/each}
      <SidebarMenuItem>
        <SidebarTitle title="Plugins" className="mt-4" />
      </SidebarMenuItem>
      {#each menu.plugins as menuItem}
        <SidebarMenuItem>
          <LinkMenu to={menuItem.url} isActive={$currentPath === menuItem.url}>
            <SidebarIconText
              text={menuItem.text}
              iconClass={menuItem.iconClass}
            />
          </LinkMenu>
        </SidebarMenuItem>
      {/each}
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
