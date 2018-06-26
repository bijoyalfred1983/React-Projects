/* @flow */
const _ = require('lodash/fp');

const defaultConfig = require('./default');

module.exports = _.merge(defaultConfig, {
  // Over write default settings here...
  host: process.env.NODE_HOST || '0.0.0.0'
});
