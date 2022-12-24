import qs from 'qs'
import { CommandInstance } from '@hyper-fetch/core'
import { debounce } from 'lodash-es'

export async function usePagination<T extends CommandInstance>(command: T) {
  const isLoading = ref(false)
  const limit = ref(5)
  const page = ref(1)
  const total = ref(0)
  const items = ref([])
  const search = ref('')

  let searchCallback: Function = () => {}
  let where = reactive({})
  let error = reactive({})

  watchEffect(async () => {
    await fetch()
  })

  async function fetch() {
    isLoading.value = true

    const qp = qs.stringify(
      {
        limit: limit.value,
        page: page.value,
        where
      },
      { addQueryPrefix: true }
    )

    const newCommand = command.setQueryParams(qp)
    const [cResponse, cError, status] = await newCommand.send()
    const { data, meta } = cResponse

    if (status !== 200) {
      error = cError
      console.warn(error)
      return
    }

    items.value = data
    total.value = meta.total
    isLoading.value = false
  }

  function setSearchCallback(cb: Function) {
    searchCallback = cb
  }

  const handleSearch = debounce(async (value) => {
    where = searchCallback(value)
    await fetch()
  }, 500)

  return {
    limit,
    page,
    total,
    where,
    items,
    search,
    error,
    isLoading,
    fetch,
    handleSearch,
    setSearchCallback
  }
}
