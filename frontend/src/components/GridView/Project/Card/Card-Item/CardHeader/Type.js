import React from 'react'
import PropTypes from 'prop-types';

const Type = (props) => (
  <span className="type">{props.type}</span>
);

Type.propTypes = {
  type: PropTypes.string
};

export default Type;
