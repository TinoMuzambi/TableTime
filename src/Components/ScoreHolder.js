import React, { Component } from "react";
import "./ScoreHolder.css";
import Score from "./Score";

const games = {
	// Temporary JSON object for game data.
	"0": {
		bestOf: "Single Game",
		gameType: 11,
		player1: "Talent",
		player2: "David",
		player1Score: { 1: 11 },
		player2Score: { 1: 8 },
	},
	"1": {
		bestOf: "Best of 3",
		gameType: 11,
		player1: "Tino",
		player2: "David",
		player1Score: { 1: 11, 2: 8, 3: 11 },
		player2Score: { 1: 8, 2: 11, 3: 5 },
	},
	"2": {
		bestOf: "Best of 3",
		gameType: 21,
		player1: "Tino",
		player2: "Bob",
		player1Score: { 1: 21, 2: 8, 3: 21 },
		player2Score: { 1: 8, 2: 21, 3: 19 },
	},
};

class ScoreHolder extends Component {
	constructor() {
		super();

		this.state = {
			gameDetails: {
				gameType: 11,
				bestOf: "",
				player1: "",
				player2: "",
				deuce: false,
			},
			player1CurrScore: 0,
			player2CurrScore: 0,
		};

		this.updateScore = this.updateScore.bind(this); // Binding method with this instance.
	}

	componentDidMount() {
		const { gameDetails } = this.props.location.state;
		this.setState({ gameDetails: gameDetails });
	}

	updateScore(player, score) {
		player === 0
			? this.setState({ player1CurrScore: score })
			: this.setState({ player2CurrScore: score });

		const status = document.querySelector(".status");

		if (
			// Update status of game
			this.state.player1CurrScore === this.state.gameDetails.gameType ||
			this.state.player2CurrScore === this.state.gameDetails.gameType
		) {
			const card = document.querySelectorAll(".score");
			if (this.state.player1CurrScore > this.state.player2CurrScore) {
				// Make winning score card green and update status.
				card[0].classList.add("winner");
				status.innerHTML = `Game ${this.state.gameDetails.player1}!`;
			} else {
				card[1].classList.add("winner");
				status.innerHTML = `Game ${this.state.gameDetails.player2}!`;
			}
			const gameData = {
				// Temporary appending to game data.
				bestOf: this.state.gameDetails.bestOf,
				gameType: this.state.gameDetails.gameType,
				player1: this.state.gameDetails.player1,
				player2: this.state.gameDetails.player2,
				player1Score: { 1: this.state.player1CurrScore },
				player2Score: { 1: this.state.player2CurrScore },
			};
			games["3"] = gameData;
			console.log(games);
		} else if (
			this.state.player1CurrScore === this.state.gameDetails.gameType - 1 &&
			this.state.player2CurrScore === this.state.gameDetails.gameType - 1
		) {
			status.innerHTML = "Deuce!";
			this.setState({
				gameDetails: {
					gameType: this.state.gameDetails.gameType,
					bestOf: this.state.gameDetails.bestOf,
					player1: this.state.gameDetails.player1,
					player2: this.state.gameDetails.player2,
					deuce: true,
				},
			});
			console.log(this.state.gameDetails.deuce);
		} else if (
			this.state.player1CurrScore === this.state.gameDetails.gameType - 1 ||
			this.state.player2CurrScore === this.state.gameDetails.gameType - 1
		) {
			status.innerHTML = "Game Point!";
			this.setState({
				gameDetails: {
					gameType: this.state.gameDetails.gameType,
					bestOf: this.state.gameDetails.bestOf,
					player1: this.state.gameDetails.player1,
					player2: this.state.gameDetails.player2,
					deuce: false,
				},
			});
			console.log(this.state.gameDetails.deuce);
		} else {
			status.innerHTML = "BAU";
			this.setState({
				gameDetails: {
					gameType: this.state.gameDetails.gameType,
					bestOf: this.state.gameDetails.bestOf,
					player1: this.state.gameDetails.player1,
					player2: this.state.gameDetails.player2,
					deuce: false,
				},
			});
			console.log(this.state.gameDetails.deuce);
		}
	}

	render() {
		return (
			<>
				<div className="score-holder">
					<h1 className="game-type">Game {this.state.gameDetails.gameType}</h1>
					<h2 className="best-of">{this.state.gameDetails.bestOf}</h2>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player1}
						updateScore={this.updateScore}
						id={0}
						className="score1"
						deuce={this.state.gameDetails.deuce}
					/>

					<h2 className="status">BAU</h2>

					<h1 className="separator">-</h1>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player2}
						updateScore={this.updateScore}
						id={1}
						className="score2"
						deuce={this.state.gameDetails.deuce}
					/>
				</div>
			</>
		);
	}
}

export default ScoreHolder;
