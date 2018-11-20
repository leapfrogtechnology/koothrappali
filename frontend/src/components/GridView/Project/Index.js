import React from 'react'
import PropTypes from 'prop-types';

import Card from './Card/Index';

const Project = (props) => {
  const { project } = props;

  return (
    <section>
      <h1>{project.project}</h1>
      {project.environments.map((environment, i) => (
        <Card environment={environment} key={i} />
      ))}
    </section>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    project: PropTypes.string,
    environments: PropTypes.array
  })
};

export default Project;
