import React, { Component } from "react";
import "./History.css";
import games from "../data/games";
import Moment from "react-moment";

class History extends Component {
	render() {
		return (
			<>
				<div className="history-holder">
					<h1 className="title">History</h1>

					<div className="scores-container">
						{games.map((game, key) => (
							<div className="score-list" key={key}>
								<h2>
									{game.player1} vs {game.player2}
								</h2>
								<h3>
									<Moment format="DD MMMM YYYY">{game.date}</Moment>
								</h3>
								<h3>
									{game.player1Score[1]} - {game.player2Score[1]}
								</h3>
							</div>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default History;
