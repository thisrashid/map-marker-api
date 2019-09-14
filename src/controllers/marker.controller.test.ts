import supertest from 'supertest';
import { app, server } from '../index';
import { IMarker } from '../models';
import { assert, expect } from 'chai';

describe('Map Marker', function () {
  const marker: Partial<IMarker> = {
    "label": "Munich, Germany",
    "lat": 48.1351253,
    "lng": 11.5819805
  };

  after(function () {
    server.close();
  });

  describe('create marker', () => {
    it('should throw 401 error', function (done) {
      supertest(app)
        .post('/markers')
        .send(marker)
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('should create new marker', function (done) {
      supertest(app)
        .post('/markers')
        .send(marker)
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .expect('content-type', /application\/json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            const { label, lat, lng } = res.body.data;
            assert(label, marker.label);
            expect(lat).equal(marker.lat);
            expect(lng).equal(marker.lng);
            marker.id = res.body.data._id;
            done();
          }
        });
    });
  });

  describe('view marker', () => {
    it('should retrieve marker by id', function (done) {
      supertest(app)
        .get(`/markers/${marker.id}`)
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .expect('content-type', /application\/json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            const { label, lat, lng } = res.body.data;
            assert(label, marker.label);
            expect(lat).equal(marker.lat);
            expect(lng).equal(marker.lng);
            done();
          }
        });
    });

    it('should return 404 (marker does not exist)', function (done) {
      supertest(app)
        .get(`/markers/5d7c94f982ba3a048a89d3e7`)
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .expect('content-type', /application\/json/)
        .expect(404, done);
    });

    it('should return 400 (bad input)', function (done) {
      supertest(app)
        .get(`/markers/123`)
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .expect('content-type', /application\/json/)
        .expect(400, done);
    });
  });

  describe('update marker', () => {
    marker.label += ' updated';
    it('should return 400 (invalid data)', function (done) {
      supertest(app)
        .put(`/markers/${marker.id}`)
        .send({})
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .expect('content-type', /application\/json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            const { label, lat, lng } = res.body.data;
            assert(label, marker.label);
            expect(lat).equal(marker.lat);
            expect(lng).equal(marker.lng);
            done();
          }
        });
    });

    it('should return 401', function (done) {
      supertest(app)
        .put(`/markers/${marker.id}`)
        .send({})
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('should update', function (done) {
      supertest(app)
        .put(`/markers/${marker.id}`)
        .send(marker)
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .expect('content-type', /application\/json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            const { label, lat, lng } = res.body.data;
            assert(label, marker.label);
            expect(lat).equal(marker.lat);
            expect(lng).equal(marker.lng);
            done();
          }
        });
    });
  });

  describe('delete marker', () => {
    it('should throw 400 error', function (done) {
      supertest(app)
        .delete('/markers/123')
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .expect(400, done);
    });

    it('should throw 401 error', function (done) {
      supertest(app)
        .delete('/markers/123')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('should delete marker', function (done) {
      supertest(app)
        .delete(`/markers/${marker.id}`)
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .expect('content-type', /application\/json/)
        .expect(200, done);
    });
  });

  describe('list markers', () => {
    for (let i = 0; i < 25; i++) {
      supertest(app)
        .post('/markers')
        .send({
          label: `label ${i}`,
          lat: Math.random(),
          lng: Math.random()
        })
        .set('User-Agent', 'My cool browser')
        .set('authorization', 'Basic dGVzdHVzZXI6ZG9udGtub3c=')
        .set('Accept', 'application/json')
        .end(() => { });
    }

    it('should list first 10 markers', function (done) {
      supertest(app)
        .get('/markers')
        .set('User-Agent', 'My cool browser')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body.data).to.be.an('array');
            expect(res.body.data.length).to.equal(10);
            done();
          }
        });
    });
  });
});