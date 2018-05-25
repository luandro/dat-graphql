'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _helpers = require('../dat/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getDats: function getDats(_, _ref, _ref2) {
    var sbot = _ref2.sbot,
        dat = _ref2.dat,
        paths = _ref2.paths;
    (0, _objectDestructuringEmpty3.default)(_ref);
    return (0, _helpers.getDats)(dat, paths.datPath);
  }
};