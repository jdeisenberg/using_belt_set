type weekday =
  | M
  | T
  | W
  | Th
  | F;

type course = {
  subject: string,
  room: string,
  days: array(weekday),
};

module DayComparator =
  Belt.Id.MakeComparable(
    {
      type t = weekday;
      let cmp = Pervasives.compare;
    },
  );

let courses = [|
  {subject: "Math", room: "C101", days: [|M, W|]},
  {subject: "Art", room: "VPA203", days: [|T, Th|]},
  {subject: "Psychology", room: "A5-212", days: [|M, Th, F|]},
|];

let requested = [|T, W|];

let requestedSet = Belt.Set.fromArray(requested, ~id=(module DayComparator));

Js.log(Belt.Set.toArray(requestedSet));

module Set = Belt.Set; /* to save typing */

let rooms =
  Belt.Array.keepMap(
    courses,
    item => {
      let daySet = Set.fromArray(item.days, ~id=(module DayComparator));
      if (Set.isEmpty(Set.intersect(daySet, requestedSet))) {
        None;
      } else {
        Some(item.room);
      };
    },
  );

Js.log(rooms);
