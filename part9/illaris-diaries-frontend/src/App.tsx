import { useEffect, useState } from 'react'
import { Entry, ValidationError } from './types'
import { getAllEntries, addEntry } from './entryService'
import axios from 'axios'

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    getAllEntries().then(data => setEntries(data))
  }, [])
  
  if (!entries) {
    return <p> ... loading </p>
  }

  const createEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const newEntry: Entry = {
      date: date,
      visibility,
      weather,
      comment
    }
    try {
      await addEntry(newEntry).then(data => setEntries(entries.concat(data)))
    } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      const e = error.response?.data?.error[0]?.message;
      setError(e || null);
      setTimeout(() => setError(null), 5000)
    } else {
      console.error(error);
    }
  }
  }
  return (
    <div>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      <h3>Diary entries</h3>
      <form onSubmit={createEntry}>
        <div>
          date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)} 
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)} 
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)} 
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)} 
          />
        </div>
        <button type="submit"> add entry </button>
      </form>
      {entries.map(e => {
        return (
          <div>
            <p><strong>{e.date}</strong></p>
            <p>{e.comment}</p>
            <p>visibility: {e.visibility}</p>
            <p>weather: {e.weather}</p>
          </div>
        )
      })}

    </div>
  )
}

export default App
