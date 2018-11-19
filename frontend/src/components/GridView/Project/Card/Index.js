import React from 'react';
import PropTypes from 'prop-types';

import CardItem from './Card-Item/Index'
import EnvironmentHeading from './Environment-Heading';

const Card = (props) => {
  const { environment } = props;
  return (
    <section className="card-wrapper">
      <EnvironmentHeading title={environment.title} />
      <div className="d-flex justify-content-left flex-wrap">
        {environment.servers.map((server, j) => {
          return <CardItem server={server} key={j} />
        })}
      </div>
    </section>
  );
};

Card.propTypes = {
  environment: PropTypes.shape({
    title: PropTypes.string,
    servers: PropTypes.array
  })
};

export default Card;
