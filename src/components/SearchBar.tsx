import { useState, useEffect } from "react";
import { getPokemonByName } from "../services/pokeapi";
import { Card } from "./Card";
import type { PokemonApi } from "../services/pokeapi";

type SearchBarProps = {
  openModal: (id: string | number) => void;
};

export const SearchBar = ({ openModal }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState<PokemonApi | null>(null);
  const [error, setError] = useState("");

  async function handleSearch(q: string) {
    try {
      setError("");
      const result = await getPokemonByName(q);
      setPokemon(result);
    } catch {
      setPokemon(null);
      setError("Pokemon not found");
    }
  }

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      setPokemon(null);
      setError("");
      return;
    }
    const id = setTimeout(() => handleSearch(q), 400); 
    return () => clearTimeout(id);
  }, [query]);

  const id = pokemon?.id;

  return (
    <div>
      <input
        type="text"
        required
        placeholder="Search pokemon by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error && <p>{error}</p>}
      {pokemon && (
        <Card
          pokemon={{
            id: pokemon.id,
            name: pokemon.name,
            url:
              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            types: pokemon.types.map((t) => t.type.name),
            height: pokemon.height,
            weight: pokemon.weight,
            abilities: (pokemon.abilities || []).map((a) => a.ability.name),
          }}
          openModal={openModal}
        />
      )}
    </div>
  );
};
