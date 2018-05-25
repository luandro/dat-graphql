"use strict";

var Query = "\n  type Query {\n    getDats: [Dat]\n  }\n";
module.exports = function () {
  return [Query];
};