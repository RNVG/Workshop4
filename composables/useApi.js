import { useRuntimeConfig } from '#app'

export function useApi(path, { auto = true } = {}) {
  const base = 'https://jsonplaceholder.typicode.com'
  const data = ref(null)
  const loading = ref(false)
  const error = ref('')

  const fetchData = async (extraPath = '') => {
    loading.value = true
    error.value = ''
    try {
      const res = await fetch(`${base}${path}${extraPath}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
      return data.value
    } catch (err) {
      error.value = err.message || 'Error fetching data'
      data.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const reload = async (extraPath = '') => {
    return fetchData(extraPath)
  }

  if (auto && process.client) {
    onMounted(() => {
      fetchData().catch(() => {})
    })
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    fetchData,
    reload
  }
}
