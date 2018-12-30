import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import './index.css';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const SignInPage = () => (
    <div className='container' style={{ width: '80%' }}>
        <div className="row">
            <div className="col-sm mycontent-left">
                <h1>SignIn</h1>
                <SignInForm />
                <PasswordForgetLink />
                <SignUpLink />
            </div>
            <div className='vi'></div>
            <div className="col-sm">
                <div className='social-login'>
                    <SignInGoogle />
                    <SignInFacebook />
                </div>
            </div>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        name="email"
                        value={email}
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        aria-describedby="emailHelp"
                        onChange={this.onChange}
                        placeholder="Enter email address"
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        name="password"
                        value={password}
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        onChange={this.onChange}
                        placeholder="Password"
                    />
                </div>
                {/* <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button disabled={isInvalid} type="submit" className="btn btn-primary">Sign In</button>

                {error && <p>{error.message}</p>}

                {/* <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} /> */}

            </form>
        );
    }
}

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: [],
                    });
            })
            .then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit" className="btn" style={{ backgroundColor: 'red', color: 'white' }}><span className="fab fa-google"></span> Sign In with Google</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInFacebookBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.additionalUserInfo.profile.name,
                        email: socialAuthUser.additionalUserInfo.profile.email,
                        roles: [],
                    });
            })
            .then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit" className="btn btn-primary facebook-btn"><span className="fab fa-facebook"></span> Sign In with Facebook</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
    withRouter,
    withFirebase,
)(SignInFacebookBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook };