const BASE_URL = "https://pokeapi.co/api/v2";

// Tipos mínimos usados en la app
interface NamedAPIResource {
  name: string;
  url: string;
}
export interface PokemonTypeSlot {
  slot: number;
  type: NamedAPIResource;
}
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}
export interface PokemonSprites {
  front_default?: string | null;
  other?: { ["official-artwork"]?: { front_default?: string | null } };
}
export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}
export interface PokemonApi {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
  height: number;
  weight: number;
  abilities: PokemonAbility[];
}
export interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}
export interface PokemonCharacteristic {
  descriptions: { description: string; language: { name: string } }[];
}

export const getPokemons = async (limit = 20, offset = 0) => {
  const resp = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await resp.json();
  console.log(data);
  return data.results;
};

export const getPokemonByName = async (
  nameOrId: string | number
): Promise<PokemonApi> => {
  const resp = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!resp.ok)
    throw new Error(`Pokemon not found: ${nameOrId} (status ${resp.status})`);
  const data = await resp.json();
  console.log(data);
  return data;
};

export const getDescription = async (
  id: number | string
): Promise<PokemonCharacteristic> => {
  const resp = await fetch(`${BASE_URL}/characteristic/${id}/`);
  if (!resp.ok) {
    throw new Error(
      `Description not found for id ${id} (status ${resp.status})`
    );
  }
  const data = await resp.json();
  console.log(data);
  return data;
};

export const getSpecies = async (
  id: number | string
): Promise<PokemonSpecies> => {
  const resp = await fetch(`${BASE_URL}/pokemon-species/${id}/`);
  if (!resp.ok) {
    throw new Error(`Species not found for id ${id} (status ${resp.status})`);
  }
  const data = await resp.json();
  console.log(data);
  return data;
};
