import React, { forwardRef, useEffect, useState } from "react";

import { MdArrowBack } from "react-icons/md";
// import { AiOutlineReload } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import Pusher from "pusher-js";
import FlipMove from "react-flip-move";
import HistoryItem from "../components/HistoryItem";

const History = forwardRef((props, ref) => {
	// const [isFetching, setIsFetching] = useState(true);
	const [games, setGames] = useState({
		date: "", // Date game was played.
		bestOf: "", // Single Game, Best of 3 or Best of 5.
		gameType: 0, // Game 11 or game 21.
		player1: "", // Player 1 name.
		player2: "", // Player 2 name.
		player1Score: [], // Array of player 1's game's scores.
		player2Score: [], // Array of player 2's game's scores.
	});
	const history = useHistory();

	useEffect(() => {
		// Fetch game data from database on component load.
		const fetchData = async () => {
			// await setIsFetching(true);
			const result = await fetch(
				`https://table-time.herokuapp.com/api/matches`,
				{
					method: "get",
					headers: {
						"auth-token":
							localStorage.getItem("table-user") !== null
								? localStorage.getItem("table-user")
								: "",
					},
				}
			);

			const body = await result.json();
			await setGames(body);
			// await setIsFetching(false);
		};
		fetchData();

		const pusher = new Pusher("e541d4f20f806b61b5d7", {
			cluster: "ap2",
		});

		const channel = pusher.subscribe("matches");
		channel.bind("deleted", (data) => {
			fetchData();
		});
		channel.bind("inserted", (data) => {
			fetchData();
		});
	}, []);

	let arrayGames = [];
	for (let i in games) arrayGames.push([i, games[i]]); // Get games from JSON to array format.
	return (
		<>
			<div className="history-holder">
				{/* {isFetching ? (
					<AiOutlineReload className="icon" />
				) : ( */}
				<>
					<div className="flex">
						<button className="hist-back-button" onClick={history.goBack}>
							<MdArrowBack className="button-link" />
						</button>
						<h1 className="title">History</h1>
					</div>

					<div className="scores-container" ref={ref}>
						{/* Mapping each game into div component. */}
						<FlipMove className="flip">
							{arrayGames.reverse().map((game, key) => (
								<HistoryItem game={game} setGames={setGames} key={key} />
							))}
						</FlipMove>
					</div>
				</>
				{/* )} */}
			</div>
		</>
	);
});

export default History;
