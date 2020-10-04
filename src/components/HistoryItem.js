import React from "react";
import Moment from "react-moment";
import moment from "moment-timezone";
import _ from "lodash";
import { confirmAlert } from "react-confirm-alert";
import { MdDelete } from "react-icons/md";

function HistoryItem({ game, setGames }) {
	const handleDelete = async (id) => {
		// Delete game.
		const deleteGame = async () => {
			const match = {
				_id: id,
			};
			await fetch(`https://table-time.herokuapp.com/api/match/delete`, {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(match),
			});
			const result = await fetch(
				`https://table-time.herokuapp.com/api/matches`
			);
			const body = await result.json();
			await setGames(body);
		};
		deleteGame();
	};

	const handleConfirm = (id) => {
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
								handleDelete(id);
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
	};

	return (
		<div className="score-list">
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
						{`Game ${key + 1}: ${scoresArray[0]} - ${scoresArray[1]}`}
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
				onClick={() => handleConfirm(game[1]["_id"])}
			>
				<MdDelete className="button-delete" />
			</button>
		</div>
	);
}

export default HistoryItem;
