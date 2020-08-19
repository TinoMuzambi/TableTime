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
				id: 0,
				date: "",
				bestOf: "",
				gameType: 0,
				player1: "",
				player2: "",
				player1Score: [],
				player2Score: [],
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
