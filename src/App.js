import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SplashScreen from "./Components/SplashScreen";
import ScoreHolder from "./Components/ScoreHolder";
import StartGame from "./Components/StartGame";
import History from "./Components/History";
import About from "./Components/About";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Helmet } from "react-helmet";

function App() {
	return (
		<>
			<Router>
				<Route
					render={({ location }) => (
						<TransitionGroup>
							<CSSTransition key={location.key} timeout={450} classNames="fade">
								<Switch location={location}>
									<Route
										path="/"
										exact
										render={() => (
											<>
												<Helmet>
													<title>Table Time</title>
												</Helmet>
												<SplashScreen />
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
												<ScoreHolder />
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
												<History />
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
									{/* <Route path="/start" component={StartGame} />
									<Route path="/game" component={ScoreHolder} />
									<Route path="/history" component={History} />
									<Route path="/about" component={About} /> */}
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
