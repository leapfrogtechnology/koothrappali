import React from 'react';
import PropTypes from 'prop-types';

const SingleRow = props => {
  const { server } = props;

  return (
    <>
      <tr className={server.status === 'stopped' ? 'text-danger' : ''}>
        <td>{server.name}</td>
        <td>{server.type}</td>
        <td>{server.ip}</td>
        <td>{server.domain}</td>
        <td>{server.os}</td>
        <td>{server.account}</td>
        <td>{server.location}</td>
        <td>{server.services}</td>
        <td>{server.status}</td>
      </tr>
    </>
  );
};

SingleRow.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    ip: PropTypes.string,
    domain: PropTypes.string,
    os: PropTypes.string,
    account: PropTypes.string,
    location: PropTypes.string,
    services: PropTypes.array,
    status: PropTypes.string
  })
};
export default SingleRow;
