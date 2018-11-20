import React from 'react';
import PropTypes from 'prop-types';

const EnvironmentHeading = (props) => (
  <h2>{props.title}</h2>
)

EnvironmentHeading.propTypes = {
  title: PropTypes.string
};

export default EnvironmentHeading;
