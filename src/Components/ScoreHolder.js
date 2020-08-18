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
			status: "BAU",
			currentGame: 0,
			gameData: {
				id: 0,
				date: "",
				bestOf: "",
				gameType: 0,
				player1: "",
				player2: "",
				player1Score: [],
				player2Score: [],
			},
			numericalBestOf: 1,
		};

		this.firstScore = React.createRef();
		this.secondScore = React.createRef();

		this.updateScore = this.updateScore.bind(this); // Binding method with this instance.
		this.startNextGame = this.startNextGame.bind(this);
	}

	async componentDidMount() {
		const { gameDetails } = this.props.location.state;
		await this.setState({ gameDetails: gameDetails });
		await this.setState({ deuceScore: this.state.gameDetails.gameType });
		if (this.state.gameDetails.bestOf === "Best of 3") {
			this.setState({ numericalBestOf: 3 });
		} else if (this.state.gameDetails.bestOf === "Best of 5") {
			this.setState({ numericalBestOf: 5 });
		}
	}

	async UNSAFE_componentWillMount() {
		const fetchData = async () => {
			const result = await fetch(`/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
		};
		fetchData();
	}

	async startNextGame() {
		await this.setState({ currentGame: this.state.currentGame + 1 });
		let p1 = this.state.gameData.player1Score;
		p1.push(this.state.player1CurrScore);
		let p2 = this.state.gameData.player2Score;
		p2.push(this.state.player2CurrScore);
		if (this.state.gameDetails.bestOf === "Best of 3") {
			if (this.state.currentGame === 1) {
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
					player1Score: p1,
					player2Score: p2,
				};

				await this.setState({ gameData: gameData });
			} else if (this.state.currentGame === 2) {
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
					player1Score: p1,
					player2Score: p2,
				};

				await this.setState({ gameData: gameData });
			} else {
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
					player1Score: p1,
					player2Score: p2,
				};

				await this.setState({ gameData: gameData });

				this.state.games[
					Object.keys(this.state.games).length
				] = this.state.gameData;
				await fetch(`api/game/insert`, {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(gameData),
				});
			}
		} else {
		}
		this.firstScore.current.resetScore();
		this.secondScore.current.resetScore();
		await this.setState({
			player1CurrScore: 0,
			player2CurrScore: 0,
			status: "BAU",
			globalDeuce: false,
			deuceScore: this.state.gameDetails.gameType,
		});
		const card = document.querySelectorAll(".score");
		card[0].classList.remove("winner");
		card[1].classList.remove("loser");
		card[0].classList.remove("loser");
		card[1].classList.remove("winner");
	}

	async updateScore(player, score, deuceScore) {
		player === 0
			? this.setState({ player1CurrScore: score, deuceScore: deuceScore })
			: this.setState({ player2CurrScore: score, deuceScore: deuceScore });

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
				await this.setState({
					status: `Game ${this.state.gameDetails.player1}!`,
				});
			} else {
				card[0].classList.add("loser");
				card[1].classList.add("winner");
				await this.setState({
					status: `Game ${this.state.gameDetails.player2}!`,
				});
			}
			console.log(this.state.numericalBestOf);
			console.log(this.state.currentGame);
			if (this.state.numericalBestOf - 1 === this.state.currentGame) {
				document.querySelector(".next-button").classList.remove("clickable");
			} else {
				document.querySelector(".next-button").classList.add("clickable");
			}
		} else if (
			this.state.player1CurrScore === this.state.deuceScore - 1 &&
			this.state.player2CurrScore === this.state.deuceScore - 1
		) {
			await this.setState({ status: "Deuce!" });
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
			document.querySelector(".next-button").classList.remove("clickable");
		} else if (
			this.state.player1CurrScore === this.state.deuceScore - 1 ||
			this.state.player2CurrScore === this.state.deuceScore - 1
		) {
			await this.setState({ status: "Game Point!" });
			await this.setState({
				gameDetails: {
					gameType: this.state.gameDetails.gameType,
					bestOf: this.state.gameDetails.bestOf,
					player1: this.state.gameDetails.player1,
					player2: this.state.gameDetails.player2,
					deuce: false,
				},
			});
			document.querySelector(".next-button").classList.remove("clickable");
		} else {
			if (this.state.globalDeuce) {
				if (
					this.state.player1CurrScore === this.state.deuceScore - 2 ||
					this.state.player2CurrScore === this.state.deuceScore - 2
				) {
					await this.setState({ status: "Deuce!" });
				} else {
					await this.setState({ status: "BAU" });
				}
			} else {
				await this.setState({ status: "BAU" });
			}

			await this.setState({
				gameDetails: {
					gameType: this.state.gameDetails.gameType,
					bestOf: this.state.gameDetails.bestOf,
					player1: this.state.gameDetails.player1,
					player2: this.state.gameDetails.player2,
					deuce: false,
				},
			});
			document.querySelector(".next-button").classList.remove("clickable");
		}
	}

	render() {
		return (
			<>
				<div className="score-holder">
					<h1 className="game-type">Game {this.state.gameDetails.gameType}</h1>
					<h2 className="best-of">{this.state.gameDetails.bestOf}</h2>
					<button
						className={`next-button ${
							this.state.gameDetails.bestOf !== "Single Game"
								? "shown"
								: "hidden"
						}`}
						onClick={this.startNextGame}
					>
						Next Game
					</button>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player1}
						updateScore={this.updateScore}
						id={0}
						className="score1"
						deuce={this.state.gameDetails.deuce}
						deuceScore={this.state.deuceScore}
						ref={this.firstScore}
					/>
					<h2 className="status">{this.state.status}</h2>{" "}
					{/* TODO do this properly with state. */}
					<h1 className="separator">-</h1>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player2}
						updateScore={this.updateScore}
						id={1}
						className="score2"
						deuce={this.state.gameDetails.deuce}
						deuceScore={this.state.deuceScore}
						ref={this.secondScore}
					/>
				</div>
			</>
		);
	}
}

export default ScoreHolder;
