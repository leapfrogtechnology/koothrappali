import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/app';

describe('Buckets Controller Test', () => {
  it('should return list of buckets', done => {
    request(app)
      .get('/api/buckets')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  }).timeout(300000);
});
