import { useState } from 'react'
import { API_URL } from '../constants'
import { Character } from '../interfaces/character.interface'
import toast from 'react-hot-toast'

export default function CharacterApi() {
  const [characters, setCharacter] = useState<Character[]>([])
  const [characterDetail, setCharacterDetail] = useState<Character | null>(null)
  const [charactersById, setCharactersById] = useState<Character[]>([])
  const [pageInfo, setPageInfo] = useState<{ count: number; pages: number }>({
    count: 0,
    pages: 0
  }) 
  const [isloading, setIsLoading] = useState<boolean>(false)

  const fetchCharacters = async (search: string = '', page: number = 1) => {
    setIsLoading(true)

    const query = `
      query ($page: Int, $name: String) {
        characters(page: $page, filter: { name: $name }) {
          info {
            count
            pages
          }
          results {
            id
            name
            status
            species
            gender
            image
            origin {
              name
            }
            location {
              name
            }
          }
        }
      }
    `

    const variables = {
      page,
      name: search
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
      })

      const data = await response.json()

      if (response.ok && data.data) {
        const responsedata = data.data
        const results = responsedata.characters.results
        setCharacter(results)
        setPageInfo(responsedata.characters.info) 
        console.log('Characters fetched successfully:', results)
        return results
      } else {
        toast.error('Gagal Mengambil Data Karakter.')
        console.error('GraphQL Error:', data.errors || data)
      }
    } catch (error) {
      toast.error('Error Mengambil Data Karakter.')
      console.error('Error fetching GraphQL data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCharacterById = async (id: string) => {
    setIsLoading(true)

    const query = `
      query ($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          type
          gender
          origin {
            name
            type
            dimension
          }
          location {
            name
            type
            dimension
          }
          image
          episode {
            id
            name
            episode
          }
          created
        }
      }
    `

    const variables = {
      id
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
      })

      const data = await response.json()

      if (response.ok && data.data) {
        const responseData = data.data
        const result = responseData.character
        setCharacterDetail(result)
        console.log('Character detail fetched:', result)
        return result
      } else {
        toast.error('Gagal Mengambil Detail Karakter.')
      }
    } catch (error) {
      toast.error('Error Mengambil Detail Karakter.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCharactersByIds = async (ids: string[]) => {
    setIsLoading(true)

    const query = `
      query ($ids: [ID!]!) {
        charactersByIds(ids: $ids) {
          id
          name
          status
          species
          image
        }
      }
    `

    const variables = {
      ids
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
      })

      const data = await response.json()

      if (response.ok && data.data) {
        const responseData = data.data
        const results = responseData.charactersByIds
        setCharactersById(results)
        console.log('Characters by IDs fetched:', results)
        return results
      } else {
        toast.error('Gagal Mengambil Data Karakter.')
        console.error('GraphQL Error:', data.errors || data)
      }
    } catch (error) {
      toast.error('Error Mengambil Data Karakter.')
      console.error('Error fetching GraphQL data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    characters,
    characterDetail,
    charactersById,
    isloading,
    pageInfo, 
    fetchCharacters,
    fetchCharacterById,
    fetchCharactersByIds
  }
}
