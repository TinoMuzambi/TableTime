import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	MdKeyboardArrowDown,
	MdArrowForward,
	MdArrowBack,
} from "react-icons/md";
import { motion } from "framer-motion";

function StartGame() {
	const [player1, setPlayer1] = useState(""); // Player 1 name.
	const [player2, setPlayer2] = useState(""); // Player 2 name.
	const [gameType, setGameType] = useState(11); // Game 11 or game 21.
	const [bestOf, setBestOf] = useState("Single Game"); // Single Game, Best of 3 or Best of 5.
	const history = useHistory();

	const setGameTypeFunc = async (gameType) => {
		// Update state methods.
		await setGameType(parseInt(gameType));
	};

	const setBestOfFunc = async (bestOf) => {
		await setBestOf(bestOf);
	};

	const setPlayer1Func = async (player1) => {
		await setPlayer1(player1);
	};

	const setPlayer2Func = async (player2) => {
		await setPlayer2(player2);
	};

	const divVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
	};

	return (
		<>
			<motion.div
				className="start-holder"
				variants={divVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="flex">
					<button className="start-back-button" onClick={history.goBack}>
						<MdArrowBack className="button-link" />
					</button>
					<h1 className="heading">Table Time</h1>
				</div>

				<div className="flex2">
					<div className="player-input player1">
						<input
							id="player1"
							onChange={(e) => setPlayer1Func(e.target.value)}
							placeholder="Player 1"
						></input>
					</div>
					<h1 className="vs">vs</h1>
					<div className="player-input player2">
						<input
							id="player2"
							onChange={(e) => setPlayer2Func(e.target.value)}
							placeholder="Player 2"
						></input>
					</div>
				</div>

				<div className="flex3">
					<div className="game">
						<select
							name="game"
							id="game"
							onChange={(e) => setGameTypeFunc(e.target.value)}
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
							onChange={(e) => setBestOfFunc(e.target.value)}
						>
							<option value="Single Game">Single Game</option>
							<option value="Best of 3">Best of 3</option>
							<option value="Best of 5">Best of 5</option>
						</select>
						<MdKeyboardArrowDown className="rounds-arrow" />
					</div>
				</div>

				<button className="button-start">
					{/* Link to state and pass game details to ScoreHolder component. */}
					<Link
						to={{
							pathname: "/game",
							state: {
								gameDetails: {
									gameType: gameType,
									bestOf: bestOf,
									player1: player1 === "" ? "Player1" : player1,
									player2: player2 === "" ? "Player2" : player2,
								},
							},
						}}
						className="button-link"
					>
						<MdArrowForward />
					</Link>
				</button>
			</motion.div>
		</>
	);
}

export default StartGame;
