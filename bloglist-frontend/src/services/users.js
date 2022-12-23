import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then((response) => response.data)
}

export const usersService = { getAll, create }
