import React, { Component } from "react";
import "./Score.css";

class Score extends Component {
	constructor() {
		super();

		this.state = {
			score: 0,
			deuceScore: 11,
		};

		this.incScore = this.incScore.bind(this); // Binding methods with this instance.
		this.decScore = this.decScore.bind(this);
	}

	// componentDidMount() {
	// 	this.setState({ deuceScore: this.props.gameType });
	// }

	async incScore() {
		await this.setState({ score: this.state.score + 1 });
		await this.props.updateScore(
			this.props.id,
			this.state.score,
			this.state.deuceScore
		);
		const buttons = document.querySelectorAll(".button");
		if (this.props.deuce) {
			await this.setState({ deuceScore: this.state.deuceScore + 1 });
			await this.props.updateScore(
				this.props.id,
				this.state.score,
				this.state.deuceScore
			);
			if (this.state.score === this.state.deuceScore + 1) {
				// Increment score but first check if game is over.
				buttons.forEach((button) => {
					button.classList.add("done");
				});
			}
		} else {
			if (this.state.score === this.state.deuceScore) {
				// Increment score but first check if game is over.
				buttons.forEach((button) => {
					button.classList.add("done");
				});
			}
		}
	}

	async decScore() {
		(await this.state.score) > 0
			? this.setState({ score: this.state.score - 1 }) // Decrement score but first check if score is zero.
			: this.setState({ score: 0 });
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
