<script lang="ts">
  import { onMount } from 'svelte';
  import stickyHeader from 'js-sticky-table-headers';
  import { createEventDispatcher } from 'svelte';
  import { debounce } from 'lodash-es';
  import Button from 'ui/src/Button/Button.svelte';
  import Table from '@pattern/organisms/tables/Table.svelte';
  import Thead from '@pattern/organisms/tables/TableHead.svelte';
  import Row from '@pattern/organisms/tables/TableRow.svelte';
  import TheadCol from '@pattern/organisms/tables/TableHeadCol.svelte';
  import Body from '@pattern/organisms/tables/TableBody.svelte';
  import BodyRow from '@pattern/organisms/tables/TableBodyRow.svelte';
  import BodyCol from '@pattern/organisms/tables/TableBodyCol.svelte';
  import FormInput from '@pattern/atoms/forms/FormInput.svelte';
  import Pagination from './Pagination.svelte';
  import type {
    HeaderItem,
    PageEvent,
    SearchEvent,
    Rows,
  } from './dataTableTypes';
  import Popper from '@pattern/molecules/popper/Popper.svelte';

  export let isLoading: boolean = true;
  export let itemsPerPage: number = 10;
  export let headers: HeaderItem[] = [];
  export let filters: Record<string, string>[] = [];

  const dispatch = createEventDispatcher<{
    mounted: PageEvent;
    changePage: PageEvent;
    changeLimit: PageEvent;
    search: SearchEvent;
  }>();

  let rows: Rows = [];
  let currentPage: number = 1;
  let totalItems: number = 0;
  let searchText: string = '';
  let filterBy: string[] = filters.map((item) => item.key);

  const handleInputSearchChange = debounce(({ detail }: CustomEvent): void => {
    searchText = detail.value;
    dispatch('search', {
      setLoading,
      setData,
      setTotalItems,
      itemsPerPage,
      currentPage,
      searchText,
    });
  }, 300);

  function setLoading(value: boolean): void {
    isLoading = value;
  }

  function setData<T extends Rows>(value: T): void {
    rows = value;
  }

  function setTotalItems(value: number): void {
    totalItems = value;
  }

  onMount(() => {
    dispatch('mounted', {
      setLoading,
      setData,
      setTotalItems,
      itemsPerPage,
      currentPage,
    });

    const tableWrapper: HTMLElement | null = document?.querySelector(
      'main .app-scrollbar.h-screen',
    );
    stickyHeader(tableWrapper);
  });

  async function changePage(event: CustomEvent) {
    currentPage = event.detail.currentPage;
    dispatch('changePage', {
      setLoading,
      setData,
      itemsPerPage,
      currentPage,
    });
  }

  async function changeLimit(event: CustomEvent) {
    itemsPerPage = event.detail.perPage;
    dispatch('changeLimit', {
      setLoading,
      setData,
      itemsPerPage,
      currentPage,
    });
  }
</script>

<div class="mb-4 flex space-x-4 ">
  <FormInput
    iconClass="i-tabler-search"
    id="searchAccounts"
    placeholder="Search..."
    class="w-60 md:focus-within:w-96 transition-all duration-300"
    on:input={handleInputSearchChange}
  />

  {#if filters && filters.length}
    <Popper element="span" class="flex" placement="bottom-start">
      <Button size="sm">
        <span class="block text-lg i-tabler-filter" />
      </Button>
      <div
        slot="popup"
        class="z-10 w-48 rounded divide-y shadow dark:shadow-slate-700 bg-white dark:bg-gray-800"
      >
        <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
          {#each filters as filter (filter.key)}
            <li>
              <div
                class="flex items-center p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <label
                  class="cursor-pointer w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    value={filter.key}
                    bind:group={filterBy}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  />
                  <span class="ml-2 inline-block">{filter.label}</span>
                </label>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </Popper>
  {/if}
</div>
<div class="app-scrollbar mb-4 relative rounded datatable">
  <Table>
    <Thead>
      <Row>
        {#each headers as header (header.key)}
          <TheadCol class={header.className} innerClass={header.innerClassName}>
            {header.value}
          </TheadCol>
        {/each}
      </Row>
    </Thead>
    <Body>
      {#if isLoading}
        <BodyRow>
          <BodyCol colspan={headers.length}>
            <div class="animate-pulse space-y-3 py-4">
              <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
              <div class="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </BodyCol>
        </BodyRow>
      {:else if rows && rows.length >= 1}
        {#each rows as row, i}
          <BodyRow>
            {#each headers as header, j (header.key)}
              <BodyCol>
                <slot
                  name="cell"
                  {row}
                  cell={header}
                  cellValue={row[header.key]}
                  rowIndex={i}
                  cellIndex={j}
                >
                  {row[header.key]}
                </slot>
              </BodyCol>
            {/each}
          </BodyRow>
        {/each}
      {:else}
        <BodyRow>
          <BodyCol colspan={headers.length}>
            <p class="text-center min-h-xs flex items-center justify-center">
              No results found.
            </p>
          </BodyCol>
        </BodyRow>
      {/if}
    </Body>
  </Table>
</div>

{#if rows && rows.length >= 1}
  <div class="text-slate-500 pt-[80px]">
    <Pagination
      current={currentPage}
      num_items={totalItems}
      per_page={itemsPerPage}
      on:navigate={changePage}
      on:perPageChange={changeLimit}
    />
  </div>
{/if}
