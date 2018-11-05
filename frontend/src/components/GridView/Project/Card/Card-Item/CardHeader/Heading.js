import React from 'react'

export default class Heading extends React.Component {
    render() {
        return (
            <h3>{this.props.title}</h3>
        )
    }
}