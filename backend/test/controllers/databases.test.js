import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/app';

describe('/api/databases', () => {
  it('should return list of databases', done => {
    request(app)
      .get('/api/databases')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  }).timeout(300000);
});
