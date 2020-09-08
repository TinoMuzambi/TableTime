import React, { Component } from "react";
import "./History.css";
import Moment from "react-moment";
import moment from "moment-timezone";
import { MdArrowBack, MdDelete } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Pusher from "pusher-js";

class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFetching: true,
			games: {
				id: 0, // Game ID.
				date: "", // Date game was played.
				bestOf: "", // Single Game, Best of 3 or Best of 5.
				gameType: 0, // Game 11 or game 21.
				player1: "", // Player 1 name.
				player2: "", // Player 2 name.
				player1Score: [], // Array of player 1's game's scores.
				player2Score: [], // Array of player 2's game's scores.
			},
		};

		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	async UNSAFE_componentWillMount() {
		// Fetch game data from database on component load.
		const fetchData = async () => {
			await this.setState({ isFetching: true });
			const result = await fetch(`https://table-time.herokuapp.com/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
			await this.setState({ isFetching: false });
		};
		fetchData();
	}

	componentDidMount() {
		const fetchData = async () => {
			await this.setState({ isFetching: true });
			const result = await fetch(`https://table-time.herokuapp.com/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
			await this.setState({ isFetching: false });
		};

		const pusher = new Pusher(process.env.pusher_key, {
			cluster: "ap2",
		});

		const channel = pusher.subscribe("matches");
		channel.bind("deleted", (data) => {
			fetchData();
		});
		channel.bind("inserted", (data) => {
			fetchData();
		});
	}

	async handleDelete(id) {
		// Delete game.
		const deleteGame = async () => {
			const match = {
				_id: id,
			};
			await fetch(`https://table-time.herokuapp.com/api/game/delete`, {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(match),
			});
			const result = await fetch(`https://table-time.herokuapp.com/api/games`);
			const body = await result.json();
			await this.setState({ games: body });
		};
		deleteGame();
	}

	handleConfirm(id) {
		// Confirm alert dialog for starting a new game.
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="confirm-new">
						<h1 className="confirm-new-title">Delete Match</h1>
						<p className="confirm-new-text">
							Are you sure you want to delete this match?
						</p>
						<button
							onClick={() => {
								this.handleDelete(id);
								onClose();
							}}
							className="confirm-new-yes"
						>
							Yes
						</button>
						<button onClick={onClose} className="confirm-new-no">
							Cancel
						</button>
					</div>
				);
			},
		});
	}

	render() {
		let arrayGames = [];
		for (let i in this.state.games) arrayGames.push([i, this.state.games[i]]); // Get games from JSON to array format.
		return (
			<>
				<div className="history-holder">
					{this.state.isFetching ? (
						<AiOutlineReload className="icon" />
					) : (
						<>
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
										<div className="flex">
											{/* If winner add winner class for styling or loser class. */}
											<h2
												className={
													game[1]["player1"] === game[1]["winner"]
														? "history-winner"
														: "history-loser"
												}
											>
												{game[1]["player1"]}
											</h2>
											<h2 className="separator"> vs </h2>
											<h2
												className={
													game[1]["player2"] === game[1]["winner"]
														? "history-winner"
														: "history-loser"
												}
											>
												{game[1]["player2"]}
											</h2>
										</div>
										<h3>
											{game[1]["bestOf"]} - Game {game[1]["gameType"]}
										</h3>
										<div className="game-scores">
											{/* Lodsh zip players scores for easy mapping. */}
											{_.zip(
												`${game[1]["player1Score"]}`.split(","),
												`${game[1]["player2Score"]}`.split(",")
											).map((scoresArray, key) => (
												<h3 key={key}>
													{`Game ${key + 1}: ${scoresArray[0]} - ${
														scoresArray[1]
													}`}
													<br />
												</h3>
											))}
										</div>

										<h3>
											<Moment format="DD MMM YYYY HH:mm">
												{moment.tz(game[1]["date"], "Africa/Banjul")}
											</Moment>
											{/* Moment library for formatting dates. */}
										</h3>
										<button
											className="delete-button"
											onClick={() => this.handleConfirm(game[1]["_id"])}
										>
											<MdDelete className="button-delete" />
										</button>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</>
		);
	}
}

export default withRouter(History);
