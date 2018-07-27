import React, { Component } from 'react';
import * as awsService from '../services/AwsService.js';
import Price from './Price.js';
class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: ''
    }
    this.handleInstance = this.handleInstance.bind(this);
  }

  handleInstance(id, e) {
    e.preventDefault();
    awsService.fetchEC2InstancePrice(id).then((response) => {
      this.setState({ price: response.data });
    })
  }

  render() {
    if (this.props.item) {
      return (
        <div>
          <h2>EC2 Instances</h2>
          {
            (!this.state.price ? '' :
              <div className="col-sm-12">
                <Price item={this.state.price} />
              </div>
            )}

          {this.props.item.map((instance, i) => {
            return (
              <div className="row">
                <div className="col-sm-12 bg-light">
                  <ul key={i} className="list-group">
                    <li className="list-group-item">{instance.project}
                      <a href="#" onClick={this.handleInstance.bind(this, instance.instanceId)}>
                        <span className="badge">
                          {instance.instanceType}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )
    }
  }
}
export default ProjectInfo;
