import React, { PureComponent } from 'react'

import Project from './Project/Index';

export default class GridView extends PureComponent {
    render() {
        return (
            <section>
                {this.props.projects.map(function (project, i) {
                    return <Project project={project} key={i}/>
                })}
            </section>
        )
    }
}
