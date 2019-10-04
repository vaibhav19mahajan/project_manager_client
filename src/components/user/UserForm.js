import React from 'react';
import UserService from './UserService';

export default class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                _id: null,
                firstName: '',
                lastName: '',
                employeeId: ''
            },
            isNew: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChange(event) {
        let userObj = { ...this.state.user };
        userObj[event.target.name] = event.target.value;
        this.setState({ user: userObj });
    }

    handleSubmit(event) {
        if(this.state.isNew) {
            UserService.addUser(this.state.user).then(() => {
                this.resetState();
                this.props.onRefresh();
            });
        } else {
            UserService.updateUser(this.state.user).then(() => {
                this.resetState();
                this.props.onRefresh();
            });

        }
        event.preventDefault();
    }

    handleReset(event) {
        this.resetState();
        event.preventDefault();
    }

    resetState() {
        this.setState({
            user: {
                _id: null,
                firstName: '',
                lastName: '',
                employeeId: ''
            },
            isNew: true
        });
    }

    onEdit(userObj) {
        this.setState({ user: userObj, isNew: false });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <div className="form-group row">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control rounded-0" onChange={this.handleChange}
                            value={this.state.user.firstName} name="firstName" placeholder="First Name" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control rounded-0" onChange={this.handleChange}
                            value={this.state.user.lastName} name="lastName" placeholder="Last Name" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-sm-2 col-form-label">Employee ID:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control rounded-0" onChange={this.handleChange}
                            value={this.state.user.employeeId} name="employeeId" placeholder="Employee ID" required />
                    </div>
                </div>
                <div className="form-group row btn-hrz-grp">
                    <div className="col-12">
                        <button className="btn btn-primary float-right rounded-0" type="submit">{this.state.isNew ? 'Add' : 'Update'}</button>
                        <button className="btn btn-secondary float-right rounded-0" type="reset">Reset</button>
                    </div>
                </div>
            </form>
        );
    }
}