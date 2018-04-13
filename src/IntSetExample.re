let items = Belt.Set.Int.fromArray([|3, 5, 2, 5, 4, 6, 2|]);
let odds = Belt.Set.Int.fromArray([|1, 3, 5, 7|]);
let union = Belt.Set.Int.union(items, odds);
let both = Belt.Set.Int.intersect(items, odds);
let diff = Belt.Set.Int.diff(items, odds);

Js.log2("Union:", Belt.Set.Int.toArray(union));
Js.log2("Intersection:", Belt.Set.Int.toArray(both));
Js.log2("Difference:", Belt.Set.Int.toArray(diff));
Js.log2("Union empty?:", Belt.Set.Int.isEmpty(union));
