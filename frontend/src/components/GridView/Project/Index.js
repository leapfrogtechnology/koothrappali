import React, { PureComponent } from 'react'

import Card from './Card/Index';

export default class Project extends PureComponent {
    render() {
        return (<section>
            <h1>{this.props.project.project}</h1>
            {this.props.project.environments.map(function (environment, i) {
                return <Card environment={environment} key={i} />
            })}
        </section>)
    }
}
