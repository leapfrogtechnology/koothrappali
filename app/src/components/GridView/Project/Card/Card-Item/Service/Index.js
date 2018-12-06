import React from 'react';
import PropTypes from 'prop-types';

import ServiceItem from './Service-Item';

const Service = props => (
  <div className="card-body text-secondary">
    {props.services.map((service, i) => (
      <ServiceItem service={service} key={i} />
    ))}
  </div>
);

Service.propTypes = {
  services: PropTypes.array
};

export default Service;
