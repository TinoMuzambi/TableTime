import React, { Component } from "react";
import "./ScoreHolder.css";
import Score from "./Score";

class ScoreHolder extends Component {
	constructor() {
		super();

		this.state = {
			gameDetails: {
				gameType: "",
				bestOf: "",
				player1: "",
				player2: "",
			},
		};
	}

	componentDidMount() {
		const { gameDetails } = this.props.location.state;
		this.setState({ gameDetails: gameDetails });
	}

	render() {
		return (
			<>
				<div className="holder">
					<h1 className="game-type">Game {this.state.gameDetails.gameType}</h1>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player1}
					/>
					<h1>-</h1>
					<Score
						gameType={this.state.gameDetails.gameType}
						player={this.state.gameDetails.player2}
					/>
				</div>
			</>
		);
	}
}

export default ScoreHolder;
