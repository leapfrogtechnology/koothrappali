import React from 'react'

export default class IP extends React.Component {
    render() {
        return (
            <span className="ip-address">{this.props.ip}</span>
        )
    }
}
