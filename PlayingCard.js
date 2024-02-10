import React from "react";
import backOfCard from "./back.png";
import "./PlayingCard.css";
import { useFlip } from './hooks';

function PlayingCard({ front, back = backOfCard }) {
  const [isFacingUp, toggleFlip] = useFlip(); // Using useFlip hook

  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={toggleFlip} // Updated to use toggleFlip from useFlip hook
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;