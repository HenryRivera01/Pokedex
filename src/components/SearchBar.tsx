import { useState } from "react";
import { getPokemonByName } from "../services/pokeapi";
import type { Pokemon } from "../types/Pokemon";
import { Card } from "./Card";


export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState("");

  async function handleSearch() {
    try {
      setError("");
      const result = await getPokemonByName(query);
      setPokemon(result);
    } catch (err) {
      console.log(err);
      setPokemon(null);
      setError("Pokemon not found");
    }
  }

  const id = pokemon?.id

  return (
    <div>
      <input
      type="text"
      required
      placeholder="Search pokemon by name"
      value={query}
      onChange={ (e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {pokemon && (
        <Card
          pokemon={{
            id: pokemon.id,
            name: pokemon.name,
            url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          }}
        />
      )}
    </div>
  );
};
