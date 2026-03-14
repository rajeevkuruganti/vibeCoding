// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL
export const IMAGES_URL = import.meta.env.VITE_IMAGES_URL
export const COLLECTION_ENDPOINT = '/collection/cs'

// Initial form state
export const INITIAL_BOOK_RECORD = {
  title: '',
  author: '',
  isbn: '',
  edition: '',
  autographed: 'No' as const,
  dateAcquired: '',
  cost: '',
  condition: 'Good' as const,
  description: ''
}

// Condition options
export const CONDITION_OPTIONS = ['Damaged', 'Fair', 'Good', 'Excellent'] as const

// Pagination
export const DEFAULT_ROWS_PER_PAGE = 6

// UI Constants
export const SNACKBAR_AUTO_HIDE_DURATION = 4000
export const DEFAULT_DIALOG_MAX_WIDTH = 'md' as const
export const DEFAULT_FIELD_SIZE = 'small' as const

// Autographed options
export const AUTOGRAPHED_OPTIONS = ['Yes', 'No'] as const

// Field labels
export const FIELD_LABELS = {
  name: 'Name (Title)',
  author: 'Author',
  isbn: 'ISBN',
  edition: 'Edition',
  autographed: 'Autographed',
  dateAcquired: 'Date Acquired',
  cost: 'Cost',
  condition: 'Condition',
  description: 'Description (max 3000 characters)'
} as const

// Description limits
export const DESCRIPTION_MAX_LENGTH = 3000

// Error messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch records',
  CREATE_FAILED: 'Failed to create record',
  DELETE_FAILED: 'Failed to delete record',
  UPDATE_FAILED: 'Failed to update record',
  LOAD_IMAGES_FAILED: 'Failed to load images'
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  CREATED: (id: number) => `Created record ${id}`,
  DELETED: (id: number) => `Deleted record ${id}`,
  UPDATED: (id: number) => `Updated record ${id}`
} as const
