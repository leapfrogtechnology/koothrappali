import React from 'react';

export default class ServiceItem extends React.Component {
    render() {
        return (
            <span className="badge badge-pill badge-primary">{this.props.service}</span>
        )
    }
}
