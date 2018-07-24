import React, { Component } from 'react';

import * as lmsService from '../services/LmsService.js';
import * as awsService from '../services/AwsService.js';
import ProjectInfo from './ProjectInfo.js';
import RDSInfo from './RDSInfo.js';
import Bucket from './Buckets.js';

import * as CONSTANTS from '../constants/constants.js';
class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      rdsInfo: [],
      bucketInfo: [],
      projectInfo: [],
      projectDetail: []
    };
    this.handleS3 = this.handleS3.bind(this);
    this.handleProject = this.handleProject.bind(this);
  }

  componentDidMount() {
    lmsService.fetchLMSAllProject().then((response) => {
      this.setState({ projectDetail: response.data.data });
    })
  }

  handleProject(id, e) {
    e.preventDefault();
    awsService.fetchProjectById("1").then((response) => {
      this.setState({ projectInfo: response.data.data });
    })
  }

  handleS3(id, e) {
    e.preventDefault();
    awsService.fetchS3BucketById(id).then((response) => {
      this.setState({ bucketInfo: response.data.data });
    })
  }

  handleRDS(id, e) {
    e.preventDefault();
    awsService.fetchRDSById(id).then((response) => {
      this.setState({ rdsInfo: response.data.data });
    })
  }

  render() {
    const projectInfoLength = this.state.projectInfo.length;
    const bucketLength = this.state.bucketInfo.length;
    const rdsInfoLength = this.state.rdsInfo.length;

    if (this.state.projectDetail) {
      return (
        <div className="row">
          <div className="col-sm-3">
            {
              this.state.projectDetail.map((project, i) => {
                return (
                  <div className="col-sm-12" key={i}>
                    <div className="white-box analytics-info">
                      <div className="box-title .mserif">{project.name}</div  >
                      <ul className="list-inline two-part">
                        <li>
                          <div id="sparklinedash"></div>
                        </li>
                        <li className="text-right">
                          <i className="ti-arrow-up text-success"></i>
                          <a className="counter text-success .sserif" href="#" onClick={this.handleProject.bind(this, project.id)}>{CONSTANTS.EC2}
                          </a> &emsp;
                        <a className="counter text-success .sserif " href="#" onClick={this.handleS3.bind(this, project.id)}>{CONSTANTS.S3}
                          </a> &emsp;
                        <a className="counter text-success .sserif " href="#" onClick={this.handleRDS.bind(this, project.id)}>{CONSTANTS.RDS}
                          </a> &emsp;
                        </li>
                      </ul>
                    </div>
                    <br />
                  </div>
                );
              })
            }
          </div>

          {
            (!projectInfoLength && !bucketLength && !rdsInfoLength) ? 'PLEASE CLICK ON PROJECT' :
             <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-4">
                  {projectInfoLength ? <ProjectInfo item={this.state.projectInfo} /> : CONSTANTS.NOEC2}
                </div>
                <div className="col-sm-4">
                  {bucketLength ? <Bucket bucketItem={this.state.bucketInfo} /> : CONSTANTS.NOS3}
                </div>
                <div className="col-sm-4">
                  {rdsInfoLength ? <RDSInfo rdsItem={this.state.rdsInfo} /> : CONSTANTS.NORDS}
                </div>
              </div>
            </div>
          }

        </div>
      )
    }
  }
}

export default ProjectList;
