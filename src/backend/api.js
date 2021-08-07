import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export const getUsers = () => {
   return  axios
      .get(`${process.env.REACT_APP_HOST}`)
      .then((res) => res.data)
      .catch(error => console.log(error))
}

export const postUser = ({email,password}) => {
   return  axios
     .post(`${process.env.REACT_APP_HOST}`, {id:uuidv4(), email,password})
     .then((res) => res.data)
     .catch(error => console.log(error))
}
