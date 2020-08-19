import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./StartGame.css";
import {
	MdKeyboardArrowDown,
	MdArrowForward,
	MdArrowBack,
} from "react-icons/md";

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
							className="button-link"
						>
							<MdArrowForward />
						</Link>
					</button>
				</div>
			</>
		);
	}
}

export default withRouter(StartGame);
