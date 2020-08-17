import React, { Component } from "./node_modules/react";
import "./Score.css";

class Score extends Component {
	constructor() {
		super();

		this.state = {
			score: 0,
		};

		this.incScore = this.incScore.bind(this); // Binding methods with this instance.
		this.decScore = this.decScore.bind(this);
	}

	async incScore() {
		await this.setState({ score: this.state.score + 1 });
		const buttons = document.querySelectorAll(".button");
		if (this.state.score === this.props.gameType) {
			// Increment score but first check if game is over.
			buttons.forEach((button) => {
				button.classList.add("done");
			});
		}
		this.props.updateScore(this.props.id, this.state.score);
	}

	async decScore() {
		(await this.state.score) > 0
			? this.setState({ score: this.state.score - 1 }) // Decrement score but first check if score is zero.
			: this.setState({ score: 0 });

		this.props.updateScore(this.props.id, this.state.score);
	}

	render() {
		return (
			<>
				<div className="score">
					<h1 className="curr-score">{this.state.score}</h1>
					<div className="buttons">
						<button className="button plus" onClick={this.incScore}>
							+
						</button>
						<button className="button minus" onClick={this.decScore}>
							-
						</button>
					</div>
					<h1 className="player">{this.props.player}</h1>
				</div>
			</>
		);
	}
}

export default Score;
