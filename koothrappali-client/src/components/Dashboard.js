import React, { Component } from 'react';
import ProjectList from './ProjectList';
class Dashboard extends Component {
  render() {
    return (
      <div>
        <div id="wrapper">
          <div id="page-wrapper">
            <div className="container">
              <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">Koothrappali</a>
                <form className="form-inline">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              </nav>
            </div>
            <div className="container-fluid">
              <div>
                <div>
                  <ProjectList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Dashboard;
