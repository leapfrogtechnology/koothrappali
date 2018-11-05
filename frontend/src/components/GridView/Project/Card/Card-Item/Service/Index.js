import React, { PureComponent } from 'react';

import ServiceItem from './Service-Item';

export default class Service extends PureComponent {
    render() {
        return (
            <div className="card-body text-secondary">
                {this.props.services.map(function (service, i) {
                    return <ServiceItem service={service} key={i} />
                })}
            </div>
        )
    }
}

