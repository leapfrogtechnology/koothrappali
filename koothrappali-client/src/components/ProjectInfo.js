import React, { Component } from 'react';

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.item) {
      return (
        <div>
          {this.props.item.map((instance, i) => {
            return (
              <div key={i}>
                {i}&emsp;
								{instance.project}&emsp;
								{instance.instanceType}
              </div>
            );
          })
          }
        </div>
      )
    }
  }
}
export default ProjectInfo;
