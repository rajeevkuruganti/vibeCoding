
import axios from 'axios'
import { RecordItem } from '../types'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function fetchAllRecords(): Promise<RecordItem[]> {
  const url = `${BASE}/collection/cs`
  const res = await axios.get(url)
  alert
  return res.data as RecordItem[]
}

export async function createRecord(payload: Partial<RecordItem>): Promise<RecordItem> {
  const url = `${BASE}/collection/cs`
  const res = await axios.post(url, payload)
  return res.data as RecordItem
}
