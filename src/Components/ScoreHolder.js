import React from "react";
import "./ScoreHolder.css";
import Score from "./Score";

const ScoreHolder = () => (
	<>
		<div className="holder">
			<h1 className="game-type">Game {21}</h1>
			<Score gameType={21} player="Tino" />
			<h1>-</h1>
			<Score gameType={21} player="Talent" />
		</div>
	</>
);

export default ScoreHolder;
