import React, { Component } from 'react';
import ProjectList from './ProjectList';
class Dashboard extends Component {
  render() {
    return (
      <div>
        <div id="page-wrapper">
          <div className="container-fluid">
            <ProjectList />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
