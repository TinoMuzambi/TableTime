import React, { Component } from "react";
import Score from "./Score";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { MdArrowBack } from "react-icons/md";
import { withRouter } from "react-router-dom";

class ScoreHolder extends Component {
	constructor() {
		super();

		this.state = {
			gameDetails: {
				gameType: 11, // Game 11 or game 21.
				bestOf: "", // Single Game, Best of 3 or Best of 5.
				player1: "", // Player 1 name.
				player2: "", // Player 2 name.
				deuce: false, // Is game in deuce? TODO fix 11 - 9 bug on decScore.
			},
			player1CurrScore: 0, // Player 1's current game's score.
			player2CurrScore: 0, // Player 2's current game's score.
			deuceScore: 0, // Deuce score represents score needed to win. Defaults to gameType.
			globalDeuce: false, // Flag to see if game was ever in deuce.
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
			status: "BAU", // Current game status. BAU (Business As Usual), Game Point, Deuce or Game.
			currentGame: 1, // Current game number.
			gameData: {
				id: 0, // Game ID.
				date: "", // Date game was played.
				bestOf: "", // Single Game, Best of 3 or Best of 5.
				gameType: 0, // Game 11 or game 21.
				player1: "", // Player 1 name.
				player2: "", // Player 2 name.
				player1Score: [], // Array of player 1's game's scores.
				player2Score: [], // Array of player 2's game's scores.
			},
			numericalBestOf: 1, // Numerical version of bestOf
			winner: "", // Winner of the match.
		};

		this.firstScore = React.createRef(); // Ref to first Score component for player 1.
		this.secondScore = React.createRef(); // Ref to first Score component for player 2.

		this.updateScore = this.updateScore.bind(this); // Binding method with this instance.
		this.startNextGame = this.startNextGame.bind(this);
		this.startNewGame = this.startNewGame.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.isMatchOver = this.isMatchOver.bind(this);
	}

	async componentDidMount() {
		const { gameDetails } = this.props.location.state; // Get game details from StartGame component and set state.
		await this.setState({ gameDetails: gameDetails });
		await this.setState({ deuceScore: this.state.gameDetails.gameType });
		if (this.state.gameDetails.bestOf === "Best of 3") {
			this.setState({ numericalBestOf: 3 });
		} else if (this.state.gameDetails.bestOf === "Best of 5") {
			this.setState({ numericalBestOf: 5 });
		}
	}

