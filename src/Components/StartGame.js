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
		this.showMenu = this.showMenu.bind(this);
	}

	setGameType(gameType) {
		this.setState({ gameType: gameType });

		const menu = document.querySelector(".game");
		menu.classList.add("hide");
	}

	setBestOf(bestOf) {
		if (bestOf === 1) {
			this.setState({ bestOf: "Single Game" });
		} else if (bestOf === 3) {
			this.setState({ bestOf: "Best of 3" });
		} else {
			this.setState({ bestOf: "Best of 5" });
		}
		const menu = document.querySelector(".rounds");
		menu.classList.add("hide");
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

					<div className="dropdown game">
						<button className="dropbtn" onClick={() => this.showMenu(".game")}>
							<h2>
								Game {this.state.gameType} <MdKeyboardArrowDown />
							</h2>
						</button>
						<div className="dropdown-content">
							<span onClick={() => this.setGameType(21)}>Game 21</span>
							<span onClick={() => this.setGameType(11)}>Game 11</span>
						</div>
					</div>

					<div className="dropdown rounds">
						<button
							className="dropbtn"
							onClick={() => this.showMenu(".rounds")}
						>
							<h2>
								{this.state.bestOf} <MdKeyboardArrowDown />
							</h2>
						</button>
						<div className="dropdown-content">
							<span onClick={() => this.setBestOf(1)}>Single Game</span>
							<span onClick={() => this.setBestOf(3)}>Best of 3</span>
							<span onClick={() => this.setBestOf(5)}>Best of 5</span>
						</div>
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
