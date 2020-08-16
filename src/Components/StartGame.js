import React from "react";
import "./StartGame.css";
import { MdKeyboardArrowDown } from "react-icons/md";

const StartGame = () => (
	<>
		<div className="holder">
			<h1 className="heading">Table Time</h1>
			<div className="player-input">
				<h2 contentEditable="true">Tino</h2>
			</div>
			<h1>vs</h1>
			<div className="player-input">
				<h2 contentEditable="true">Tino</h2>
			</div>

			<div class="dropdown">
				<button class="dropbtn">
					<h2>
						Game 21 <MdKeyboardArrowDown />
					</h2>
				</button>
				<div class="dropdown-content">
					<a href="#">Game 21</a>
					<a href="#">Game 11</a>
				</div>
			</div>
		</div>
	</>
);

export default StartGame;
