import React from 'react';
import PropTypes from 'prop-types';

import Service from './Service/Index';
import CardHeader from './CardHeader/Index'
import Description from './Description/Index';

const CardItem = (props) => {
  const { server } = props;
  return (
    <div className="card border-secondary mb-3 box-shadow">
      <CardHeader server={server} />
      <Service services={server.services} />
      <Description details={server} />
    </div>
  );
};

CardItem.propTypes = {
  server: PropTypes.shape({
    services: PropTypes.array
  })
};

export default CardItem;