	async UNSAFE_componentWillMount() {
		// Get data from database on component load.
		const fetchData = async () => {
			const result = await fetch(`https://table-time.herokuapp.com/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
		};
		fetchData();
	}

	handleConfirm() {
		// Confirm alert dialog for starting a new game.
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="confirm-new">
						<h1 className="confirm-new-title">Start New Game</h1>
						<p className="confirm-new-text">
							Are you sure you want to start a new game?
						</p>
						<button
							onClick={() => {
								this.startNewGame();
								onClose();
							}}
							className="confirm-new-yes"
						>
							Yes
						</button>
						<button onClick={onClose} className="confirm-new-no">
							No
						</button>
					</div>
				);
			},
		});
	}

	handleWinner() {
		// Confirm alert for showing winner.
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="confirm-new">
						<h1 className="confirm-new-title">{`Game, Set Match ${this.state.winner}!`}</h1>
						<p className="confirm-new-text">
							{`And the winner is ${this.state.winner}`}
						</p>
						<button
							onClick={() => {
								this.startNewGame();
								onClose();
							}}
							className="confirm-new-yes"
						>
							Ok
						</button>
					</div>
				);
			},
		});
	}

	async startNewGame() {
		// Reset everything and start new game.
		this.firstScore.current.resetScore();
		this.secondScore.current.resetScore();
		await this.setState({
			player1CurrScore: 0,
			player2CurrScore: 0,
			status: "BAU",
			globalDeuce: false,
			deuceScore: this.state.gameDetails.gameType,
			currentGame: 1,
			gameData: {
				id: 0,
				date: "",
				bestOf: "",
				gameType: 0,
				player1: "",
				player2: "",
				player1Score: [],
				player2Score: [],
				winner: "",
			},
		});
		const card = document.querySelectorAll(".score");
		card[0].classList.remove("winner");
		card[1].classList.remove("loser");
		card[0].classList.remove("loser");
		card[1].classList.remove("winner");
		document.querySelector(".next-button").classList.remove("clickable");
	}

	async startNextGame() {
		// Start next game for multi game matches and reset relevant items.
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
		await this.setState({ currentGame: this.state.currentGame + 1 });
		document.querySelector(".next-button").classList.remove("clickable");
	}

	isMatchOver() {
		// Check if match is over for multi game matches.
		const player1Score = this.state.gameData.player1Score;
		const player2Score = this.state.gameData.player2Score;
		const bestOf = this.state.numericalBestOf;

		let player1Games = 0;
		let player2Games = 0;

		for (let index = 0; index < player1Score.length; index++) {
			if (player1Score[index] > player2Score[index]) {
				player1Games++;
			} else {
				player2Games++;
			}
		}

		if (player1Games > player2Games) {
			return player1Games >= Math.ceil(bestOf / 2);
		}
		return player2Games >= Math.ceil(bestOf / 2);
	}

	async updateScore(player, score, deuceScore) {
		// Get updated score from child Score components.
		player === 0
			? await this.setState({ player1CurrScore: score, deuceScore: deuceScore })
			: await this.setState({
					player2CurrScore: score,
					deuceScore: deuceScore,
			  });

		if (
			// Update status of game
			this.state.player1CurrScore === this.state.deuceScore ||
			this.state.player2CurrScore === this.state.deuceScore
		) {
			const card = document.querySelectorAll(".score");
			if (this.state.player1CurrScore > this.state.player2CurrScore) {
				// Game over. Make winning score card green, losing card red and update status.
				card[0].classList.add("winner");
				card[1].classList.add("loser");
				await this.setState({
					status: `Game ${this.state.gameDetails.player1}!`,
					winner: this.state.gameDetails.player1,
				});
			} else {
				card[0].classList.add("loser");
				card[1].classList.add("winner");
				await this.setState({
					status: `Game ${this.state.gameDetails.player2}!`,
					winner: this.state.gameDetails.player2,
				});
			}

			// Update scores array.
			let p1 = this.state.gameData.player1Score;
			p1.push(this.state.player1CurrScore);
			let p2 = this.state.gameData.player2Score;
			p2.push(this.state.player2CurrScore);
			document.querySelector(".next-button").classList.remove("clickable");
			const gameData = {
				// gameData object for updating state.
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
				winner: this.state.winner,
			};
			await this.setState({ gameData: gameData });

			if (this.isMatchOver()) {
				// If game is over, show dialog and write game to database.
				this.handleWinner();
				this.state.games[
					Object.keys(this.state.games).length
				] = this.state.gameData;
				await fetch(`https://table-time.herokuapp.com/api/game/insert`, {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(gameData),
				});
			} else {
				document.querySelector(".next-button").classList.add("clickable");
			}
		} else if (
			this.state.player1CurrScore === this.state.deuceScore - 1 &&
			this.state.player2CurrScore === this.state.deuceScore - 1
		) {
			// Game is in deuce. Update state appropriately.
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
			// One of the players is one point from winning. Update state appropriately.
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
				// Check if game has ever been in deuce. If so, deuce is calculated differently.
				if (
					this.state.player1CurrScore === this.state.deuceScore - 2 &&
					this.state.player2CurrScore === this.state.deuceScore - 2
				) {
					await this.setState({ status: "Deuce!" });
				} else {
					await this.setState({ status: "BAU" });
				}
			} else {
				// Else game is in a neutral state.
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
					<button
						className="score-back-button"
						onClick={this.props.history.goBack}
					>
						<MdArrowBack className="button-link" />
					</button>
					<h1 className="game-type">Game {this.state.gameDetails.gameType}</h1>
					<button className={"new-button"} onClick={this.handleConfirm}>
						New Game
					</button>
					<h2 className="best-of">
						Game {this.state.currentGame}/{this.state.numericalBestOf}
					</h2>
					<button className={`next-button`} onClick={this.startNextGame}>
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

export default withRouter(ScoreHolder);
