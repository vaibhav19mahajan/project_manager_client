import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/common/Nav';
import './App.css';
import User from './components/user/User';
import Project from './components/project/Project';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Nav />

				<Route exact path="/" />
				<Route path="/user" component={User}/>
				<Route path="/project" component={Project}/>
			</Router>
		);
	}
}

export default App;
