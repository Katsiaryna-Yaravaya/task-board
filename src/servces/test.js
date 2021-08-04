import { DB } from '../core/axios'

const getUsers = () => DB('/users').catch(e => console.log(e))

export const testService = { getUsers }
