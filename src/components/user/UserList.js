import React from 'react';
import UserService from './UserService';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    onDelete(data) {
        UserService.delete(data._id).then(() => {
            this.props.onDelete();
        });
    }

    onEdit(data) {
        this.props.onEdit(data);
    }

    onSearch(event) {
        this.setState({ searchText: event.target.value });
        event.preventDefault();
    }

    clearSearch(event) {
        this.setState({ searchText: '' });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="pm-sort-container">
                    <form className="form-inline">
                        <div className="form-group col-6 p-0 pm-search-conatiner">
                            <span className="fa fa-search pm-search-icon"></span>
                            <input type="text" className="form-control rounded-0 w-100" htmlFor="searchUser"
                                value={this.state.searchText} onChange={this.onSearch}
                                name="searchUser" placeholder="Search..." />
                            {this.state.searchText && <span className="fa fa-times pm-close-icon" onClick={this.clearSearch}></span>}
                        </div>
                        <div className="form-group col-6 p-0">
                            <span className="col-4 text-right p-0">Sort:</span>
                            <div className="justify-content-between col-8 p-0" role="toolbar">
                                <div className="btn-group float-right" role="group">
                                    <button type="button" className="btn btn-secondary rounded-0">First Name</button>
                                    <button type="button" className="btn btn-secondary rounded-0">Last Name</button>
                                    <button type="button" className="btn btn-secondary rounded-0">Employee Id</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <ul className="list-group">
                    {this.props.users.map((item) => {
                        return <li className="list-group-item d-flex rounded-0" key={item._id} item={item}>
                            <div className="col-9">
                                <div className="pm-form-row">
                                    <span className="pm-form-label">First Name:</span>
                                    <span className="pm-form-value">{item.firstName}</span>
                                </div>
                                <div className="pm-form-row">
                                    <span className="pm-form-label">Last Name:</span>
                                    <span className="pm-form-value">{item.lastName}</span>
                                </div>
                                <div className="pm-form-row">
                                    <span className="pm-form-label">Employee ID:</span>
                                    <span className="pm-form-value">{item.employeeId}</span>
                                </div>
                            </div>
                            <div className="col-3 btn-ver-grp">
                                <button className="btn btn-primary rounded-0" onClick={() => { this.onEdit(item) }}>Edit</button>
                                <button className="btn btn-secondary rounded-0" onClick={() => { this.onDelete(item) }}>Delete</button>
                            </div>
                        </li>;
                    })}
                </ul>
            </div>
        );
    }
}
