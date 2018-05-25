"use strict";

var Dat = "\n  type Dat {\n    name: String!\n    subscribed: Boolean\n    connected: Boolean\n    progress: Int\n    done: Boolean\n    peers: Int\n  }\n";
module.exports = function () {
  return [Dat];
};