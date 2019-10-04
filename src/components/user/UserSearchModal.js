import React from 'react';
import { Modal } from 'react-bootstrap';
import UserService from './UserService';

export default class UserSearchModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            show: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    show() {
        UserService.getAllUsers().then(
            (response) => {
                this.setState({ users: response.data, show: true });
            }
        );;
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleSelection = (item) => {
        this.setState({ show: false });
        this.props.onHide(item);
    }

    render() {
        return (
            <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Employee Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users && this.state.users.map((item) => {
                                return <tr key={item._id} className="pm-cursor" onClick={() => this.handleSelection(item)}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.employeeId}</td>
                                </tr>

                            })}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        );
    }
}