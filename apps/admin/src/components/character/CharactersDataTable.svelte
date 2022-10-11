<script lang="ts">
  import qs from 'qs';
  import { format, parseISO } from 'date-fns';
  import DataTable from '@pattern/organisms/dataTables/DataTable.svelte';
  import type {
    PageEvent,
    SearchEvent,
    SettersEvent,
  } from '@pattern/organisms/dataTables/dataTableTypes';
  import { until } from '@open-draft/until';
  import toast from 'svelte-french-toast';

  async function fetchAccounts(itemsPerPage: number, currentPage: number) {
    const { error, data } = await until(() => fetch(
      `/api/characters?limit=${itemsPerPage}&page=${currentPage}`,
    ))

    if (error) {
      toast.error(error.message);
      return
    }

    return await data?.json();
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
          class: {
            like: searchText,
          },
          name: {
            like: searchText,
          },
        },
      ],
    };

    const stringifiedQuery = qs.stringify(
      {
        limit: itemsPerPage,
        where: query,
      },
      { addQueryPrefix: true },
    );

    const response = await fetch(
      `/api/characters${stringifiedQuery}`,
    );

    const accounts = await response.json();
    event.detail.setData(accounts.data);
    event.detail.setLoading(false);
  }
</script>

<DataTable
  headers={[
    { key: 'char_id', value: 'Character ID', className: 'w-40' },
    { key: 'account_id', value: 'Account' },
    { key: 'name', value: 'Name' },
    { key: 'class_name', value: 'Class' },
    { key: 'base_level', value: 'Base Level' },
    { key: 'job_level', value: 'Job Level' },
    { key: 'last_login', value: 'Last login' },
  ]}
  on:mounted={handleDatatableOnMount}
  on:changePage={handleDatatableChangePage}
  on:changeLimit={handleDatatableChangeLimit}
  on:search={handleDatatableSearch}
>
  <svelte:fragment slot="cell" let:row let:cell let:cellValue>
    {#if cell.key === 'last_login'}
      {format(parseISO(cellValue), 'MM/dd/yyyy p')}
    {:else if cell.key === 'account_id'}
      {row.account.userid}
    {:else}
      {cellValue}
    {/if}
  </svelte:fragment>
</DataTable>
