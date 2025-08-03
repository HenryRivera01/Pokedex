
import type { Pokemon } from "../types/Pokemon";

type CardProps = {
  pokemon: Pokemon;
  openModal: (id: string | number) => void;
};

export const Card = ({ pokemon, openModal }: CardProps) => {
 
  return (
    <div onClick={() => openModal(pokemon.id)} className="card">
      <h3>{pokemon.name}</h3>
      <p>{`mi id es ${pokemon.id}`}</p>
      <img src={pokemon.url} alt={pokemon.name} />
    </div>
  );
};
