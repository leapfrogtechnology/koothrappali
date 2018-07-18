import React, { Component } from 'react';

class Buckets extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.bucketItem.length) {
      return (
        <div>
          {
            this.props.bucketItem.map((item,i) =>
              <div key={i}><li>{item}</li></div>
            )}
        </div>
      )
    }
  }
}
export default Buckets;
