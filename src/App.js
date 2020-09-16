import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import ScoreHolder from "./pages/ScoreHolder";
import StartGame from "./pages/StartGame";
import History from "./pages/History";
import About from "./pages/About";
import Auth from "./pages/Auth";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Helmet } from "react-helmet";

function App() {
	const [dark, setDark] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
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
	}, [dark]);

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
						<TransitionGroup>
							<CSSTransition key={location.key} timeout={450} classNames="fade">
								<Switch location={location}>
									<>
										<button onClick={toggleDark} className="toggle">
											Dark
										</button>

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
													<Auth setLoggedIn={setLoggedIn} />
												</>
											)}
										/>
									</>
								</Switch>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
			</Router>
		</>
	);
}

export default App;
