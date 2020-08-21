import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SplashScreen from "./Components/SplashScreen";
import ScoreHolder from "./Components/ScoreHolder";
import StartGame from "./Components/StartGame";
import History from "./Components/History";
import About from "./Components/About";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
	return (
		<>
			<Router>
				<Route
					render={({ location }) => (
						<TransitionGroup>
							<CSSTransition key={location.key} timeout={450} classNames="fade">
								<Switch location={location}>
									<Route path="/" component={SplashScreen} exact />
									<Route path="/start" component={StartGame} />
									<Route path="/game" component={ScoreHolder} />
									<Route path="/history" component={History} />
									<Route path="/about" component={About} />
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
