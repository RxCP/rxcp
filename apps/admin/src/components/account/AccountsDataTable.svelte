<script lang="ts">
  import qs from 'qs';
  import Button from 'ui/src/Button/Button.svelte';
  import DataTable from '@pattern/organisms/dataTables/DataTable.svelte';
  import type {
    PageEvent,
    SearchEvent,
    SettersEvent,
  } from '@pattern/organisms/dataTables/dataTableTypes';

  async function fetchAccounts(itemsPerPage: number, currentPage: number) {
    const response = await fetch(
      `/api/accounts?limit=${itemsPerPage}&page=${currentPage}`,
    );
    return await response.json();
  }

  async function setRows<T extends SettersEvent>(
    event: CustomEvent<T>,
    itemsPerPage: number = 5,
    currentPage: number = 1,
    isSetTotalItems: boolean = false,
  ): Promise<void> {
    event.detail.setLoading(true);
    const accounts = await fetchAccounts(itemsPerPage, currentPage);
    event.detail.setData(accounts.data);
    event.detail.setLoading(false);

    if (isSetTotalItems) {
      event.detail.setTotalItems?.(accounts.meta.total);
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

    const query = {
      or: [
        {
          userid: {
            like: searchText,
          },
          email: {
            like: searchText,
          },
        },
      ],
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true },
    );

    const response = await fetch(
      `/api/accounts?limit=${itemsPerPage}&${stringifiedQuery}`,
    );

    const accounts = await response.json();
    event.detail.setData(accounts.data);
    event.detail.setLoading(false);
  }
</script>

<DataTable
  headers={[
    { key: 'account_id', value: 'Account ID', className: 'w-36' },
    { key: 'userid', value: 'User ID' },
    { key: 'email', value: 'Email' },
    { key: 'group_id', value: 'Group' },
    { key: 'last_ip', value: 'Last IP' },
    {
      key: 'action',
      value: 'Action',
      className: 'w-4.5',
      innerClassName: 'justify-center',
    },
  ]}
  filters={[
    { key: 'account_id', label: 'Account ID' },
    { key: 'userid', label: 'User ID' },
    { key: 'email', label: 'Email' },
    { key: 'group_id', label: 'Group' },
  ]}
  on:mounted={handleDatatableOnMount}
  on:changePage={handleDatatableChangePage}
  on:changeLimit={handleDatatableChangeLimit}
  on:search={handleDatatableSearch}
>
  <svelte:fragment slot="cell" let:row let:cell let:cellValue>
    {#if cell.key === 'action'}
      <div class="flex">
        <Button size="sm" variant="ghost">
          <div class="i-tabler-edit text-lg" />
        </Button>
      </div>
    {:else if cell.key === 'group_id'}
      {cellValue === 99 ? 'Admin' : 'Player'}
    {:else}
      {cellValue}
    {/if}
  </svelte:fragment>
</DataTable>
