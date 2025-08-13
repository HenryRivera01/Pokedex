import { useState } from "react";
import { usePokemons } from "../hooks/usePokemons";
import { Card } from "./Card";
import { SearchBar } from "./SearchBar";
import { getDescription, getSpecies } from "../services/pokeapi";
import { getPokemonByName } from "../services/pokeapi";
import { Modal } from "./Modal";

export const CardList = () => {
  const limit = 20; // Number of pokemons per page

  const [offset, setOffset] = useState(0);
  const { pokemons, loading } = usePokemons(offset, limit);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<null | {
    id: number;
    name: string;
    image: string;
    types: string[];
    stats: { name: string; base: number }[];
    height: number;
    weight: number;
    description: string;
  }>(null);

  function cleanText(t: string) {
    return t
      .replace(/\f|\n|\r/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  async function openModal(clickedPokemonID: string | number) {
    const id = Number(clickedPokemonID);
    try {
      const [pokemon, species, characteristic] = await Promise.all([
        getPokemonByName(id),
        getSpecies(id),
        getDescription(id).catch(() => null),
      ]);

      const types: string[] = (pokemon.types || []).map((t) => t.type.name);
      const stats: { name: string; base: number }[] = (pokemon.stats || []).map(
        (s) => ({ name: s.stat.name, base: s.base_stat })
      );
      const image =
        pokemon.sprites?.other?.["official-artwork"]?.front_default ||
        pokemon.sprites?.front_default ||
        "";

      const ftEs = species.flavor_text_entries?.find((f) => f.language.name === "es");
      const ftEn = species.flavor_text_entries?.find((f) => f.language.name === "en");
      let description: string = ftEs?.flavor_text || ftEn?.flavor_text || "";

      if (!description && characteristic) {
        const chEs = characteristic.descriptions?.find((d) => d.language.name === "es");
        const chEn = characteristic.descriptions?.find((d) => d.language.name === "en");
        description = chEs?.description || chEn?.description || "";
      }
      description = cleanText(description || "");

      setSelected({
        id,
        name: pokemon.name,
        image,
        types,
        stats,
        height: pokemon.height,
        weight: pokemon.weight,
        description,
      });
      setModalOpen(true);
    } catch (e) {
      console.error(e);
    }
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
      {modalOpen && selected && (
        <Modal onClose={() => setModalOpen(false)} data={selected} />
      )}
    </section>
  );
};
    