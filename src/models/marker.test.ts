import { expect } from 'chai';
import Marker from './marker.model';

describe('Marker model', function () {
  it('should be invalid if label is empty', function (done) {
    var m = new Marker();

    m.validate(function (err) {
      expect(err.errors.label).to.exist;
      done();
    });
  });

  it('should be invalid if lat is empty', function (done) {
    var m = new Marker();

    m.validate(function (err) {
      expect(err.errors.lat).to.exist;
      done();
    });
  });

  it('should be invalid if lng is empty', function (done) {
    var m = new Marker();

    m.validate(function (err) {
      expect(err.errors.lng).to.exist;
      done();
    });
  });
});