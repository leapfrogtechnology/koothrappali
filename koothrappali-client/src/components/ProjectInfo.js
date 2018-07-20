import React, { Component } from 'react';

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.item) {
      return (
        <div className="container">
          <h2>EC2 Instances</h2>
          {this.props.item.map((instance, i) => {
            return (
              <ul key={i} className="list-group">
                <li className="list-group-item list-group-item-action">{instance.project}
                  <a href="#">
                    <span className="badge">
                      {instance.instanceType}
                    </span>
                  </a>
                </li>
              </ul>
            );
          })
          }
        </div>
      )
    }
  }
}
export default ProjectInfo;
