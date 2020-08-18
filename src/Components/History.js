import React, { useState, useEffect } from "react";
import "./History.css";
// import games from "../data/games";
import Moment from "react-moment";

const History = () => {
	const [game, setGames] = useState({
		id: 0,
		date: "",
		bestOf: "",
		gameType: 0,
		player1: "",
		player2: "",
		player1Score: {},
		player2Score: {},
	});

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch(`/api/game/2`);
			const body = await result.json();
			setGames(body);
		};
		fetchData();
	}, []);

	const addO = async () => {
		const result = await fetch(`api/game/2/temp`, { method: "post" });
		const body = await result.json();
		setGames(body);
	};

	return (
		<>
			<div className="history-holder">
				<h1 className="title">History</h1>

				<div className="scores-container">
					{/* Mapping each game into div component. */}
					{/* {games.map((game, key) => ( */}
					<div className="score-list">
						<h2>
							{game.player1} vs {game.player2}
						</h2>
						<h3>
							<Moment format="DD MMMM YYYY">{game.date}</Moment>{" "}
							{/* Moment library for formatting dates. */}
						</h3>
						<h3>
							{game.player1Score[1]} - {game.player2Score[1]}
						</h3>
					</div>
					{/* ))} */}
				</div>
			</div>
		</>
	);
};

export default History;
