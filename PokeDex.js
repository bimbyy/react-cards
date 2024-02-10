import React from "react";
import PokemonCard from "./PokemonCard";
import PokemonSelect from "./PokemonSelect";
import "./PokeDex.css";
import { useAxios } from "./hooks"; // Ensure this is correctly imported

function PokeDex() {
  // The second item in the array returned by useAxios is the function to add new data
  const [pokemon, addPokemon, clearPokemon] = useAxios("https://pokeapi.co/api/v2/pokemon/");

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        {/* Ensure PokemonSelect is correctly calling addPokemon with the selected Pokemon's name */}
        <PokemonSelect add={(name) => addPokemon(name)} />
        <button onClick={clearPokemon}>Clear all pokemon cards</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(p => (
          <PokemonCard
            key={p.id || p.name} // Adjust key to ensure uniqueness; ideally use a unique identifier
            front={p.sprites.front_default}
            back={p.sprites.back_default}
            name={p.name}
            stats={p.stats.map(stat => ({
              value: stat.base_stat,
              name: stat.stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
