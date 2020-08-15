import React from "react";
import "./Score.css";

const Score = () => (
	<>
		<div className="score">
			<h1 className="curr-score">10</h1>
			<div className="buttons">
				<button className="button plus">+</button>
				<button className="button minus">-</button>
			</div>
			<h1 className="player">Tino</h1>
		</div>
	</>
);

export default Score;
