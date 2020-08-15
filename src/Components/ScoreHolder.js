import React from "react";
import "./ScoreHolder.css";
import Score from "./Score";

const ScoreHolder = () => (
	<>
		<div className="holder">
			<Score />
			<h1>-</h1>
			<Score />
		</div>
	</>
);

export default ScoreHolder;
