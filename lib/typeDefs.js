'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('./dat/types');

var _types2 = _interopRequireDefault(_types);

var _type = require('./subscription/type');

var _type2 = _interopRequireDefault(_type);

var _type3 = require('./query/type');

var _type4 = _interopRequireDefault(_type3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = function Schema() {
  return ['\n  schema {\n    query: Query,\n    subscription: Subscription\n  }\n'];
};

exports.default = [_types2.default, _type4.default, _type2.default, Schema];