import React, { Component } from 'react';
import axios from 'axios';

import * as lmsService from '../services/LmsService.js';

class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    lmsService.fetchLMSAllProject().then((response) => {
      console.log("response", response)
      this.setState({ data: response.data });
    })
  }

  render() {
    return (
      <h1>React App</h1>
    );
  }
}

export default ProjectList;