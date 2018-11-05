import React, { PureComponent } from 'react'

import DescriptionItem from './Description-Item';

export default class Description extends PureComponent {
    render() {
        return (
            <ul className="list-group list-group-flush">
                <DescriptionItem detail={this.props.details.domain}/>
                <DescriptionItem detail={this.props.details.os}/>
                <DescriptionItem detail={this.props.details.account}/>
                <DescriptionItem detail={this.props.details.location}/>
            </ul>
        )
    }
}
