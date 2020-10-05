import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import AdminPage from './components/AdminPage/AdminPage';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RegisterVolunteer from './components/RegisterVolunteer/RegisterVolunteer';
import VolunteerTask from './components/VolunteerTask/VolunteerTask';

export const UserContext = createContext();

function App() {
	const [loggedInUser, setLoggedInUser] = useState({});
	return (
		<UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
			<Router>
				<NavBar />
				<Switch>
					<Route path='/admin'>
						<AdminPage />
					</Route>
					<Route path='/task'>
						<VolunteerTask />
					</Route>
					<Route path='/login'>
						<Login></Login>
					</Route>
					<PrivateRoute path='/register/:categoryID'>
						<RegisterVolunteer />
					</PrivateRoute>
					<Route path='/home'>
						<Homepage />
					</Route>
					<Route exact path='/'>
						<Homepage />
					</Route>
					<Route path='*'>
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</UserContext.Provider>
	)
}

export default App;
