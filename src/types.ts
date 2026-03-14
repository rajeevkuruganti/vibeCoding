/**
 * Autographed status type
 */
export type AuthographedStatus = 'Yes' | 'No'

/**
 * Book condition type
 */
export type BookCondition = 'Damaged' | 'Fair' | 'Good' | 'Excellent'

/**
 * Book record metadata
 */
export interface BookRecord {
  title: string
  author: string
  isbn: string
  edition: string
  autographed: AuthographedStatus
  dateAcquired: string
  cost: string
  condition: BookCondition
  description: string
}

/**
 * Complete record item with database fields
 */
export interface RecordItem extends BookRecord {
  id: number
  name: string
  itemcontents: string
  createdAt: string
  status?: string
  year_released?: string
  [key: string]: any
}

/**
 * API request/response types
 */
export type CreateRecordPayload = Omit<RecordItem, 'id' | 'createdAt'>
export type UpdateRecordPayload = Partial<CreateRecordPayload>

/**
 * Convert book record to JSON string, excluding the title field
 * (title is sent separately as 'name')
 * 
 * @param record - Partial book record to convert
 * @returns JSON string representation of book metadata
 */
export function convertBookRecordToJSON(record: Partial<BookRecord>): string {
  const bookData: Omit<BookRecord, 'title'> = {
    author: record.author || '',
    isbn: record.isbn || '',
    edition: record.edition || '',
    autographed: record.autographed || 'No',
    dateAcquired: record.dateAcquired || '',
    cost: record.cost || '',
    condition: record.condition || 'Good',
    description: record.description || ''
  }
  return JSON.stringify(bookData)
}

/**
 * Parse item contents JSON string back to object
 * 
 * @param itemcontents - JSON string to parse
 * @returns Parsed object or null if invalid JSON
 */
export function parseItemContents(itemcontents: string | undefined): Partial<BookRecord> | null {
  try {
    if (!itemcontents) return null
    return JSON.parse(itemcontents)
  } catch {
    return null
  }
}

