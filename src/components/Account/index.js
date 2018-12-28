import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <div style={{ width: "60%", margin: "auto" }}>
                    <h1>Account: {authUser.email}</h1>
                    <div style={{ marginTop: '1em' }}>
                        <h2>PasswordForget</h2>
                        <PasswordForgetForm />
                    </div>
                    <div style={{ marginTop: '1em' }}>
                        <h2>PasswordChange</h2>
                        <PasswordChangeForm />
                    </div>
                </div>
            )}
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);