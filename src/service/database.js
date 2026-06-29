import { supabase } from './supabaseconfig'

// Database service functions for Supabase

/**
 * Save a trip to the database
 * @param {Object} tripData - The trip data to save
 * @param {string} tripData.id - Unique trip ID
 * @param {Object} tripData.userselection - User's form selections
 * @param {Object} tripData.tripdata - Parsed trip data from AI
 * @param {string} tripData.userEmail - User's email
 * @returns {Promise<Object>} The saved trip data
 */
export const saveTrip = async (tripData) => {
  try {
    const { data, error } = await supabase
      .from('cities')
      .insert([tripData])
      .select()
      .single()

    if (error) {
      console.error('Error saving trip:', error)
      // Enhance error message for network issues
      if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
        const enhancedError = new Error('Network error: Unable to connect to Supabase. Please check your VITE_SUPABASE_URL and internet connection.')
        enhancedError.originalError = error
        throw enhancedError
      }
      throw error
    }

    return data
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      const networkError = new Error('Network error: Unable to connect to database. Please check your Supabase configuration and internet connection.')
      networkError.originalError = error
      throw networkError
    }
    throw error
  }
}

/**
 * Get a single trip by ID
 * @param {string} tripId - The trip ID
 * @returns {Promise<Object|null>} The trip data or null if not found
 */
export const getTripById = async (tripId) => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('id', tripId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null
    }
    console.error('Error fetching trip:', error)
    throw error
  }

  return data
}

/**
 * Get all trips for a specific user
 * @param {string} userEmail - The user's email
 * @returns {Promise<Array>} Array of trip data
 */
export const getUserTrips = async (userEmail) => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('userEmail', userEmail)
    .order('id', { ascending: false })

  if (error) {
    console.error('Error fetching user trips:', error)
    throw error
  }

  return data || []
}

/**
 * Update a trip
 * @param {string} tripId - The trip ID
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object>} The updated trip data
 */
export const updateTrip = async (tripId, updates) => {
  const { data, error } = await supabase
    .from('cities')
    .update(updates)
    .eq('id', tripId)
    .select()
    .single()

  if (error) {
    console.error('Error updating trip:', error)
    throw error
  }

  return data
}

/**
 * Delete a trip
 * @param {string} tripId - The trip ID
 * @returns {Promise<void>}
 */
export const deleteTrip = async (tripId) => {
  const { error } = await supabase
    .from('cities')
    .delete()
    .eq('id', tripId)

  if (error) {
    console.error('Error deleting trip:', error)
    throw error
  }
}

