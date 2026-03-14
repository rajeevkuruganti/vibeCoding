
import axios, { AxiosError } from 'axios'
import { RecordItem } from '../types'

const BASE = import.meta.env.VITE_API_URL
const COLLECTION_ENDPOINT = '/collection/cs'

/**
 * Handle API errors with proper error messages
 */
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || error.message || 'An error occurred')
  }
  throw new Error('An unexpected error occurred')
}

/**
 * Fetch all records from the API
 */
export async function fetchAllRecords(): Promise<RecordItem[]> {
  try {
    const url = `${BASE}${COLLECTION_ENDPOINT}`
    const res = await axios.get<RecordItem[]>(url)
    return res.data
  } catch (error) {
    handleApiError(error)
  }
}

/**
 * Create a new record
 */
export async function createRecord(payload: Partial<RecordItem>): Promise<RecordItem> {
  try {
    const url = `${BASE}${COLLECTION_ENDPOINT}`
    const res = await axios.post<RecordItem>(url, payload)
    return res.data
  } catch (error) {
    handleApiError(error)
  }
}

/**
 * Delete a record by ID
 */
export async function deleteRecord(id: number): Promise<void> {
  try {
    const url = `${BASE}${COLLECTION_ENDPOINT}/${id}`
    await axios.delete(url)
  } catch (error) {
    handleApiError(error)
  }
}

/**
 * Update a record by ID
 */
export async function updateRecord(id: number, payload: Partial<RecordItem>): Promise<RecordItem> {
  try {
    const url = `${BASE}${COLLECTION_ENDPOINT}/${id}`
    const res = await axios.put<RecordItem>(url, payload)
    return res.data
  } catch (error) {
    handleApiError(error)
  }
}
