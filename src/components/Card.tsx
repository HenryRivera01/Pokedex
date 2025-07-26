import type { Pokemon } from "../types/Pokemon"


export const Card = ({pokemon} : {pokemon: Pokemon}) => {
  return (
    <div className="card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  )
}
