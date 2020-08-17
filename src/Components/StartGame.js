import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./StartGame.css";
import { MdKeyboardArrowDown, MdArrowForward } from "react-icons/md";

class StartGame extends Component {
	constructor() {
		super();

		this.state = {
			player1: "",
			player2: "",
			gameType: 11,
			bestOf: "Single Game",
		};

		this.setGameType = this.setGameType.bind(this);
		this.setBestOf = this.setBestOf.bind(this);
		this.setPlayer1 = this.setPlayer1.bind(this);
		this.setPlayer2 = this.setPlayer2.bind(this);
	}

	setGameType(gameType) {
		this.setState({ gameType: gameType });
	}

	setBestOf(bestOf) {
		if (bestOf === 1) {
			this.setState({ bestOf: "Single Game" });
		} else if (bestOf === 3) {
			this.setState({ bestOf: "Best of 3" });
		} else {
			this.setState({ bestOf: "Best of 5" });
		}
	}

	setPlayer1(player1) {
		this.setState({ player1: player1 });
	}

	setPlayer2(player2) {
		this.setState({ player2: player2 });
	}

	showMenu(name) {
		const menu = document.querySelector(name);
		menu.classList.remove("hide");
		menu.classList.add("show");
	}

	render() {
		return (
			<>
				<div className="start-holder">
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
						<select name="game" id="game">
							<option value="single">Game 11</option>
							<option value="best3">Game 21</option>
						</select>
						<MdKeyboardArrowDown className="game-arrow" />
					</div>

					<div className="rounds">
						<select name="rounds" id="rounds">
							<option value="single">Single Game</option>
							<option value="best3">Best of 3</option>
							<option value="best5">Best of 5</option>
						</select>
						<MdKeyboardArrowDown className="rounds-arrow" />
					</div>
					<button className="button-start">
						<Link
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
						>
							<MdArrowForward />
						</Link>
					</button>
				</div>
			</>
		);
	}
}

export default StartGame;
