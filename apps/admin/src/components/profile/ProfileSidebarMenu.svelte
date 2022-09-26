<script>
  import MainSidebarItemLink from '@pattern/organisms/main/MainSidebarItemLink.svelte';
  import MainSidebarItemTitle from '@pattern/organisms/main/MainSidebarItemTitle.svelte';
  import MainSidebarMenu from '@pattern/organisms/main/MainSidebarMenu.svelte';
  import { currentPath } from '@store/url';

  let menu = [
    {
      url: '/admin/profile',
      text: 'Information',
    },
    {
      url: '/admin/profile/change-email',
      text: 'Change Email',
    },
    {
      url: '/admin/profile/change-password',
      text: 'Change Password',
    },
  ];
</script>

<MainSidebarMenu>
  <MainSidebarItemTitle text="Profile" />
  {#each menu as link}
    <MainSidebarItemLink
      to={link.url}
      text={link.text}
      isActive={link.url === $currentPath}
    />
  {/each}
</MainSidebarMenu>
