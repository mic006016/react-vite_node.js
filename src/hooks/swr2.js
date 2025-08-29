import { useState } from "react"
/** Custom Hook */
export const useSWR2 = (url, fetcher) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  setTimeout(() => {
    fetcher(url)
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, 4000)
  return { data, error, isLoading }
}
// const fetcher = (url) => axios.get(url).then(response => response.data)
// const { data, error, isLoading } = useSWR("https://.../posts", fetcher)
