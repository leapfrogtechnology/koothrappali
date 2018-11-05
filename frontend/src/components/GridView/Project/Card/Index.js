import React from 'react';
import CardItem from './Card-Item/Index'
import EnvironmentHeading from './Environment-Heading';

export default class Card extends React.Component {
    render() {
        return (<section className="card-wrapper">
            <EnvironmentHeading title={this.props.environment.title} />
            <div className="d-flex justify-content-left flex-wrap">
                {this.props.environment.servers.map(function (server, j) {
                    return <CardItem server={server} key={j} />
                })}
            </div>
        </section>);
    }
}