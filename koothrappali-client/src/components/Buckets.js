import React, { Component } from 'react';

class Buckets extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.bucketItem.length) {
      return (
        <div className="container">
          <h2>S3 Instances</h2>
          {
            this.props.bucketItem.map((item, i) =>
              <div className="col-sm-12 bg-light">
                <ul key={i} className="list-group">
                  <li className="list-group-item list-group-item-action"><a href="#"><span className="badge">{item}</span></a></li>
                </ul>
              </div>
            )}
        </div>
      )
    }
  }
}
export default Buckets;
