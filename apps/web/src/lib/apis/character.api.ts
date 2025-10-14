import { useState } from "react";
import { API_URL } from "../constants";
import { toast } from "@/hooks/use-toast";
import { Character } from "../interfaces/character.interface";

export default function CharacterApi() {
  const [characters, setCharacter] = useState<Character[]>([]);
  const [characterDetail, setCharacterDetail] = useState<Character | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);
  
   const fetchCharacters = async ( search: string = '') => {
    setIsLoading(true);

    // GraphQL query string
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
          }
        }
      }
    `;

    // GraphQL variables
    const variables = {
    //   page,
      name: search,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();

      if (response.ok && data.data) {
        const responsedata = data.data 
        const results = responsedata.characters.results;
        setCharacter(results);
        console.log('Characters fetched successfully:', results);
        return results;
      } else {
        toast({
          variant: 'destructive',
          description: 'Gagal Mengambil Data Karakter.',
        });
        console.error('GraphQL Error:', data.errors || data);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Error Mengambil Data Karakter.',
      });
      console.error('Error fetching GraphQL data:', error);
    } finally {
      setIsLoading(false);
    }
  };

 const fetchCharacterById = async (id: string) => {
    setIsLoading(true);

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
    `;

    const variables = {
      id,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();

      if (response.ok && data.data) {
        const result = data.data.character;
        setCharacterDetail(result);
        console.log('Character detail fetched:', result);
        return result;
      } else {
        toast({
          variant: 'destructive',
          description: 'Gagal Mengambil Detail Karakter.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Error Mengambil Detail Karakter.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return {
    characters,
    characterDetail,
    isloading,
    fetchCharacters,
    fetchCharacterById
  };

  
  
}

