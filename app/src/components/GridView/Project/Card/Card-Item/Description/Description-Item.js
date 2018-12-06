import React from 'react';
import PropTypes from 'prop-types';

const DescriptionItem = props => <li className="list-group-item">{props.detail}</li>;

DescriptionItem.propTypes = {
  detail: PropTypes.string
};

export default DescriptionItem;
