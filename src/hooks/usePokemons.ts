import { useState, useEffect } from "react"
import { getPokemons } from "../services/pokeapi"
import type { Pokemon } from "../types/Pokemon"

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{

    const loadData = async ()=>{
      const raw = await getPokemons()
      const data = raw.map((p: Pokemon, i:number)=>({
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
      }));
      console.log(raw);
      setPokemons(data)
      setLoading(false)
    };
    loadData();
  },[])


  return { pokemons, loading }

}
