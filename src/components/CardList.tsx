import { useState } from "react";
import { usePokemons } from "../hooks/usePokemons"
import { Card } from "./Card";

export const CardList = () => {

const limit = 20; // Number of pokemons per page

const [offset, setOffset] = useState(0);

const {pokemons, loading} = usePokemons(offset, limit);

  if(loading) return <p>Loading Pokemons...</p> 

  return (
    <article className="card-list">
      <button onClick={() => setOffset(Math.max(0, offset - limit))}>Prev Page</button>
      <button onClick={() =>setOffset(offset + limit)}>Next Page</button>
      {pokemons.map((p, i)=>{
           return < Card key={i} pokemon={p}/>
      })}
    </article>
  )
}
