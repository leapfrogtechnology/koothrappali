import React, { Component } from 'react';
import ProjectList from './ProjectList';
class Dashboard extends Component {
  render() {
    return (
      <div>
        <div id="page-wrapper">
          <div className="container-fluid">
            <div>
              <div>
                <ProjectList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
