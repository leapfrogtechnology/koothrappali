import React from 'react'
import PropTypes from 'prop-types';

import DescriptionItem from './Description-Item';

const Description = (props) => {
  const { details } = props;
  return (
    <ul className="list-group list-group-flush">
      <DescriptionItem detail={details.domain} />
      <DescriptionItem detail={details.os} />
      <DescriptionItem detail={details.account} />
      <DescriptionItem detail={details.location} />
    </ul>
  );
};

Description.propTypes = {
  details: PropTypes.shape({
    domain: PropTypes.string,
    os: PropTypes.string,
    account: PropTypes.string,
    location: PropTypes.string,
  })
}

export default Description;
