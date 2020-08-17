import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SplashScreen from "./Components/SplashScreen";
import ScoreHolder from "./Components/ScoreHolder";
import StartGame from "./Components/StartGame";
import History from "./Components/History";
import About from "./Components/About";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/" component={SplashScreen} exact />
					<Route path="/start" component={StartGame} />
					<Route path="/game" component={ScoreHolder} />
					<Route path="/history" component={History} />
					<Route path="/about" component={About} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
