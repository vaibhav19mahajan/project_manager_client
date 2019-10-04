import React from 'react';
import ProjectService from './ProjectService';

export default class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {
                project: '',
                startDate: '',
                endDate: '',
                priority: 0,
                userId: ''
            },
            isNew: true
        };

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(event) {
        this.props.onSearch();
    }

    handleChange = (event) => {
        let projectObj = { ...this.state.project };
        projectObj[event.target.name] = event.target.value;
        this.setState({ project: projectObj });
        event.preventDefault();
    }

    handleReset = (event) => {
        this.resetState();
        event.preventDefault();
    }

    handleSubmit = (event) => {
        if (this.state.isNew) {
            ProjectService.add(this.state.project).then(() => {
                this.resetState();
                this.props.onRefresh();
            });;
        } else {
            ProjectService.update(this.state.project).then(() => {
                this.resetState();
                this.props.onRefresh();
            });;
        }
    }

    resetState = () => {
        this.setState({
            project: {
                project: '',
                startDate: '',
                endDate: '',
                priority: 0,
                userId: ''
            }
        });
    }

    onUpdate = (data) => {
        const isDateSelected = (data.startDate && data.endDate) ? true : false;
        let projectObj = { ...data, userId: data.userId._id };
        this.setState({ project: projectObj, isNew: false, setDate: isDateSelected, projectManager: `${data.userId.lastName} , ${data.userId.firstName}` });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <div className="form-group row">
                    <label htmlFor="project" className="col-sm-2 col-form-label">Project:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control rounded-0"
                            name="project" placeholder="Project" required onChange={this.handleChange}
                            value={this.state.project.project} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10 row p-0">
                        <div className="col-4 pt-2 pm-pl-50">
                            <input type="checkbox" className="form-check-input rounded-0"
                                name="projectName" placeholder="Project" checked={this.state.setDate}
                                onChange={this.handleSetDateChange} />
                            <span className="pl-2">Set Start and End Date</span>
                        </div>
                        <div className="col-4 p-0 pr-2">
                            <input type="date" className="form-control rounded-0"
                                name="startDate" placeholder="Start Date"
                                value={this.state.project.startDate} />
                        </div>
                        <div className="col-4 p-0 pl-2">
                            <input type="date" className="form-control rounded-0"
                                name="endDate" placeholder="End Date"
                                value={this.state.project.endDate} />
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="priority" className="col-sm-2 col-form-label">Priority:</label>
                    <div className="col-sm-10 pt-3">
                        <input type="range" className="form-control-range rounded-0"
                            name="priority" min="1" max="30" required
                            value={this.state.project.priority} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="projectManager" className="col-sm-2 col-form-label">Manager:</label>
                    <div className="col-sm-10 row p-0">
                        <div className="col-10 pm-pl-30">
                            <input type="text" className="form-control rounded-0"
                                name="projectManager" placeholder="Manager" required readOnly  />
                        </div>
                        <div className="col-2 p-0">
                            <button className="btn btn-secondary float-right rounded-0" onClick={this.onSearch}>
                                <i className="fa fa-search pr-3"></i>Search
                            </button>
                        </div>
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