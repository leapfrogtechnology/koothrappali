import React, { PureComponent } from 'react'

export default class DescriptionItem extends PureComponent {
  render() {
    return (
        <li className="list-group-item">{this.props.detail}</li>
    )
  }
}
