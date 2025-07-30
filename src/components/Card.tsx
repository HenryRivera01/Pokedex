import type { Pokemon } from "../types/Pokemon"


export const Card = ({pokemon} : {pokemon: Pokemon}) => {
 
  return (

    <div className="card">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.url} alt={pokemon.name} />
    </div>
  )
}