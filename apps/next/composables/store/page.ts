import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', () => {
  const pageTitle = ref('')
  function setPageTitle(newTitle:string) {
    pageTitle.value = newTitle
  }

  return { pageTitle, setPageTitle }
});
