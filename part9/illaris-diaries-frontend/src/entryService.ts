import axios from "axios";
import { Entry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios.get<Entry[]>(baseUrl)
    .then((response) => response.data)
}

export const addEntry = async (object: Entry)  => {
    return await axios.post<Entry>(baseUrl, object)
      .then(response => response.data)
}