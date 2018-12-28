import React, { Component } from 'react';

// import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
// import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        console.log(this.props)

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            console.log(usersObject)
            if (usersObject) {
                const usersList = Object.keys(usersObject).map(key => ({
                    ...usersObject[key],
                    uid: key,
                }));

                this.setState({
                    users: usersList,
                    loading: false,
                });
            } else {
                this.setState({
                    users: ['No Data'],
                    loading: false,
                });
            }

        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;
        return (
            <div>
                <h1>Admin</h1>
                {loading && <div>Loading ...</div>}

                <UserList users={users} />
            </div>
        );
    }
}

const UserList = ({ users }) => (
    <ul>
        {users.map(user => {
            if (user === 'No Data') {
                return 'No Data'
            } else {
                return (
                    <li key={user.uid}>
                        <span>
                            <strong>ID:</strong> {user.uid}
                        </span>
                        <span>
                            <strong>E-Mail:</strong> {user.email}
                        </span>
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                    </li>
                )
            }
        })}
    </ul>
);

export default withFirebase(AdminPage);