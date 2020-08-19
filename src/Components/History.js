import React, { Component } from "react";
import "./History.css";
import Moment from "react-moment";
import { MdArrowBack } from "react-icons/md";
import { withRouter } from "react-router-dom";
import _ from "lodash";

class History extends Component {
	constructor() {
		super();

		this.state = {
			games: {
				id: 0, // Game ID.
				date: "", // Date game was played.
				bestOf: "", // Single Game, Best of 3 or Best of 5.
				gameType: 0, // Game 11 or game 21.
				player1: "", // Player 1 name.
				player2: "", // Player 2 name.
				player1Score: [], // Array of player 1's game's scores.
				player2Score: [], // Array of player 2's game's scores.
			},
		};
	}

	async UNSAFE_componentWillMount() {
		// Fetch game data from database on component load.
		const fetchData = async () => {
			const result = await fetch(`/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
		};
		fetchData();
	}

	render() {
		let arrayGames = [];
		for (let i in this.state.games) arrayGames.push([i, this.state.games[i]]); // Get games from JSON to array format.
		return (
			<>
				<div className="history-holder">
					<button
						className="hist-back-button"
						onClick={this.props.history.goBack}
					>
						<MdArrowBack className="button-link" />
					</button>
					<h1 className="title">History</h1>

					<div className="scores-container">
						{/* Mapping each game into div component. */}
						{arrayGames.map((game, key) => (
							<div className="score-list" key={key}>
								<div className="flex">
									{/* If winner add winner class for styling or loser class. */}
									<h2
										className={
											game[1]["player1"] === game[1]["winner"]
												? "history-winner"
												: "history-loser"
										}
									>
										{game[1]["player1"]}
									</h2>
									<h2 className="separator"> vs </h2>
									<h2
										className={
											game[1]["player2"] === game[1]["winner"]
												? "history-winner"
												: "history-loser"
										}
									>
										{game[1]["player2"]}
									</h2>
								</div>

								<div className="game-scores">
									{/* Lodsh zip players scores for easy mapping. */}
									{_.zip(
										`${game[1]["player1Score"]}`.split(","),
										`${game[1]["player2Score"]}`.split(",")
									).map((scoresArray, key) => (
										<h3 key={key}>
											{`Game ${key + 1}: ${scoresArray[0]} - ${scoresArray[1]}`}
											<br />
										</h3>
									))}
								</div>

								<h3>
									<Moment format="DD MMMM YYYY HH:mm">{game[1]["date"]}</Moment>{" "}
									{/* Moment library for formatting dates. */}
								</h3>

								<h3>
									{game[1]["bestOf"]} - Game {game[1]["gameType"]}
								</h3>
							</div>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(History);
