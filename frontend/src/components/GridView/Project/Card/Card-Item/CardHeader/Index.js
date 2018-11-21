import React from 'react';
import PropTypes from 'prop-types';

import IP from './IP';
import Type from './Type';
import Heading from './Heading';

const CardHeader = props => {
  const { server } = props;

  return (
    <div className="card-header bg-secondary border-secondary clearfix">
      <Heading title={server.name} />
      <Type type={server.type} />
      <IP ip={server.ip} />
    </div>
  );
};

CardHeader.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.type,
    ip: PropTypes.ip
  })
};

export default CardHeader;
