import React from 'react';
import PropTypes from 'prop-types';

const IP = props => <span className="ip-address">{props.ip}</span>;

IP.propTypes = {
  ip: PropTypes.string
};

export default IP;
