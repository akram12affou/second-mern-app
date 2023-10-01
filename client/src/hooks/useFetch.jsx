import { useState , useEffect } from 'react'
import { useCookies } from "react-cookie";

import axios from 'axios'


export const useFetch = (url) => {
    const [cookie, _] = useCookies(["accestoken"]);
  const [loading , setLoading] = useState(false)
  const [data , setData] = useState([])
  const [error , setError] = useState(null)
  useEffect(() => {
    setLoading(true)
    axios.get(url, {
              headers: {
                token: cookie.accestoken,
            }}).then((res) => {
        setData(res.data)
        setLoading(false)
    }).catch(err => {
        setError(err)
    })
  },[])
  return { loading , data , error}
}