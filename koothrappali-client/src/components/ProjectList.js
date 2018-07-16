import React, { Component } from 'react';

import * as lmsService from '../services/LmsService.js';
import * as awsService from '../services/AwsService.js';
import ProjectInfo from './ProjectInfo.js';
class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      projectDetail: [],
      projectInfo: []
    };
    this.handleProject = this.handleProject.bind(this);
  }

  componentDidMount() {
    lmsService.fetchLMSAllProject().then((response) => {
      this.setState({ projectDetail: response.data.data });
    })
  }

  handleProject(id, e) {
    e.preventDefault();
    awsService.fetchProjectById(id).then((response) => {
      this.setState({ projectInfo: response.data.data });
    })
  }

  render() {
    if (this.state.projectDetail) {
      return (
        <div className="row">
          <div className="col-sm-8">
            {
              this.state.projectDetail.map((project, i) => {
                return (
                  <div className="col-sm-4" key={i}>
                    <div className="white-box analytics-info">
                      <h3 className="box-title">{project.name}</h3>
                      <ul className="list-inline two-part">
                        <li>
                          <div id="sparklinedash"></div>
                        </li>
                        <li className="text-right">
                          <i className="ti-arrow-up text-success"></i>
                          <a className="counter text-success" href="#" onClick={this.handleProject} onClick={this.handleProject.bind(this, project.id)}>EC2
                        </a> &emsp;
                        <a className="counter text-success" href="#" onClick={this.handleProject} onClick={this.handleS3.bind(this, project.id)}>S3
                        </a> &emsp;
                        <a className="counter text-success" href="#" onClick={this.handleProject} onClick={this.handleRDS.bind(this, project.id)}>RDS
                        </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="col-sm-4">
            <ProjectInfo item={this.state.projectInfo} />
          </div>
        </div>
      )
    }
  }
}

export default ProjectList;