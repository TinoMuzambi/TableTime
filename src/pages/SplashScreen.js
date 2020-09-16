import React, { Component } from "react";
import { Link } from "react-router-dom";

class SplashScreen extends Component {
	componentDidMount() {
		if (localStorage.getItem("table-user") !== null) {
			this.props.setLoggedIn(true);
		}
	}

	render() {
		return (
			<>
				<div className="notice">
					<div className="status-block-success">
						<p className="text">Logged Out</p>
					</div>
				</div>
				{this.props.loggedIn ? (
					<button
						className="auth-link"
						onClick={() => {
							this.props.setLoggedIn(false);
							this.props.setUsername("");
							localStorage.removeItem("table-user");
							const success = document.querySelector(".status-block-success"); // Get elements to interact with.
							const notice = document.querySelector(".notice");
							notice.classList.add("shown");
							success.classList.add("shown");
							setTimeout(() => {
								notice.classList.remove("shown");
								success.classList.remove("shown");
							}, 3000);
						}}
					>
						Log Out
					</button>
				) : (
					<Link to="/auth">
						<button className="auth-link">Log In</button>
					</Link>
				)}
				<div className="splash-holder">
					<img src="/logo512.png" alt="logo" className="logo inverted" />
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
