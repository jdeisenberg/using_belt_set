type fraction = (int, int);

module FracComparator =
  Belt.Id.MakeComparable(
    {
      type t = fraction;
      let cmp = ((aNum, aDenom): fraction, (bNum, bDenom): fraction) : int => {
        compare(aNum * bDenom, bNum * aDenom);
      }
    },
  );

let s1 = Belt.Set.fromArray([| (5, 10), (3, 4), (5, 6), (6, 12) |],
  ~id=(module FracComparator));
let s2 = Belt.Set.fromArray([| (6, 8), (7, 12), (1, 3), (1, 2) |],
  ~id=(module FracComparator));
  
let both1 = Belt.Set.intersect(s1, s2);
let both2 = Belt.Set.intersect(s2, s1);

Js.log(Belt.Set.toArray(both1));
Js.log(Belt.Set.toArray(both2));
