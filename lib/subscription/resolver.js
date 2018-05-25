'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../dat/helpers');

exports.default = {
  downloadDat: {
    subscribe: function subscribe(_, _ref, _ref2) {
      var hash = _ref.hash;
      var pubsub = _ref2.pubsub,
          sbot = _ref2.sbot,
          dat = _ref2.dat,
          paths = _ref2.paths;

      var channel = Math.random().toString(36).substring(2, 15); // random channel name
      (0, _helpers.downloadDat)(pubsub, channel, dat, paths.datPath, hash);
      return pubsub.asyncIterator(channel);
    }
  }
};