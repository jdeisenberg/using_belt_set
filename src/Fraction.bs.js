// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE
'use strict';

var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");

function cmp(param, param$1) {
  return Caml_primitive.caml_int_compare(Caml_int32.imul(param[0], param$1[1]), Caml_int32.imul(param$1[0], param[1]));
}

var FracComparator = Belt_Id.MakeComparable(/* module */[/* cmp */cmp]);

var s1 = Belt_Set.fromArray(/* array */[
      /* tuple */[
        5,
        10
      ],
      /* tuple */[
        3,
        4
      ],
      /* tuple */[
        5,
        6
      ],
      /* tuple */[
        6,
        12
      ]
    ], FracComparator);

var s2 = Belt_Set.fromArray(/* array */[
      /* tuple */[
        6,
        8
      ],
      /* tuple */[
        7,
        12
      ],
      /* tuple */[
        1,
        3
      ],
      /* tuple */[
        1,
        2
      ]
    ], FracComparator);

var both1 = Belt_Set.intersect(s1, s2);

var both2 = Belt_Set.intersect(s2, s1);

console.log(Belt_Set.toArray(both1));

console.log(Belt_Set.toArray(both2));

exports.FracComparator = FracComparator;
exports.s1 = s1;
exports.s2 = s2;
exports.both1 = both1;
exports.both2 = both2;
/* FracComparator Not a pure module */
