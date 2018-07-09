'use strict';

import * as HttpStatus from 'http-status-codes';

const commonUtils = {
  success(response, data) {
    response.status(HttpStatus.OK).send(data);
  }
};

export default commonUtils;
