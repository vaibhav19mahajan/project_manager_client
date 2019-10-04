import React from 'react';
import UserService from './UserService';
import UserList from './UserList';
import UserForm from './UserForm';
export default class User extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            users: []
        };

        this.userFormRef = React.createRef();

        this.onRefresh = this.onRefresh.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        UserService.getAllUsers().then(
            (response) => {
                this.setState({ users: response.data });
            }
        );;
    }

    onRefresh() {
        this.getAllUsers();
    }

    onDelete() {
        this.getAllUsers();
    }

    onEdit(data) {
        this.userFormRef.current.onEdit(data);
    }

    render() {
        return (
            <section className="container-fluide p-4">
                <div className="col-sm-8 offset-sm-2">
                    <div className="pm-form-container">
                        <UserForm onRefresh={this.onRefresh} ref={this.userFormRef}/>
                        {this.state.users.length > 0 && <hr />}
                        {this.state.users.length > 0 && <UserList users={this.state.users} onDelete={this.onDelete} onEdit={this.onEdit}/>}
                    </div>
                </div>
            </section>
        );
    }
}