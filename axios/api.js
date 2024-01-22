import {
  fetchData,
  postData,
  putData,
  patchData,
  deleteData,
} from './commonAxiosFunctions'

export const getRestaurants = (params) => {
  const url = `/search`
  return fetchData(url, params)
}

export const getRestaurant = (params) => {
  const url = '/' + params.id
  return fetchData(url, params)
}
