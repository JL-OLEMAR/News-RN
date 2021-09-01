/* global fetch */
import { API_HOST } from '../utils/contants'

export const getNewsApi = () => {
  const url = `${API_HOST}/news?_sort=created_at:DESC&_limit=100`

  return fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      return result
    })
}
