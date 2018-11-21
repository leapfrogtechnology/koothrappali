import React from 'react';
import PropTypes from 'prop-types';

import Project from './Project/Index';

const TableView = props => (
  <table className="table table-striped">
    {props.projects.map((project, i) => (
      <Project project={project} key={i} />
    ))}
  </table>
);

TableView.propTypes = {
  projects: PropTypes.array
};

export default TableView;
