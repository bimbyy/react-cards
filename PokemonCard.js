import React from "react";
import "./PokemonCard.css";
import { useFlip } from './hooks';

/* Renders a single pokemon card. */
function PokemonCard({ front, back, name, stats }) {
  const [isFacingUp, toggleFlip] = useFlip(true); // Initialize useFlip with true for the card facing up initially

  return (
    <div onClick={toggleFlip} className="PokemonCard Card"> {/* Changed flipCard to toggleFlip */}
      {isFacingUp ? (
        <div className="PokemonCard-front">
          <img src={front} alt={`${name} front`} /> {/* Corrected template literal syntax */}
          <div>
            <p className="PokemonCard-name">{name}</p>
            <ul className="PokemonCard-stats">
              {stats.map(stat => (
                <li key={stat.name}>
                  <em>{stat.name}</em>: {stat.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="PokemonCard-back">
          <img src={back} alt={`${name} back`} /> {/* Corrected template literal syntax */}
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
