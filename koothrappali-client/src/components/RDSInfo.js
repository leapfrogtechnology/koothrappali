import React, { Component } from 'react';

import * as awsService from '../services/AwsService.js';
class RDSInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: ''
    }
    this.handleInstance = this.handleInstance.bind(this);
  }

  handleInstance(id, e) {
    e.preventDefault();
    awsService.fetchRDSInstancePrice(id).then((response) => {
      console.log(response);
      this.setState({ price: response.data });
    })
  }

  render() {
    if (this.props.rdsItem.length) {
      return (
        <div>
          <h2>RDS Instances</h2>
          {
            (!this.state.price ? '' :
              <div className="col-sm-12">
                <h5 className="text-success .sserif" >

                  Estimated Price: $ {Math.round(this.state.price.data * 100) / 100}
                </h5>
              </div>
            )}
          <div className="col-sm-12 bg-light">
            <ul className="list-group">
              {
                this.props.rdsItem.map((item, i) =>
                  <li key={i} className="list-group-item list-group-item-action">
                    {item.DBName}&emsp;
               <a href="#" onClick={this.handleInstance.bind(this, item.DBInstanceIdentifier)}> <span>{item.DBInstanceClass}</span></a>
                    <span >AllocatedStorage: {item.AllocatedStorage}</span>
                  </li>
                )}
            </ul>
          </div>
        </div>
      )
    }
  }
}
export default RDSInfo;
