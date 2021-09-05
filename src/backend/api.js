import { v4 as uuidv4 } from 'uuid'
import { DB } from '../core/axios'

export const getUser = email => DB(`/users?email=${email}`)

export const postUser = data =>
  DB.post('/users', { id: uuidv4(), ...data })
    .then(({ data }) => data)
    .catch(error => console.log(error))

export const updateUsers = (id, data) =>
  DB.patch(`/users/${id}`, data)
    .then(({ data }) => data.user)
    .catch(error => console.log(error))
