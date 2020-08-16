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
			status.innerHTML = "Game!";
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
			status.innerHTML = "";
		}
	}

	render() {
		return (
			<>
				<div className="holder">
					<h1 className="game-type">Game {this.state.gameDetails.gameType}</h1>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player1}
						updateScore={this.updateScore}
						id={0}
					/>
					<div className="middle">
						<h2 className="status">{""}</h2>
						<h1>-</h1>
					</div>

					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player2}
						updateScore={this.updateScore}
						id={1}
					/>
				</div>
			</>
		);
	}
}

export default ScoreHolder;
