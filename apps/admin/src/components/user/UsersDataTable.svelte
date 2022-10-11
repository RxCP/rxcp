<script lang="ts">
  import qs from 'qs';
  import toast from 'svelte-french-toast';
  import { until } from '@open-draft/until'
  import Button from 'rxcp-ui/src/Button/Button.svelte';
  import DataTable from '@pattern/organisms/dataTables/DataTable.svelte';
  import type {
    PageEvent,
    SearchEvent,
    SettersEvent,
  } from '@pattern/organisms/dataTables/dataTableTypes';

  async function fetchAccounts(itemsPerPage: number, currentPage: number) {
    const { error, data } = await until(() => fetch(
      `/api/users?limit=${itemsPerPage}&page=${currentPage}`,
    ))

    if (error) {
      toast.error(error.message);
      return
    }

    return data?.json();
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
          email: {
            like: searchText,
          },
        },
        {
          first_name: {
            like: searchText,
          }
        },
        {
          last_name: {
            like: searchText,
          },
        }
      ],
    };

    const stringifiedQuery = qs.stringify(
      {
        limit: itemsPerPage,
        where: query,
      },
      { addQueryPrefix: true },
    );

    const { error, data } = await until(() => fetch(
      `/api/users${stringifiedQuery}`,
    ))

    if (error) {
      toast.error(error.message);
      return
    }

    const accounts = await data?.json();
    event.detail.setData(accounts?.data);
    event.detail.setLoading(false);
  }
</script>

<DataTable
  headers={[
    { key: 'email', value: 'Email' },
    { key: 'first_name', value: 'First Name' },
    { key: 'last_name', value: 'Last Name' },
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
        <Button size="sm" variant="ghost" title="View">
          <div class="i-tabler-eye text-lg" />
        </Button>
      </div>
    {:else}
      {cellValue}
    {/if}
  </svelte:fragment>
</DataTable>
