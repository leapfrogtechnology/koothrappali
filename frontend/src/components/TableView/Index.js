import React, { PureComponent } from 'react'
// import Project from '../GridView/Project'

export default class TableView extends PureComponent {
    render() {
        return (
            <table className="table table-striped">
                {/* {this.props.projects.map(function (project) {
                    return <Project project={project} isTable="true" />
                })} */}
            </table>
        )
    }
}
