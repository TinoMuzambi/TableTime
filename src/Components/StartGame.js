import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import "./StartGame.css";
import {
	MdKeyboardArrowDown,
	MdArrowForward,
	MdArrowBack,
} from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class StartGame extends Component {
	constructor() {
		super();

		this.state = {
			player1: "",
			player2: "",
			gameType: 11,
			bestOf: "Single Game",
		};

		this.setGameType = this.setGameType.bind(this); // Binding methods with this instance.
		this.setBestOf = this.setBestOf.bind(this);
		this.setPlayer1 = this.setPlayer1.bind(this);
		this.setPlayer2 = this.setPlayer2.bind(this);
		this.handleMissingData = this.handleMissingData.bind(this);
		this.validateData = this.validateData.bind(this);
		this.goToGame = this.goToGame.bind(this);
	}

	handleMissingData() {
		confirmAlert({
			title: "Missing Information",
			message: "Please give me your players' names before we can start.",
			buttons: [
				{
					label: "Ok",
				},
			],
		});
	}

	async setGameType(gameType) {
		// Update state methods.
		await this.setState({ gameType: parseInt(gameType) });
	}

	async setBestOf(bestOf) {
		await this.setState({ bestOf: bestOf });
	}

	setPlayer1(player1) {
		this.setState({ player1: player1 });
	}

	setPlayer2(player2) {
		this.setState({ player2: player2 });
	}

	goToGame() {
		return (
			<Redirect
				to={{
					pathname: "/game",
					state: {
						gameDetails: {
							gameType: this.state.gameType,
							bestOf: this.state.bestOf,
							player1: this.state.player1,
							player2: this.state.player2,
						},
					},
				}}
			/>
		);
	}

	validateData() {
		if (this.state.player1 === "" || this.state.player2 === "") {
			this.handleMissingData();
		} else {
			this.goToGame();
			console.log("trying");
		}
	}

	render() {
		return (
			<>
				<div className="start-holder">
					<button
						className="start-back-button"
						onClick={this.props.history.goBack}
					>
						<MdArrowBack className="button-link" />
					</button>
					<h1 className="heading">Table Time</h1>
					<div className="player-input player1">
						<input
							id="player1"
							onChange={(e) => this.setPlayer1(e.target.value)}
							placeholder="Player 1"
						></input>
					</div>
					<h1 className="vs">vs</h1>
					<div className="player-input player2">
						<input
							id="player2"
							onChange={(e) => this.setPlayer2(e.target.value)}
							placeholder="Player 2"
						></input>
					</div>

					<div className="game">
						<select
							name="game"
							id="game"
							onChange={(e) => this.setGameType(e.target.value)}
						>
							<option value="11">Game 11</option>
							<option value="21">Game 21</option>
						</select>
						<MdKeyboardArrowDown className="game-arrow" />
					</div>

					<div className="rounds">
						<select
							name="rounds"
							id="rounds"
							onChange={(e) => this.setBestOf(e.target.value)}
						>
							<option value="Single Game">Single Game</option>
							<option value="Best of 3">Best of 3</option>
							<option value="Best of 5">Best of 5</option>
						</select>
						<MdKeyboardArrowDown className="rounds-arrow" />
					</div>
					<button className="button-start" onClick={this.validateData}>
						<MdArrowForward />
					</button>
				</div>
			</>
		);
	}
}

export default withRouter(StartGame);
