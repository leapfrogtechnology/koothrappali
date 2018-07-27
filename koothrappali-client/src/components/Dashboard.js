import React, { Component } from 'react';

import ProjectList from './ProjectList';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand .text-center .lserif  bg-light" >Koothrappali</a>
        </nav>
        <form className="form-inline tpadding lpadding">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div className="container-fluid tpadding mpadding ">
          <ProjectList />
        </div>
      </div>
    )
  }
}
export default Dashboard;
