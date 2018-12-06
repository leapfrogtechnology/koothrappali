import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/app';

describe('/api/servers', () => {
  it('should return list of servers', done => {
    request(app)
      .get('/api/servers')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  }).timeout(300000);
});
