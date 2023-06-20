import { useEffect, useState } from 'react'

function useFetchData(url: string) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url)

      const data = await response.json()

      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [url])

  return [loading, data]
}

export default useFetchData
