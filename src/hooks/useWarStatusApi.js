import { useHttp } from './useHttp'

const useWarStatusApi = () => {
  const { request } = useHttp()
  const _API_BASE = 'https://russianwarship.rip/api/v2'

  const getWarStatistics = async date => {
    const url = date
      ? `${_API_BASE}/statistics/${date}`
      : `${_API_BASE}/statistics/latest`
    const res = await request(url)
    return res.data
  }

  return { getWarStatistics }
}

export default useWarStatusApi
