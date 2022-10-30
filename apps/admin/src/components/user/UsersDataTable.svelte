<script lang="ts">
  import { format, parseISO } from 'date-fns';
  import qs from 'qs';
  import toast from 'svelte-french-toast';
  import { until } from '@open-draft/until';
  import Button from 'rxcp-ui/src/Button/Button.svelte';
  import DataTable from '@pattern/organisms/dataTables/DataTable.svelte';
  import type {
    PageEvent,
    SearchEvent,
    SettersEvent,
  } from '@pattern/organisms/dataTables/dataTableTypes';
  import { get } from '@util/fetch';
  import Modal from '@pattern/organisms/modal/Modal.svelte';
  import FormLabel from '@components/pattern/atoms/forms/FormLabel.svelte';
  import FormInput from '@components/pattern/atoms/forms/FormInput.svelte';
  import searchQuery from './searchQuery'
  import type { ModalTypes } from '@pattern/organisms/modal/ModalTypes'

  interface User {
    first_name: string
    last_name: string
    email: string
    created_at: string
    roles: []
  }

  let modal : ModalTypes | null = null;
  let selectedUser: User | Record<string, any>;

  function handleViewUser(user : User | Record<string, any>) {
    selectedUser = user
    modal?.show()
  }

  function handleDialog(event: CustomEvent) {
    modal = event.detail.dialog
  }

  async function fetchAccounts(itemsPerPage: number, currentPage: number) {
    const { error, data } = await until(() => get(
      `/api/users?limit=${itemsPerPage}&page=${currentPage}`
    ))

    if (error) {
      toast.error(error.message);
      return
    }

    return data || [];
  }

  async function setRows<T extends SettersEvent>(
    event: CustomEvent<T>,
    itemsPerPage: number = 5,
    currentPage: number = 1,
    isSetTotalItems: boolean = false,
  ): Promise<void> {
    event.detail.setLoading(true);
    const accounts = await fetchAccounts(itemsPerPage, currentPage);
    event.detail.setData(accounts?.data);
    event.detail.setLoading(false);

    if (isSetTotalItems) {
      event.detail.setTotalItems?.(accounts?.meta?.total);
    }
  }

  async function handleDatatableOnMount(event: CustomEvent<PageEvent>) {
    const itemsPerPage = event.detail.itemsPerPage;
    const currentPage = event.detail.currentPage;
    await setRows<PageEvent>(event, itemsPerPage, currentPage, true);
  }

  async function handleDatatableChangePage(event: CustomEvent<PageEvent>) {
    const itemsPerPage = event.detail.itemsPerPage;
    const currentPage = event.detail.currentPage;
    await setRows<PageEvent>(event, itemsPerPage, currentPage);
  }

  async function handleDatatableChangeLimit(event: CustomEvent<PageEvent>) {
    const itemsPerPage = event.detail.itemsPerPage;
    await setRows<PageEvent>(event, itemsPerPage, 1); // always set current page to 1 for limit
  }

  async function handleDatatableSearch(event: CustomEvent<SearchEvent>) {
    const itemsPerPage = event.detail.itemsPerPage;
    const searchText = event.detail.searchText;

    event.detail.setLoading(true);

    const query = searchQuery(searchText);
    const stringifiedQuery = qs.stringify(
      {
        limit: itemsPerPage,
        where: query,
      },
      { addQueryPrefix: true },
    );

    const { error, data } = await until(() => get(
      `/api/users${stringifiedQuery}`
    ))

    if (error) {
      toast.error(error.message);
      return
    }

    const accounts = data;
    event.detail.setData(accounts?.data);
    event.detail.setLoading(false);
  }
</script>

<DataTable
  headers={[
    { key: 'email', value: 'Email' },
    { key: 'first_name', value: 'First Name' },
    { key: 'last_name', value: 'Last Name' },
    { key: 'roles', value: 'Roles' },
    { key: 'created_at', value: 'Registered Date' },
    {
      key: 'action',
      value: 'Action',
      className: 'w-4.5',
      innerClassName: 'justify-center',
    },
  ]}
  on:mounted={handleDatatableOnMount}
  on:changePage={handleDatatableChangePage}
  on:changeLimit={handleDatatableChangeLimit}
  on:search={handleDatatableSearch}
>
  <svelte:fragment slot="cell" let:row let:cell let:cellValue>
    {#if cell.key === 'action'}
      <div class="flex">
        <Button size="sm" variant="ghost" title="View" on:click={() => handleViewUser(row)}>
          <div class="i-tabler-eye text-lg" />
        </Button>
      </div>
    {:else if cell.key === 'created_at' }
      <span>
        {format(parseISO(cellValue), 'MM/dd/yyyy')}
      </span>
    {:else if cell.key === 'roles' }
      {#each cellValue as role }
        <span class="px-2 py-1 dark:bg-slate-900 rounded">{ role.name }</span>
      {/each}
    {:else}
      {cellValue}
    {/if}
  </svelte:fragment>
</DataTable>

<Modal id="user-view" title="User" on:dialog={handleDialog}>
  <span slot=title>User details</span>
  {#if selectedUser && Object.keys(selectedUser).length >= 1 }
  <div class="grid grid-cols-1 gap-4">
    <div class="space-y-2">
      <FormLabel htmlFor="first_name" text="First name" />
      <FormInput id="first_name" name="first_name" value={selectedUser.first_name } readonly />
    </div>
    <div class="space-y-2">
      <FormLabel htmlFor="last_name" text="Last name" />
      <FormInput id="last_name" name="last_name" value={selectedUser.last_name} readonly/>
    </div>
    <div class="space-y-2">
      <FormLabel htmlFor="email" text="Email" />
      <FormInput id="email" name="email" value={selectedUser.email} readonly/>
    </div>
    <div class="space-y-2">
      <FormLabel htmlFor="created_at" text="Registered Date" />
      <FormInput id="created_at" name="created_at" value={format(parseISO(selectedUser.created_at), 'MM/dd/yyyy')} readonly/>
    </div>
    <div class="space-y-2">
      <FormLabel htmlFor="role" text="Role" />
      {#each selectedUser.roles as role }
        <span class="px-2 py-1 dark:bg-slate-800 rounded inline-block">{ role.name }</span>
      {/each}
    </div>
  </div>
  {/if}
</Modal>
