'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDats = exports.shareDat = exports.downloadDat = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require('fs');
var mirror = require('mirror-folder');
var ram = require('random-access-memory');
var mkdirp = require('mkdirp');

var downloadDat = exports.downloadDat = function downloadDat(pubsub, channel, Dat, datPath, hash) {
  var dest = path.join(datPath, hash);
  if (!fs.existsSync(dest)) {
    mkdirp.sync(dest);
  }
  var downloadDat = {
    name: null,
    connected: false,
    subscribed: false,
    progress: 0,
    done: false,
    peers: 0
  };
  Dat(ram, { key: hash, sparse: true }, function (err, dat) {
    if (err) console.log('Error on downloading dat ', err);
    var network = dat.joinNetwork();
    var stats = dat.trackStats();

    network.once('connection', function () {
      var peers = stats.peers;
      console.log('Connected');
      downloadDat.connected = true;
      downloadDat.peers = dat.network.connected;
      pubsub.publish(channel, { downloadDat: downloadDat });
    });
    dat.archive.metadata.update(download);

    function download() {
      var progress = mirror({ fs: dat.archive, name: '/' }, dest, function (err) {
        if (err) throw err;
        console.log('Done');
        downloadDat.done = true;
        console.log('RES', downloadDat);
        pubsub.publish(channel, { downloadDat: downloadDat });
      });
      progress.on('put', function (src) {
        console.log('Downloading', src.name);
      });
    }
    console.log('Downloading: ' + dat.key.toString('hex') + '\n');
    downloadDat.name = dat.key.toString('hex');
  });
};

var shareDat = exports.shareDat = function shareDat(pubsub, channel, Dat, datPath) {
  return new _promise2.default(function (resolve, reject) {
    Dat(src, function (err, dat) {
      if (err) console.log('Err on sharing ', err);

      var network = dat.joinNetwork();
      network.once('connection', function () {
        console.log('Connected');
      });
      var progress = dat.importFiles(src, {
        ignore: ['**/dat-node/node_modules/**']
      }, function (err) {
        if (err) throw err;
        console.log('Done importing');
        console.log('Archive size:', dat.archive.content.byteLength);
      });
      progress.on('put', function (src, dest) {
        console.log('Added', dest.name);
      });

      console.log('Sharing: ' + dat.key.toString('hex') + '\n');
    });
  });
};

var getDats = exports.getDats = function getDats(Dat, datPath) {
  return new _promise2.default(function (resolve, reject) {
    console.log('datPath', datPath);
    var res = [];
    var files = fs.readdirSync(datPath);
    var datFolders = files.filter(function (file) {
      return file.length === 64;
    });
    datFolders.map(function (folder) {
      return res.push({
        name: folder
      });
    });
    resolve(res);
  });
};