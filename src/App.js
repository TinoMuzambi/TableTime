import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/App.min.css";
import SplashScreen from "./pages/SplashScreen";
import ScoreHolder from "./pages/ScoreHolder";
import StartGame from "./pages/StartGame";
import History from "./pages/History";
import About from "./pages/About";
import Auth from "./pages/Auth";
import { Helmet } from "react-helmet";

function App() {
	const [dark, setDark] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		setUsername(
			localStorage.getItem("username") === null
				? ""
				: localStorage.getItem("username")
		);
		const lastDark = localStorage.getItem("dark");
		const btn = document.querySelector(".toggle");
		if (lastDark === null) {
			localStorage.setItem("dark", "false");
		} else if (lastDark === "true") {
			setDark(true);
			document.documentElement.classList.add("dark-mode");
			btn.innerHTML = "Light";
		} else {
			setDark(false);
			document.documentElement.classList.remove("dark-mode");
			btn.innerHTML = "Dark";
		}
	}, [dark, username]);

	const toggleDark = () => {
		const lastDark = localStorage.getItem("dark");
		const btn = document.querySelector(".toggle");
		document.documentElement.classList.toggle("dark-mode");
		setDark(!dark);
		localStorage.setItem("dark", `${lastDark === "false" ? "true" : "false"}`);
		btn.innerHTML = lastDark === "false" ? "Dark" : "Light";
	};

	return (
		<>
			<Router>
				<Route
					render={({ location }) => (
						<Switch location={location}>
							<>
								<button onClick={toggleDark} className="toggle">
									Dark
								</button>
								<div className="user-holder">
									<p className="user">{username}</p>
								</div>

								<Route
									path="/"
									exact
									render={() => (
										<>
											<Helmet>
												<title>Table Time</title>
											</Helmet>
											<SplashScreen
												loggedIn={loggedIn}
												setLoggedIn={setLoggedIn}
												setUsername={setUsername}
											/>
										</>
									)}
								/>
								<Route
									path="/start"
									exact
									render={() => (
										<>
											<Helmet>
												<title>Start | Table Time</title>
											</Helmet>
											<StartGame />
										</>
									)}
								/>
								<Route
									path="/game"
									exact
									render={() => (
										<>
											<Helmet>
												<title>Game | Table Time</title>
											</Helmet>
											<ScoreHolder loggedIn={loggedIn} />
										</>
									)}
								/>
								<Route
									path="/history"
									exact
									render={() => (
										<>
											<Helmet>
												<title>History | Table Time</title>
											</Helmet>
											<History loggedIn={loggedIn} />
										</>
									)}
								/>
								<Route
									path="/about"
									exact
									render={() => (
										<>
											<Helmet>
												<title>About | Table Time</title>
											</Helmet>
											<About />
										</>
									)}
								/>
								<Route
									path="/auth"
									exact
									render={() => (
										<>
											<Helmet>
												<title>Authorise | Table Time</title>
											</Helmet>
											<Auth
												setLoggedIn={setLoggedIn}
												setOuterUsername={setUsername}
											/>
										</>
									)}
								/>
							</>
						</Switch>
					)}
				/>
			</Router>
		</>
	);
}

export default App;
