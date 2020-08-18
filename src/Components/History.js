import React, { Component } from "react";
import "./History.css";
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

	async UNSAFE_componentWillMount() {
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
}

export default History;
