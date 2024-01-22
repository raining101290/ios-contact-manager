import React, { useEffect, useState } from 'react'
import { getRestaurants } from '../axios/api'

export default () => {
  const [results, setResults] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const callSearchApi = async (searchQuery) => {
    setLoading(true)
    getRestaurants({ limit: 50, term: searchQuery, location: 'san jose' })
      .then((res) => {
        setResults(res.data.businesses)
        setTotalCount(res.data.total)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    //Call the search api with default
    callSearchApi('Pasta')
  }, [])

  return [callSearchApi, results, totalCount, loading]
}
