import { useState, useEffect } from "react"
import { getPokemons } from "../services/pokeapi"
import type { Pokemon } from "../types/Pokemon"

export const usePokemons = (offset: number, limit: number) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{

    const loadData = async ()=>{
      setLoading(true)
      const raw = await getPokemons(limit, offset)
      const results = raw.map((p: Pokemon)=>{
        const id = p.url.split("/").filter(Boolean).pop();
        return{
          id,
          name: p.name,
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        }
      });
      console.log(results);
      setPokemons(results)
      setLoading(false)
    };
    loadData();
  },[offset, limit])


  return { pokemons, loading }

}
