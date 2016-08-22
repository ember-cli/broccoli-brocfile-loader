/* globals describe, it */

var expect = require('chai').expect;
var path = require('path');
var load = require('../');

var FIXTURES = path.join(__dirname, 'fixtures');

describe('brocfile-loader', function() {
  it('finds Brocfile.js files', function() {
    process.chdir(path.join(FIXTURES, 'simple'));
    expect(load()).to.equal('simple');
  });

  it('finds Brocfile.js files in parent folders', function() {
    process.chdir(path.join(FIXTURES, 'nested', 'foo', 'bar'));
    expect(load()).to.equal('nested');
  });

  it('finds Brocfile.js files case-independently', function() {
    process.chdir(path.join(FIXTURES, 'case-independent'));
    expect(load()).to.equal('case-independent');
  });

  it('throws error if no Brocfile.js can be found', function() {
    process.chdir(FIXTURES);
    expect(load).to.throw('Brocfile.js not found');
  });

  it('changes the working directory', function() {
    process.chdir(path.join(FIXTURES, 'nested', 'foo', 'bar'));
    load();
    expect(process.cwd()).to.equal(path.resolve(FIXTURES, 'nested'));
  });

  it('loads the Brocfile.js file', function() {
    process.chdir(path.join(FIXTURES, 'simple'));
    expect(load()).to.equal('simple');
  });
});
