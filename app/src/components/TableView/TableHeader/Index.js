import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = props => (
  <thead>
    <tr>
      <th colSpan={props.isFullLength ? '9' : '0'}>{props.children}</th>
    </tr>
  </thead>
);

TableHeader.propTypes = {
  children: PropTypes.any,
  isFullLength: PropTypes.bool
};

export default TableHeader;
