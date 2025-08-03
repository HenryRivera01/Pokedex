const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (limit = 20, offset = 0) => {
  const resp = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await resp.json();
  console.log(data);
  return data.results;
};

export const getPokemonByName = async (name: string) => {
  const resp = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!resp) throw new Error("Pokemon not found");
  const data = await resp.json();
  console.log(data);
  return data;
};

export const getCharacteristics = async (id: number) => {
  const resp = await fetch(`${BASE_URL}characteristic/{id}/${id}`);
  if (!resp) throw new Error("Pokemon not found");
  const data = await resp.json();
  console.log(data);
  return data;
};


