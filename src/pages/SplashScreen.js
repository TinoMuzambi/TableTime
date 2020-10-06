import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function SplashScreen({ loggedIn, setLoggedIn, setUsername }) {
	useEffect(() => {
		if (localStorage.getItem("table-user") !== null) {
			setLoggedIn(true);
		}
	}, [setLoggedIn]);

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
			<div className="notice">
				<div className="status-block-success">
					<p className="text">Logged Out</p>
				</div>
			</div>
			{loggedIn ? (
				<button
					className="auth-link"
					onClick={() => {
						setLoggedIn(false);
						localStorage.removeItem("table-user");
						localStorage.removeItem("username");
						setUsername("");
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
			<motion.div
				className="splash-holder"
				variants={divVariants}
				initial="hidden"
				animate="visible"
			>
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
			</motion.div>
		</>
	);
}

export default SplashScreen;
