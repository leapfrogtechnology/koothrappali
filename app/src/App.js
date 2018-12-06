import React, { Component } from 'react';

import GridView from './components/GridView/Index';
import TableView from './components/TableView/Index';
import { fetchAll } from './services/instance';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isGridView: true
    };
  }

  componentDidMount() {
    fetchAll().then(data => this.setState({ data: data.data }));
  }

  showGridView() {
    this.setState({ isGridView: true });
  }

  showTableView() {
    this.setState({ isGridView: false });
  }

  render() {
    const { isGridView, data } = this.state;

    return (
      <main role="main" className="container-fluid">
        <div className="btn-group float-right">
          <a
            href="#grid-view"
            className={isGridView ? 'btn btn-success' : 'btn btn-primary'}
            onClick={this.showGridView.bind(this)}
          >
            Grid View
          </a>
          <a
            href="#table-view"
            className={!isGridView ? 'btn btn-success' : 'btn btn-primary'}
            onClick={this.showTableView.bind(this)}
          >
            Table View
          </a>
        </div>
        {data ? isGridView ? <GridView projects={data.data} /> : <TableView projects={data.data} /> : <p>Loading...</p>}
      </main>
    );
  }
}

export default App;
