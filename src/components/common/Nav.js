import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
     
        <Link to="/" className="navbar-brand">Project Manager</Link>
       
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/project">Add Project</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/task/add">Add Task</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/user">Add User</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/task/view">View Task</Link>
            </li>
        </ul>
    </nav>
);

export default Nav;