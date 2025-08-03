import { useState } from "react";
import { usePokemons } from "../hooks/usePokemons";
import { Card } from "./Card";
import { SearchBar } from "./SearchBar";

export const CardList = () => {
  const limit = 20; // Number of pokemons per page

  const [offset, setOffset] = useState(0);
  const { pokemons, loading } = usePokemons(offset, limit);

  function openModal(clickedPokemonID: string | number) {
    console.log("clickeaste la card del pokemon con id", clickedPokemonID);
  }

  if (loading) return <p>Loading Pokemons...</p>;

  return (
    <section className="card-list-container">
      <h2>Pokemons</h2>
      <SearchBar openModal={openModal} />
      <button onClick={() => setOffset(Math.max(0, offset - limit))}>
        Prev Page
      </button>
      <button onClick={() => setOffset(offset + limit)}>Next Page</button>
      <article className="card-list">
        {pokemons.map((p, i) => {
          return <Card openModal={openModal} key={i} pokemon={p} />;
        })}
      </article>
    </section>
  );
};
