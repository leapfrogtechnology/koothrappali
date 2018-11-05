import React from 'react';

import IP from './IP';
import Type from './Type';
import Heading from './Heading';

export default class CardHeader extends React.Component {
    render() {
        return (
            <div className="card-header bg-secondary border-secondary clearfix">
                <Heading title={this.props.server.name} />
                <Type type={this.props.server.type}/>
                <IP ip={this.props.server.ip}/>
            </div>
        );
    }
}