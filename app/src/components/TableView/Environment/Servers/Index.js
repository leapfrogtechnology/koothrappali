import React from 'react';
import PropTypes from 'prop-types';

const Servers = props => <tbody>{props.children}</tbody>;

Servers.propTypes = {
  children: PropTypes.any
};

export default Servers;
