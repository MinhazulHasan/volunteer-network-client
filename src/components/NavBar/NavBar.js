import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../logos/navbarLogo.png';

const NavBar = () => {
    const location = useLocation();
    const condition1 = location.pathname === '/' || location.pathname.includes('home');
    const condition2 = location.pathname.includes('task');
    const condition3 = location.pathname.includes('admin');
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const handleLogIn = () => {
        history.push('/login');
    }
    const visitAdminPanel = () => {
        history.push('/admin');
    }

    return (
        <Navbar expand="lg" className='mx-5 mt-2 position-fixed fixed-top'>
            <Navbar.Brand className={!(condition1 || condition2 || condition3) && "center-img"} to='/'>
                <Link to='/'>
                    <img src={logo} width="205px" height="60px" alt="not found" />
                </Link>
            </Navbar.Brand>
            { (condition1 || condition2 ) &&
                <>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto nav-item">
                            <Link className="mx-4 nav-text" to="/">Home</Link>
                            <Link className="mx-4 nav-text" to="/">Donation</Link>
                            <Link className="mx-4 nav-text" to="/">Events</Link>
                            <Link className="mx-4 nav-text" to="/">Blog</Link>
                        </Nav>
                            {condition1 &&
                                <>
                                    {loggedInUser.email ?
                                        <>
                                            <img className="user-img mx-3" src={loggedInUser.photo} alt=""/>
                                            <Button onClick={()=>setLoggedInUser({})} variant="primary" className="mx-2 px-5">Log Out</Button>
                                        </>
                                        :
                                            <Button onClick={handleLogIn} variant="primary" className="mx-2 px-5">Log In</Button>
                                    }
                                    <Button onClick={visitAdminPanel} variant="dark" className="mx-2 px-5">Admin</Button>
                                </>
                            }
                            {condition2 && 
                                <>
                                    <img className="user-img mx-3" src={loggedInUser.photo} alt=""/>
                                    <h6>{loggedInUser.name}</h6>
                                </>
                            }
                    </Navbar.Collapse>
                </>
            }
        </Navbar>
    );
};

export default NavBar;