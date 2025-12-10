import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const getCountry = () => {
    const req = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    return req.then(response => response)
  }

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }
    getCountry().then(response => {
      setCountry({ ...response, found: true })
    })
    .catch(response => {
      setCountry({ ...response, found: false })
    })
      
  }, [name])

  return country
}