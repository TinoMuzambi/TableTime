import React, { Component } from "react";
import { Link } from "react-router-dom";

class SplashScreen extends Component {
	render() {
		return (
			<>
				<div className="splash-holder">
					<img src="/logo512.png" alt="logo" className="logo" />
					<ul className="links">
						<li className="link">
							<Link to="/start" className="link">
								New Game
							</Link>
						</li>

						<li className="link">
							<Link to="/history" className="link">
								History
							</Link>
						</li>
						<li className="link">
							<Link to="/about" className="link">
								About
							</Link>
						</li>
					</ul>
				</div>
			</>
		);
	}
}

export default SplashScreen;
