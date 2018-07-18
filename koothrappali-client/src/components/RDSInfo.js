import React, { Component } from 'react';

class RDSInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.rdsItem.length) {
      return (
        <div>
          {
            this.props.rdsItem.map((item, i) =>
              <div key={i}>
                <li>{item.DBName}&emsp;
                {item.DBInstanceClass}&emsp;
                {item.AllocatedStorage}&emsp;
                {item.MultiAZ}</li>
              </div>
            )}
        </div>
      )
    }
  }
}
export default RDSInfo;
