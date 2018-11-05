import React from 'react';
import Service from './Service/Index';
import CardHeader from './CardHeader/Index'
import Description from './Description/Index';

export default class CardItem extends React.Component {
    render() {
        return (
            <div className="card border-secondary mb-3 box-shadow">
                <CardHeader server={this.props.server} />
                <Service  services={this.props.server.services}/>
                <Description details={this.props.server}/>
            </div>
        );
    }
}