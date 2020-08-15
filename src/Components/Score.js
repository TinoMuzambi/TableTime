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

	incScore() {
		this.setState({ score: this.state.score + 1 });
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
					<h1 className="player">Tino</h1>
				</div>
			</>
		);
	}
}

export default Score;
