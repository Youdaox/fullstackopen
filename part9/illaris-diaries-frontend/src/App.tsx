import { useEffect, useState } from 'react'
import { Entry } from './types'
import { getAllEntries } from './entryService'

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    getAllEntries().then(data => setEntries(data))
  }, [])
  
  if (!entries) {
    return <p> ... loading </p>
  }
  return (
    <div>
      <h3>Diary entries</h3>
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
