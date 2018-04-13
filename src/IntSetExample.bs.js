// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE
'use strict';

var Belt_SetInt = require("bs-platform/lib/js/belt_SetInt.js");

var items = Belt_SetInt.fromArray(/* array */[
      3,
      5,
      2,
      5,
      4,
      6,
      2
    ]);

var odds = Belt_SetInt.fromArray(/* int array */[
      1,
      3,
      5,
      7
    ]);

var union = Belt_SetInt.union(items, odds);

var both = Belt_SetInt.intersect(items, odds);

var diff = Belt_SetInt.diff(items, odds);

console.log("Union:", Belt_SetInt.toArray(union));

console.log("Intersection:", Belt_SetInt.toArray(both));

console.log("Difference:", Belt_SetInt.toArray(diff));

console.log("Union empty?:", Belt_SetInt.isEmpty(union));

exports.items = items;
exports.odds = odds;
exports.union = union;
exports.both = both;
exports.diff = diff;
/* items Not a pure module */
