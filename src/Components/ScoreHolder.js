import React, { Component } from "react";
import "./ScoreHolder.css";
import Score from "./Score";

class ScoreHolder extends Component {
	constructor() {
		super();

		this.state = {
			gameDetails: {
				gameType: 11,
				bestOf: "",
				player1: "",
				player2: "",
			},
			player1CurrScore: 0,
			player2CurrScore: 0,
		};

		this.updateScore = this.updateScore.bind(this);
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
			this.state.player1CurrScore === this.state.gameDetails.gameType ||
			this.state.player2CurrScore === this.state.gameDetails.gameType
		) {
			const card = document.querySelectorAll(".score");
			if (this.state.player1CurrScore > this.state.player2CurrScore) {
				card[0].classList.add("winner");
				status.innerHTML = `Game ${this.state.gameDetails.player1}!`;
			} else {
				card[1].classList.add("winner");
				status.innerHTML = `Game ${this.state.gameDetails.player2}!`;
			}
		} else if (
			this.state.player1CurrScore === this.state.gameDetails.gameType - 1 &&
			this.state.player2CurrScore === this.state.gameDetails.gameType - 1
		) {
			status.innerHTML = "Deuce!";
		} else if (
			this.state.player1CurrScore === this.state.gameDetails.gameType - 1 ||
			this.state.player2CurrScore === this.state.gameDetails.gameType - 1
		) {
			status.innerHTML = "Game Point!";
		} else {
			status.innerHTML = "BAU";
		}
	}

	render() {
		return (
			<>
				<div className="score-holder">
					<h1 className="game-type">Game {this.state.gameDetails.gameType}</h1>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player1}
						updateScore={this.updateScore}
						id={0}
						className="score1"
					/>

					<h2 className="status">BAU</h2>

					<h1 className="separator">-</h1>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player2}
						updateScore={this.updateScore}
						id={1}
						className="score2"
					/>
				</div>
			</>
		);
	}
}

export default ScoreHolder;
