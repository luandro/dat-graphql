'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resolver = require('./subscription/resolver');

var _resolver2 = _interopRequireDefault(_resolver);

var _resolver3 = require('./query/resolver');

var _resolver4 = _interopRequireDefault(_resolver3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Subscription: _resolver2.default,
  Query: _resolver4.default
};