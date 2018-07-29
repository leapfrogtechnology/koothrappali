import React, { Component } from 'react';

import Bucket from './Buckets.js';
import RDSInfo from './RDSInfo.js';
import ProjectInfo from './ProjectInfo.js';
import { CONSTANTS } from '../constants/constants.js';
import * as lmsService from '../services/LmsService.js';
import * as awsService from '../services/AwsService.js';

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

  handleProject(awsId, e) {
    e.preventDefault();
    awsService.fetchProjectByAWSId(awsId)
      .then((response) => {
        this.setState({ projectInfo: response.data.data });
      })
  }

  handleS3(awsId, e) {
    e.preventDefault();
    awsService.fetchS3BucketByAWSId(awsId).then((response) => {
      this.setState({ bucketInfo: response.data.data });
    })
  }

  handleRDS(awsId, e) {
    console.log("awsid",awsId);
    e.preventDefault();
    awsService.fetchRDSByAWSId(awsId).then((response) => {
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
                      <div className="box-title .mserif">{project.name}</div>
                      <div className="box-title .mserif">{project.projectManager ? project.projectManager.name : ''}</div>
                      <ul className="list-inline two-part">
                        <li>
                          <div id="sparklinedash"></div>
                        </li>
                        <li className="text-right">
                          <i className="ti-arrow-up text-success"></i>
                          <a className="counter text-success .sserif" href="#" onClick={this.handleProject.bind(this, project.awsId)}>{CONSTANTS.MESSAGE.EC2}
                          </a> &emsp;
                        <a className="counter text-success .sserif " href="#" onClick={this.handleS3.bind(this, project.awsId)}>{CONSTANTS.MESSAGE.S3}
                          </a> &emsp;
                        <a className="counter text-success .sserif " href="#" onClick={this.handleRDS.bind(this, project.awsId)}>{CONSTANTS.MESSAGE.RDS}
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
                    {projectInfoLength ? <ProjectInfo item={this.state.projectInfo} /> : CONSTANTS.MESSAGE.NOEC2}
                  </div>
                  <div className="col-sm-4">
                    {bucketLength ? <Bucket bucketItem={this.state.bucketInfo} /> : CONSTANTS.MESSAGE.NOS3}
                  </div>
                  <div className="col-sm-4">
                    {rdsInfoLength ? <RDSInfo rdsItem={this.state.rdsInfo} /> : CONSTANTS.MESSAGE.NORDS}
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
