import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  useEffect(() => {
    getAll().then(data => setResources(data)).catch(res => setResources(''))
  }, [])

  const service = {
    create: async (resource) => {
      const response = await axios.post(baseUrl, resource)
      return response.data
    },
    update: async (id, newObject) => {
      const response = await axios.put(`${ baseUrl }/${id}`, newObject)
      return response.data
    }
  }

  return [
    resources, service
  ]
}
