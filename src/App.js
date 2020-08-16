import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import ScoreHolder from "./components/ScoreHolder";
import StartGame from "./components/StartGame";
import History from "./components/History";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/" component={SplashScreen} exact />
					<Route path="/start" component={StartGame} />
					<Route path="/game" component={ScoreHolder} />
					<Route path="/history" component={History} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
