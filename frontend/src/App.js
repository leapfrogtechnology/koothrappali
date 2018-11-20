import './App.css';
import React, { Component } from 'react';

import * as config from './config';
import * as http from './utils/http';
import GridView from '../components/GridView/Index';
import TableView from '../components/TableView/Index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isGridView: true
    };
  }

  componentDidMount() {
    http.get("/data")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  showGridView = () => {
    this.setState({ isGridView: true })
  }

  showTableView = () => {
    this.setState({ isGridView: false })
  }

  render() {
    const { isGridView, data } = this.state
    return (
      <main role="main" className="container-fluid">
        <div className="btn-group float-right">
          <a href="#grid-view" className={isGridView ? 'btn btn-success' : 'btn btn-primary'} onClick={this.showGridView}>Grid View</a>
          <a href="#table-view" className={!isGridView ? 'btn btn-success' : 'btn btn-primary'} onClick={this.showTableView}>Table View</a>
        </div>
        {data ?
          isGridView ?
            <GridView projects={data} />
            : <TableView projects={data} /> : <p>Loading...</p>
        }
      </main>
    );
  }
}

export default App;
