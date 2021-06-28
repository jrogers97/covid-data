import React from "react";
import "./App.css";
import Table from "./components/Table";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StatePage from "./components/StatePage";
import CovidDataProvider from "./context/CovidDataProvider";

function App() {
	return (
		<div className="container pt-5 d-flex flex-column">
			<CovidDataProvider>
				<Router>
					<Switch>
						<Route path="/" exact component={Table} />
						<Route path="/state" component={StatePage} />
					</Switch>
				</Router>
			</CovidDataProvider>
		</div>
	);
}

export default App;
