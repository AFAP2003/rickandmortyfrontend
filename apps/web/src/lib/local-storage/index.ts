export interface LocationAssignment {
  locationName: string
  characterIds: string[]
}

const STORAGE_KEY = 'rickmorty_locations'

export const getLocations = (): LocationAssignment[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading locations from localStorage:', error)
    return []
  }
}

export const saveLocations = (locations: LocationAssignment[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations))
  } catch (error) {
    console.error('Error saving locations to localStorage:', error)
  }
}

export const assignCharacterToLocation = (
  characterId: string,
  locationName: string
): boolean => {
  try {
    const locations = getLocations()

    // Check if location name already exists
    const existingLocation = locations.find(
      (loc) => loc.locationName === locationName
    )

    // Remove character from all locations first (one character per location rule)
    locations.forEach((loc) => {
      loc.characterIds = loc.characterIds.filter((id) => id !== characterId)
    })

    if (existingLocation) {
      // Add character to existing location
      if (!existingLocation.characterIds.includes(characterId)) {
        existingLocation.characterIds.push(characterId)
      }
    } else {
      // Create new location
      locations.push({
        locationName,
        characterIds: [characterId]
      })
    }

    // Remove empty locations
    const filteredLocations = locations.filter(
      (loc) => loc.characterIds.length > 0
    )
    saveLocations(filteredLocations)
    return true
  } catch (error) {
    console.error('Error assigning character to location:', error)
    return false
  }
}

export const getCharacterLocation = (characterId: string): string | null => {
  const locations = getLocations()
  const location = locations.find((loc) =>
    loc.characterIds.includes(characterId)
  )
  return location ? location.locationName : null
}

export const removeCharacterFromLocation = (characterId: string): void => {
  const locations = getLocations()
  locations.forEach((loc) => {
    loc.characterIds = loc.characterIds.filter((id) => id !== characterId)
  })
  const filteredLocations = locations.filter(
    (loc) => loc.characterIds.length > 0
  )
  saveLocations(filteredLocations)
}
