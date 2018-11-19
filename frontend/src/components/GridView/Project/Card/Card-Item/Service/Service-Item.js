import React from 'react';
import PropTypes from 'prop-types';

const ServiceItem = (props) => (
  <span className="badge badge-pill badge-primary">{props.service}</span>
);

ServiceItem.propTypes = {
  service: PropTypes.string
};

export default ServiceItem;
