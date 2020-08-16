import React, { Component } from "react";
import "./Score.css";

class Score extends Component {
	constructor() {
		super();

		this.state = {
			score: 0,
		};

		this.incScore = this.incScore.bind(this);
		this.decScore = this.decScore.bind(this);
	}

	async incScore() {
		await this.setState({ score: this.state.score + 1 });
		const buttons = document.querySelectorAll(".button");
		const card = document.querySelector(".score");
		if (this.state.score === this.props.gameType) {
			buttons.forEach((button) => {
				button.classList.add("done");
			});
			card.classList.add("winner");
		}
		this.props.updateScore(this.props.id, this.state.score);
	}

	decScore() {
		this.state.score > 0
			? this.setState({ score: this.state.score - 1 })
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
