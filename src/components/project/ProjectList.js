import React from 'react';
import moment from 'moment';
import ProjectService from './ProjectService';

export default class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    onUpdate(data) {
        this.props.onUpdate(data);
    }

    onSuspend(data) {
        ProjectService.delete(data._id).then(() => {
            this.props.onSuspend();
        });
    }

    getFormatedDate = (date) => {
        return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY');
    }

    render() {
        return (
            <div>
                <div className="pm-sort-container">
                    <form className="form-inline">
                        <div className="form-group col-6 p-0 pm-search-conatiner">
                            <span className="fa fa-search pm-search-icon"></span>
                            <input type="text" className="form-control rounded-0 w-100" htmlFor="searchProject"
                                name="searchProject" placeholder="Search..." />
                            <span className="fa fa-times pm-close-icon"></span>
                        </div>
                        <div className="form-group col-6 p-0">
                            <span className="col-2 text-right p-0">Sort:</span>
                            <div className="justify-content-between col-10 p-0" role="toolbar">
                                <div className="btn-group float-right" role="group">
                                    <button type="button" className="btn btn-secondary rounded-0">Start Date</button>
                                    <button type="button" className="btn btn-secondary rounded-0">End Date</button>
                                    <button type="button" className="btn btn-secondary rounded-0">Priority</button>
                                    <button type="button" className="btn btn-secondary rounded-0">Completed</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <ul className="list-group">
                    {this.props.projects.map((item) => {
                        return <li className="list-group-item d-flex rounded-0" key={item._id}>
                            <div className="col-8">
                                <div className="row p-3">
                                    <span className="pm-form-label">Project:</span>
                                    <span className="pm-form-value">{item.project}</span>
                                </div>
                                <div className="row p-3">
                                    <div className="col-6 p-0">
                                        <span className="pm-form-label">No of Tasks:</span>
                                        <span className="pm-form-value">2</span>
                                    </div>
                                    <div className="col-6 p-0">
                                        <span className="pm-form-label">Completed:</span>
                                        <span className="pm-form-value">0</span>
                                    </div>
                                </div>
                                <div className="row p-3">
                                    <div className="col-6 p-0">
                                        <span className="pm-form-label">Start Date:</span>
                                        <span className="pm-form-value">{item.startDate && this.getFormatedDate(item.startDate)}</span>
                                    </div>
                                    <div className="col-6 p-0">
                                        <span className="pm-form-label">End Date:</span>
                                        <span className="pm-form-value">{item.endDate && this.getFormatedDate(item.endDate)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 text-center p-0 py-3 pm-list-priority">
                                <div>Priority</div>
                                <div className="pt-5">{item.priority}</div>
                            </div>
                            <div className="col-3 btn-ver-grp">
                                <button className="btn btn-primary rounded-0" onClick={() => { this.onUpdate(item) }}>Update</button>
                                <button className="btn btn-secondary rounded-0" onClick={() => { this.onSuspend(item) }}>Suspend</button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}