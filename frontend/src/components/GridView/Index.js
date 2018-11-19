import React from 'react';
import PropTypes from 'prop-types';

import Project from './Project/Index';

const GridView = (props) => (
  <section>
    {props.projects.map((project, i) => {
      return <Project project={project} key={i} />
    })}
  </section>
);

GridView.propTypes = {
  projects: PropTypes.array
};

export default GridView;
