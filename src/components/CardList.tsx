import { usePokemons } from "../hooks/usePokemons"
import { Card } from "./Card";

export const CardList = () => {

const {pokemons, loading} = usePokemons();

  if(loading) return <p>Loading Pokemons...</p> 

  return (
    <article className="card-list">
      {pokemons.map((p, i)=>{
           return < Card key={i} pokemon={p}/>
      })}
    </article>
  )
}
