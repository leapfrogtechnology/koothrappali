import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from '../TableHeader/Index';
import Environment from '../Environment/Index';

const Project = props => {
  const { project } = props;

  return (
    <>
      <TableHeader isFullLength>
        <h1>{project.project}</h1>
      </TableHeader>

      {project.environments.map((environment, index) => (
        <Environment environment={environment} key={index} />
      ))}
    </>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    project: PropTypes.string,
    environments: PropTypes.array
  })
};

export default Project;
