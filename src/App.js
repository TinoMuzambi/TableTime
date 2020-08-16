import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ScoreHolder from "./components/ScoreHolder";
import StartGame from "./components/StartGame";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/" component={StartGame} exact />
					<Route path="/game" component={ScoreHolder} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
