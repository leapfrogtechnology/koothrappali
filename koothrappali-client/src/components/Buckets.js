import React, { Component } from 'react';

import * as awsService from '../services/AwsService.js';

class Buckets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: ''
    }
    this.handleInstance = this.handleInstance.bind(this);
  }

  handleInstance(bucketName, e) {
    e.preventDefault();
    awsService.fetchS3InstancePrice(bucketName).then((response) => {
      this.setState({ price: response.data });
    })
  }

  render() {
    if (this.props.bucketItem.length) {
      return (
        <div className="container">
          <h2>S3 Instances</h2>
          {
            (!this.state.price ? '' :
              <div className="col-sm-12">
                <h5 className="text-success .sserif" >

                  Estimated Price: $ {this.state.price.data * 100 / 100}
                </h5>
              </div>
            )}
          {
            this.props.bucketItem.map((item, i) =>
              <div className="col-sm-12 bg-light">
                <ul key={i} className="list-group">
                  <li className="list-group-item list-group-item-action"><a href="#" onClick={this.handleInstance.bind(this, item)}><span className="badge">{item}</span></a></li>
                </ul>
              </div>
            )}
        </div>
      )
    }
  }
}
export default Buckets;
