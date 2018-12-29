import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import netflixlogo from '../img/logo.svg';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link to={ROUTES.LANDING} className="navbar-brand"><img src={netflixlogo} className="Nextflix-logo" alt="logo" style={{ width: 80, height: 40 }} /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={ROUTES.HOME} className="nav-link">Home<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to={ROUTES.ACCOUNT} className="nav-link">Account</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={ROUTES.ADMIN} className="nav-link">Admin</Link>
                    </li>
                </ul>
                <SignOutButton className="btn-outline-success my-2 my-sm-0" />
            </div>
        </div>
    </nav>
);



const NavigationNonAuth = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link to={ROUTES.LANDING} className="navbar-brand"><img src={netflixlogo} className="Nextflix-logo" alt="logo" style={{ width: 80, height: 40 }} /></Link>
            <Link to={ROUTES.SIGN_IN}>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Sign In
                </button>
            </Link>
        </div>
    </nav>
);

export default Navigation;