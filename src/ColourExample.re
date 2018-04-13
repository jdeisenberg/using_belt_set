type colour = 
  | Red
  | Green
  | Blue
  | White
  | Black
  | Hex (int, int, int)
  | Named (string);

Js.log(compare(Red, Blue));
Js.log(compare(White, Hex(255, 0, 0)));
Js.log(compare(Hex(15, 20, 45), Hex(15, 20, 30)));
Js.log(compare(Hex(15, 20, 45), Hex(10, 20, 45)));
Js.log(compare(Named("aqua"), Hex(128, 0, 255)));
Js.log(compare(Named("peach"), Named("beige")));

module ColourComparator =
  Belt.Id.MakeComparable(
    {
      type t = colour;
      let cmp = compare;
    },
  );

module Set = Belt.Set;

let cset1 = Set.fromArray([|White, Red, Hex(255, 255, 0), Named("lime")|],
  ~id = (module ColourComparator));
let cset2 = Set.fromArray([|Green, Red, Hex(0, 128,0)|],
  ~id = (module ColourComparator));
let cset3 = Set.add(cset2, Named("lime"));
Js.log(Set.toArray(Set.intersect(cset1, cset3)));
Js.log(Set.diff(cset1, cset3) |> Set.toArray); /* easier notation */
