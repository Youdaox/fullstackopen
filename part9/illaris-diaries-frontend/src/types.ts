export interface Entry {
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}

export interface ValidationError {
  error: Array<{ message: string }>
}