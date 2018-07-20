import React, { Component } from 'react';

class RDSInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.rdsItem.length) {
      return (
        <div className="container">
          <h2>RDS Instances</h2>
          <ul className="list-group">
            {
              this.props.rdsItem.map((item, i) =>
                <li key={i} className="list-group-item list-group-item-action">
                  {item.DBName}&emsp;
               <a href="#"> <span class="badge">{item.DBInstanceClass}</span></a>
                <span class="badge">AllocatedStorage: {item.AllocatedStorage}</span>
                </li>
              )}
          </ul>
        </div>
      )
    }
  }
}
export default RDSInfo;
