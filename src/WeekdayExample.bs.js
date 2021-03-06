// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE
'use strict';

var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

var cmp = Caml_obj.caml_compare;

var DayComparator = Belt_Id.MakeComparable(/* module */[/* cmp */cmp]);

var courses = /* array */[
  /* record */[
    /* subject */"Math",
    /* room */"C101",
    /* days : int array */[
      /* M */0,
      /* W */2
    ]
  ],
  /* record */[
    /* subject */"Art",
    /* room */"VPA203",
    /* days : int array */[
      /* T */1,
      /* Th */3
    ]
  ],
  /* record */[
    /* subject */"Psychology",
    /* room */"A5-212",
    /* days : int array */[
      /* M */0,
      /* Th */3,
      /* F */4
    ]
  ]
];

var requested = /* int array */[
  /* T */1,
  /* W */2
];

var requestedSet = Belt_Set.fromArray(requested, DayComparator);

console.log(Belt_Set.toArray(requestedSet));

var rooms = Belt_Array.keepMap(courses, (function (item) {
        var daySet = Belt_Set.fromArray(item[/* days */2], DayComparator);
        if (Belt_Set.isEmpty(Belt_Set.intersect(daySet, requestedSet))) {
          return /* None */0;
        } else {
          return /* Some */[item[/* room */1]];
        }
      }));

console.log(rooms);

var $$Set = 0;

exports.DayComparator = DayComparator;
exports.courses = courses;
exports.requested = requested;
exports.requestedSet = requestedSet;
exports.$$Set = $$Set;
exports.rooms = rooms;
/* DayComparator Not a pure module */
