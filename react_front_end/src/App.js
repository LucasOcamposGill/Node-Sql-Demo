import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialList";
import AddressController from "./components/Addresses";

class App extends Component {
	state = {
		currentUser: {
			roles: [],
			userName: "",
			email: "",
		},
  };
  
  render() {
    console.log("rendering");
		return (
			<React.Fragment>
				<Router>
					<nav className="navbar navbar-expand navbar-dark bg-dark">
						<a href="/tutorials" className="navbar-brand">
							devmere
						</a>
						<div className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link
									to={"/tutorials"}
									className="nav-link"
								>
									Tutorials
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/add"} className="nav-link">
									Add
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to={"/AddressController"}
									className="nav-link"
								>
									address
								</Link>
							</li>
						</div>
					</nav>

					<div className="container mt-3">
						<Switch>
							<Route
								exact
								path={["/", "/tutorials"]}
								component={TutorialsList}
							/>
							<Route
								exact
								path="/add"
								component={AddTutorial}
							/>
							<Route
								path="/tutorials/:id"
								component={Tutorial}
							/>
							<Route
								exact
								path={["/", "/AddressController"]}
								component={AddressController}
							/>
						</Switch>
					</div>
				</Router>
			</React.Fragment>
		);
	}
}
export default App;
