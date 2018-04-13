// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");

console.log(Caml_obj.caml_compare(/* Red */0, /* Blue */2));

console.log(Caml_obj.caml_compare(/* White */3, /* Hex */Block.__(0, [
            255,
            0,
            0
          ])));

console.log(Caml_obj.caml_compare(/* Hex */Block.__(0, [
            15,
            20,
            45
          ]), /* Hex */Block.__(0, [
            15,
            20,
            30
          ])));

console.log(Caml_obj.caml_compare(/* Hex */Block.__(0, [
            15,
            20,
            45
          ]), /* Hex */Block.__(0, [
            10,
            20,
            45
          ])));

console.log(Caml_obj.caml_compare(/* Named */Block.__(1, ["aqua"]), /* Hex */Block.__(0, [
            128,
            0,
            255
          ])));

console.log(Caml_obj.caml_compare(/* Named */Block.__(1, ["peach"]), /* Named */Block.__(1, ["beige"])));

var cmp = Caml_obj.caml_compare;

var ColourComparator = Belt_Id.MakeComparable(/* module */[/* cmp */cmp]);

var cset1 = Belt_Set.fromArray(/* array */[
      /* White */3,
      /* Red */0,
      /* Hex */Block.__(0, [
          255,
          255,
          0
        ]),
      /* Named */Block.__(1, ["lime"])
    ], ColourComparator);

var cset2 = Belt_Set.fromArray(/* array */[
      /* Green */1,
      /* Red */0,
      /* Hex */Block.__(0, [
          0,
          128,
          0
        ])
    ], ColourComparator);

var cset3 = Belt_Set.add(cset2, /* Named */Block.__(1, ["lime"]));

console.log(Belt_Set.toArray(Belt_Set.intersect(cset1, cset3)));

console.log(Belt_Set.toArray(Belt_Set.diff(cset1, cset3)));

var $$Set = 0;

exports.ColourComparator = ColourComparator;
exports.$$Set = $$Set;
exports.cset1 = cset1;
exports.cset2 = cset2;
exports.cset3 = cset3;
/*  Not a pure module */
