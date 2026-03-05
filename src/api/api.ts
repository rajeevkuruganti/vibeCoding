
import axios from 'axios'
import { RecordItem } from '../types'

const BASE = import.meta.env.VITE_API_URL

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
export async function deleteRecord(payload: Partial<RecordItem>): Promise<RecordItem> {
  const url = `${BASE}/collection/cs/${payload.id}`
  const res = await axios.delete(url)
  return res.data as RecordItem
}
