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

	render() {
		return (
			<>
				<div className="holder">
					<h1 className="heading">Table Time</h1>
					<div className="container">
						<div className="player-input">
							<input
								id="player1"
								onChange={(e) => this.setPlayer1(e.target.value)}
								placeholder="Player 1"
							></input>
						</div>
						<h1>vs</h1>
						<div className="player-input">
							<input
								id="player2"
								onChange={(e) => this.setPlayer2(e.target.value)}
								placeholder="Player 2"
							></input>
						</div>
					</div>

					<div class="dropdown">
						<button class="dropbtn">
							<h2>
								Game {this.state.gameType} <MdKeyboardArrowDown />
							</h2>
						</button>
						<div class="dropdown-content">
							<span onClick={() => this.setGameType(21)}>Game 21</span>
							<span onClick={() => this.setGameType(11)}>Game 11</span>
						</div>
					</div>

					<div class="dropdown b">
						<button class="dropbtn">
							<h2>
								{this.state.bestOf} <MdKeyboardArrowDown />
							</h2>
						</button>
						<div class="dropdown-content">
							<span onClick={() => this.setBestOf(1)}>Single Game</span>
							<span onClick={() => this.setBestOf(3)}>Best of 3</span>
							<span onClick={() => this.setBestOf(5)}>Best of 5</span>
						</div>
					</div>

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
						<button className="button-start">
							<MdArrowForward />
						</button>
					</Link>
				</div>
			</>
		);
	}
}

export default StartGame;
