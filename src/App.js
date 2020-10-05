import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import AdminPage from './components/AdminPage/AdminPage';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RegisterVolunteer from './components/RegisterVolunteer/RegisterVolunteer';
import VolunteerTask from './components/VolunteerTask/VolunteerTask';

export const UserContext = createContext();

function App() {
	const [loggedInUser, setLoggedInUser] = useState({});
	return (
		<UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
			<Router>
				<NavBar></NavBar>
				<Switch>
					<Route path='/admin'>
						<AdminPage></AdminPage>
					</Route>
					<Route path='/task'>
						<VolunteerTask></VolunteerTask>
					</Route>
					<Route path='/login'>
						<Login></Login>
					</Route>
					<PrivateRoute path='/register/:categoryID'>
						<RegisterVolunteer></RegisterVolunteer>
					</PrivateRoute>
					<Route path='/home'>
						<Homepage></Homepage>
					</Route>
					<Route exact path='/'>
						<Homepage></Homepage>
					</Route>
				</Switch>
			</Router>
		</UserContext.Provider>
	)
}

export default App;
