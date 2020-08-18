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
				deuce: false,
			},
			player1CurrScore: 0,
			player2CurrScore: 0,
			deuceScore: 0,
			globalDeuce: false, // Fix bug 9 - 12.
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

		this.updateScore = this.updateScore.bind(this); // Binding method with this instance.
	}

	async componentDidMount() {
		const { gameDetails } = this.props.location.state;
		await this.setState({ gameDetails: gameDetails });
		this.setState({ deuceScore: this.state.gameDetails.gameType });
	}

	async UNSAFE_componentWillMount() {
		const fetchData = async () => {
			const result = await fetch(`/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
		};
		fetchData();
	}

	async updateScore(player, score, deuceScore) {
		player === 0
			? this.setState({ player1CurrScore: score, deuceScore: deuceScore })
			: this.setState({ player2CurrScore: score, deuceScore: deuceScore });

		const status = document.querySelector(".status");

		if (
			// Update status of game
			this.state.player1CurrScore === this.state.deuceScore ||
			this.state.player2CurrScore === this.state.deuceScore
		) {
			const card = document.querySelectorAll(".score");
			if (this.state.player1CurrScore > this.state.player2CurrScore) {
				// Make winning score card green and update status.
				card[0].classList.add("winner");
				card[1].classList.add("loser");
				status.innerHTML = `Game ${this.state.gameDetails.player1}!`;
			} else {
				card[0].classList.add("loser");
				card[1].classList.add("winner");
				status.innerHTML = `Game ${this.state.gameDetails.player2}!`;
			}
			const gameData = {
				// Temporary appending to game data.
				id: Object.keys(this.state.games).length.toString(),
				date:
					new Date().getFullYear() +
					"-" +
					(new Date().getMonth() + 1) +
					"-" +
					new Date().getDate() +
					" " +
					new Date().getHours() +
					":" +
					new Date().getMinutes() +
					":" +
					new Date().getSeconds(),
				bestOf: this.state.gameDetails.bestOf,
				gameType: this.state.gameDetails.gameType,
				player1: this.state.gameDetails.player1,
				player2: this.state.gameDetails.player2,
				player1Score: [this.state.player1CurrScore],
				player2Score: [this.state.player2CurrScore],
			};
			this.state.games[Object.keys(this.state.games).length] = gameData;
			await fetch(`api/game/insert`, {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(gameData),
			});
		} else if (
			this.state.player1CurrScore === this.state.deuceScore - 1 &&
			this.state.player2CurrScore === this.state.deuceScore - 1
		) {
			status.innerHTML = "Deuce!";
			await this.setState({
				gameDetails: {
					gameType: this.state.gameDetails.gameType,
					bestOf: this.state.gameDetails.bestOf,
					player1: this.state.gameDetails.player1,
					player2: this.state.gameDetails.player2,
					deuce: true,
				},
				globalDeuce: true,
			});
		} else if (
			this.state.player1CurrScore === this.state.deuceScore - 1 ||
			this.state.player2CurrScore === this.state.deuceScore - 1
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
		} else {
			if (this.state.globalDeuce) {
				if (
					this.state.player1CurrScore === this.state.deuceScore - 2 ||
					this.state.player2CurrScore === this.state.deuceScore - 2
				) {
					status.innerHTML = "Deuce!";
				} else {
					status.innerHTML = "BAU";
				}
			} else {
				status.innerHTML = "BAU";
			}

			this.setState({
				gameDetails: {
					gameType: this.state.gameDetails.gameType,
					bestOf: this.state.gameDetails.bestOf,
					player1: this.state.gameDetails.player1,
					player2: this.state.gameDetails.player2,
					deuce: false,
				},
			});
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
						deuceScore={this.state.deuceScore}
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
						deuceScore={this.state.deuceScore}
					/>
				</div>
			</>
		);
	}
}

export default ScoreHolder;
