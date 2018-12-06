import React from 'react';
import PropTypes from 'prop-types';

import Servers from './Servers/Index';
import SingleRow from './SingleRow/Index';
import TableHeader from '../TableHeader/Index';
import ColumnHeading from './ColumnHeading/Index';

const Environment = props => {
  const { environment } = props;

  return (
    <>
      <TableHeader isFullLength>
        <h2>{environment.title}</h2>
      </TableHeader>

      <ColumnHeading />

      {environment.servers.map((server, index) => (
        <Servers key={index}>
          <SingleRow server={server} key={index} />
        </Servers>
      ))}
    </>
  );
};

Environment.propTypes = {
  environment: PropTypes.shape({
    title: PropTypes.string,
    servers: PropTypes.array
  })
};

export default Environment;
