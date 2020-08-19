import React, { Component } from "react";
import "./History.css";
import Moment from "react-moment";
import { MdArrowBack } from "react-icons/md";
import { withRouter } from "react-router-dom";

class History extends Component {
	constructor() {
		super();

		this.state = {
			games: {
				id: 0,
				date: "",
				bestOf: "",
				gameType: 0,
				player1: "",
				player2: "",
				player1Score: [],
				player2Score: [],
			},
		};
	}

	async UNSAFE_componentWillMount() {
		const fetchData = async () => {
			const result = await fetch(`/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
		};
		fetchData();
	}

	render() {
		let arrayGames = [];
		for (let i in this.state.games) arrayGames.push([i, this.state.games[i]]);
		return (
			<>
				<div className="history-holder">
					<button
						className="hist-back-button"
						onClick={this.props.history.goBack}
					>
						<MdArrowBack className="button-link" />
					</button>
					<h1 className="title">History</h1>

					<div className="scores-container">
						{/* Mapping each game into div component. */}
						{arrayGames.map((game, key) => (
							<div className="score-list" key={key}>
								<h2>
									{game[1]["player1"]} vs {game[1]["player2"]}
								</h2>
								<h3>
									{game[1]["player1Score"]} - {game[1]["player2Score"]}
								</h3>
								<h3>
									<Moment format="DD MMMM YYYY HH:mm">{game[1]["date"]}</Moment>{" "}
									{/* Moment library for formatting dates. */}
								</h3>
								{/* <div>
									{game[1]["player1Score"].map((score, key) => (
										<h3 key={key}>{score}</h3>
									))}
									<h3>-</h3>
									{game[1]["player2Score"].map((score, key) => (
										<h3 key={key}>{score}</h3>
									))}
								</div> */}
								<h3>
									{game[1]["bestOf"]} - Game {game[1]["gameType"]}
								</h3>
							</div>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(History);
