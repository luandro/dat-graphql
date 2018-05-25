"use strict";

var Subscription = "\n  type Subscription {\n    downloadDat(hash: String!): Dat\n  }\n";

module.exports = function () {
  return [Subscription];
};