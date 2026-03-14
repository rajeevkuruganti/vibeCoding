import { useState, useCallback, useEffect } from 'react'
import { RecordItem } from '../types'
import { fetchAllRecords as fetchRecords } from '../api/api'
import { IMAGES_URL } from '../constants'

/**
 * Custom hook for managing records loading and error handling
 */
export const useRecordsData = () => {
  const [rows, setRows] = useState<RecordItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchRecords()
      setRows(data)
    } catch (err: any) {
      const message = err?.message || 'Failed to fetch records'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { rows, setRows, loading, error, setError, load }
}

/**
 * Custom hook for managing images
 */
export const useImages = () => {
  const [images, setImages] = useState<string[]>([])

  const loadImages = useCallback(async () => {
    try {
      const response = await fetch(IMAGES_URL)
      const data = await response.json()
      setImages(data || [])
    } catch (err: any) {
      console.error('Failed to fetch images:', err)
    }
  }, [])

  return { images, loadImages }
}

/**
 * Custom hook for managing slide indices
 */
export const useSlideNavigation = () => {
  const [slideIndices, setSlideIndices] = useState<{ [key: number]: number }>({})

  const nextSlide = useCallback(
    (recordId: number, totalImages: number) => {
      setSlideIndices((prev: any) => ({
        ...prev,
        [recordId]: ((prev[recordId] || 0) + 1) % totalImages
      }))
    },
    []
  )

  const prevSlide = useCallback(
    (recordId: number, totalImages: number) => {
      setSlideIndices((prev: any) => ({
        ...prev,
        [recordId]: ((prev[recordId] || 0) - 1 + totalImages) % totalImages
      }))
    },
    []
  )

  return { slideIndices, nextSlide, prevSlide }
}

/**
 * Custom hook for notification management
 */
export const useNotifications = () => {
  const [successOpen, setSuccessOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorOpen, setErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const showSuccess = useCallback((message: string) => {
    setSuccessMessage(message)
    setSuccessOpen(true)
  }, [])

  const showError = useCallback((message: string) => {
    setErrorMessage(message)
    setErrorOpen(true)
  }, [])

  const closeSuccess = useCallback(() => setSuccessOpen(false), [])
  const closeError = useCallback(() => setErrorOpen(false), [])

  return {
    successOpen,
    successMessage,
    errorOpen,
    errorMessage,
    showSuccess,
    showError,
    closeSuccess,
    closeError
  }
}
