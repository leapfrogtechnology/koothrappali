import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/app';

describe('Instances Controller Test', () => {
  it('should return list of instances', done => {
    request(app)
      .get('/api/instances')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  }).timeout(300000);
});
