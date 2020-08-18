import React, { Component } from "react";
import "./History.css";
// import games from "../data/games";
import Moment from "react-moment";

class History extends Component {
	constructor() {
		super();

		this.state = {
			games: {
				id: 0,
				date: "",
				bestOf: "",
				gameType: 0,
				player1: "",
				player2: "",
				player1Score: { "1": 0 },
				player2Score: { "1": 0 },
			},
		};
	}

	async componentWillMount() {
		const fetchData = async () => {
			const result = await fetch(`/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
		};
		fetchData();
	}

	render() {
		let arrayGames = [];
		for (let i in this.state.games) arrayGames.push([i, this.state.games[i]]);
		return (
			<>
				<div className="history-holder">
					<h1 className="title">History</h1>

					<div className="scores-container">
						{/* Mapping each game into div component. */}
						{arrayGames.map((game, key) => (
							<div className="score-list" key={key}>
								<h2>
									{game[1]["player1"]} vs {game[1]["player2"]}
								</h2>
								<h3>
									<Moment format="DD MMMM YYYY">{game["date"]}</Moment>{" "}
									{/* Moment library for formatting dates. */}
								</h3>
								<h3>
									{JSON.stringify(game[1]["player1Score"])} -{" "}
									{JSON.stringify(game[1]["player2Score"])}
								</h3>
							</div>
						))}
					</div>
				</div>
			</>
		);
	}

	// const addO = async () => {
	// 	const result = await fetch(`api/game/2/temp`, { method: "post" });
	// 	const body = await result.json();
	// 	setGames(body);
	// };

	// const games = {
	// 	"0": {
	// 		date: "Monday 03 August 2020",
	// 		bestOf: "Single Game",
	// 		gameType: 11,
	// 		player1: "Talent",
	// 		player2: "David",
	// 		player1Score: { 1: 11 },
	// 		player2Score: { 1: 8 },
	// 	},
	// 	"1": {
	// 		date: "Tuesday 04 August 2020",
	// 		bestOf: "Best of 3",
	// 		gameType: 11,
	// 		player1: "Tino",
	// 		player2: "David",
	// 		player1Score: { 1: 11, 2: 8, 3: 11 },
	// 		player2Score: { 1: 8, 2: 11, 3: 5 },
	// 	},
	// 	"2": {
	// 		date: "Wednesday 05 August 2020",
	// 		bestOf: "Best of 3",
	// 		gameType: 21,
	// 		player1: "Tino",
	// 		player2: "Bob",
	// 		player1Score: { 1: 21, 2: 8, 3: 21 },
	// 		player2Score: { 1: 8, 2: 21, 3: 19 },
	// 	},
	// };
}

export default History;
