import React from 'react';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import ProjectService from './ProjectService';
import UserSearchModal from '../user/UserSearchModal';

export default class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: []
        };

        this.projectFormRef = React.createRef();
        this.userSearchModalRef = React.createRef();

        this.onManagerSearch = this.onManagerSearch.bind(this);
        this.onManagerSearchClose = this.onManagerSearchClose.bind(this);
    }

    componentDidMount() {
        this.getAllProjects();
    }

    onManagerSearch() {
        this.userSearchModalRef.current.show();
    }

    onManagerSearchClose(user) {
        if(user) {
            this.projectFormRef.current.onManagerSelect(user);
        }
    }

    getAllProjects = () => {
        ProjectService.getAll().then(
            (response) => {
                this.setState({ projects: response.data });
            }
        );;
    }

    onRefresh = () => {
        this.getAllProjects();
    }

    onUpdate = (data) => {
        this.projectFormRef.current.onUpdate(data);
    }

    onSuspend = (data) => {
        this.getAllProjects();
    }

    render() {
        return (
            <>
                <section className="container-fluide p-4">
                    <div className="col-sm-8 offset-sm-2">
                        <div className="pm-form-container">
                            <ProjectForm onSearch={this.onManagerSearch} ref={this.projectFormRef} onRefresh={this.onRefresh}/>
                            {this.state.projects.length > 0 && <hr />}
                            {this.state.projects.length > 0 && <ProjectList projects={this.state.projects} onUpdate={this.onUpdate} onSuspend={this.onSuspend}/>}
                        </div>
                    </div>
                </section>
                <UserSearchModal onHide={this.onManagerSearchClose} ref={this.userSearchModalRef}/>
            </>
        );
    }
}