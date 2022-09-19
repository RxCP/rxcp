<script>
  import Table from '@components/organisms/tables/Table.svelte';
  import Thead from '@components/organisms/tables/TableHead.svelte';
  import Row from '@components/organisms/tables/TableRow.svelte';
  import TheadCol from '@components/organisms/tables/TableHeadCol.svelte';
  import Body from '@components/organisms/tables/TableBody.svelte';
  import BodyRow from '@components/organisms/tables/TableBodyRow.svelte';
  import BodyCol from '@components/organisms/tables/TableBodyCol.svelte';
  import Button from 'ui/src/Button/Button.svelte';
  import { onMount } from 'svelte';
  import FormInput from '@components/atoms/forms/FormInput.svelte';
  import Pagination from './Pagination.svelte';

  let data = [];
  let isLoading = true;
  let currentPage = 1;
  let itemsPerPage = 5;
  let totalItems = 0; // base from the response

  async function changePage(evt) {
    isLoading = true;
    currentPage = evt.detail.current;
    itemsPerPage = evt.detail.perPage;
    const response = await fetch(
      `/api/accounts?limit=${itemsPerPage}&page=${evt.detail}`,
    );
    const accounts = await response.json();
    data = accounts.data;
    isLoading = false;
  }

  onMount(async () => {
    const response = await fetch(
      `/api/accounts?limit=${itemsPerPage}&page=${currentPage}`,
    );
    const accounts = await response.json();
    data = accounts.data;
    totalItems = accounts.meta.total;
    isLoading = false;
  });
</script>

<div class="mb-4 flex space-x-4 ">
  <FormInput
    iconClass="i-tabler-search"
    id="searchAccounts"
    placeholder="Search..."
    class="w-60 md:focus-within:w-96 transition-all duration-300"
  />
  <Button size="sm">
    <span class="block text-lg i-tabler-filter" />
  </Button>
</div>
<div class="mb-4 overflow-x-auto relative rounded pb-[80px]">
  <Table>
    <Thead>
      <Row>
        <TheadCol class="w-8">ID</TheadCol>
        <TheadCol>User ID</TheadCol>
        <TheadCol>Email</TheadCol>
        <TheadCol>Group</TheadCol>
        <TheadCol class="w-4.5" innerClass="justify-center">Action</TheadCol>
      </Row>
    </Thead>
    <Body>
      {#if isLoading}
        <BodyRow>
          <BodyCol colspan={5}>
            <div class="animate-pulse space-y-3 py-4">
              <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
              <div class="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </BodyCol>
        </BodyRow>
      {:else}
        {#each data as account}
          <BodyRow>
            <BodyCol>{account.account_id}</BodyCol>
            <BodyCol>{account.userid}</BodyCol>
            <BodyCol>{account.email}</BodyCol>
            <BodyCol>{account.group_id === 99 ? 'Admin' : 'Player'}</BodyCol>
            <BodyCol>
              <div class="flex">
                <Button size="sm" variant="ghost">
                  <div class="i-tabler-edit text-lg" />
                </Button>
                <Button size="sm" variant="ghost">
                  <div class="i-tabler-trash text-lg" />
                </Button>
              </div>
            </BodyCol>
          </BodyRow>
        {/each}
      {/if}
    </Body>
  </Table>
</div>

{#if data && data.length >= 1}
  <div class="text-slate-500">
    <Pagination
      current={currentPage}
      num_items={totalItems}
      per_page={itemsPerPage}
      on:navigate={changePage}
    />
  </div>
{/if}
