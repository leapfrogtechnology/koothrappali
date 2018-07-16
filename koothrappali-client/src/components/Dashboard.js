import React, { Component } from 'react';
import ProjectList from './ProjectList';
import Navbar from './Navbar';
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
