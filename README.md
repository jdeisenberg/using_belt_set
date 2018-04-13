# Using `Belt.Set` with Variant Data Types

Consider a data type that gives the work days of the week, used in a data type that specifies a
course in a school:

```reason;shared(Days)
type weekday =
  | M
  | T
  | W
  | Th
  | F;
  
type course = {
  subject: string,
  room: string,
  days: array(weekday)
};
let courses = [|
  {subject: "Math", room: "C101", days: [| M, W |]},
  {subject: "Art", room: "VPA203", days: [| T, Th |]},
  {subject: "Psychology", room: "A5-212", days: [|M, Th, F |]},
|];

let requested = [|T, W|];
module DayComparator =
  Belt.Id.MakeComparable(
    {
      type t = weekday;
      let cmp = compare;
    },
  );
```

```reason;no-run
type weekday =
  | M
  | T
  | W
  | Th
  | F;
  
  
type course = {
  subject: string,
  room: string,
  days: array(weekday)
};
```
Given an array of courses and a set of requested days...

```reason;use(Days);no-run
let courses = [|
  {subject: "Math", room: "C101", days: [| M, W |]},
  {subject: "Art", room: "VPA203", days: [| T, Th |]},
  {subject: "Psychology", room: "A5-212", days: [|M, Th, F |]},
|];

let requested = [|T, W|];
```

...you might want to write code that will find rooms that are in use on any of the requested days. This is a perfect case
for using *set*s. If the intersection of a course’s `days` and the `requested` days is not empty, then
the course’s `room` is occupied.

## Sets in ReasonML

The new `Belt` library has a `Belt.Set` module, which implements sorted, immutable sets. That is, the items in the set are stored in sorted order, and all set functions create a new set; the original is never changed (immutable).

For integers, strings, and dictionaries, `Belt` provides specialized modules: `Belt.SetInt`, `Belt.SetString`, and `Belt.SetDict`. Here is an example of using `Belt.SetInt`.

```reason
let items = Belt.Set.Int.fromArray([|3, 5, 2, 5, 4, 6, 2|]);
let odds = Belt.Set.Int.fromArray([|1, 3, 5, 7|]);
let union = Belt.Set.Int.union(items, odds);
let both = Belt.Set.Int.intersect(items, odds);
let diff = Belt.Set.Int.diff(items, odds);

Js.log2("Union:", Belt.Set.Int.toArray(union));
Js.log2("Intersection:", Belt.Set.Int.toArray(both));
Js.log2("Difference:", Belt.Set.Int.toArray(diff));
Js.log2("Union empty?:", Belt.Set.Int.isEmpty(union));
```
You almost never need to know the internal form of a set; as in the preceding example you will usually build a set `fromArray` and convert it back `toArray` when you finish set operations.

## Customized Sets

In the example of the courses, you need sets of `weekday`, which aren’t integers, strings, or dictionaries. In order to create these sets, you have to tell the main `Belt.Set` module how to compare days of the week. The first question is: can you even compare variant data types? Yes, you can, with ReasonML’s `compare` function. This function takes two arguments and returns `-1` if the first argument is less than the second, `0` if the arguments are equal, and `1` if the first argument is greater than the second:

```reason;use(Days)
Js.log(compare(3, 5));
Js.log(compare(3, 3));
Js.log(compare(5, 3));

Js.log(compare(M, W));
Js.log(compare(W, W));
Js.log(compare(F, W));
```
To tell `Belt.Set` how to compare a custom type, you create a module that includes a call to `Belt.Id.MakeComparable` that specifies:

* The data type `t` being compared
* A function `cmp` that does a comparison, returning `-1`, `0`, or `1` for less than, equal, or greater than.

Here is the code for comparing days of the week:

```txt
module DayComparator =
  Belt.Id.MakeComparable(
    {
      type t = weekday;
      let cmp = compare;
    },
  );
```

When creating a set of `weekday`s from an array, you need to specify the comparator to use:

```reason;use(Days)
let requestedSet =
  Belt.Set.fromArray(requested, ~id=(module DayComparator));
Js.log(Belt.Set.toArray(requestedSet));
```

(The output from the preceding example shows the numeric values assigned to the variants; ReasonML uses the names during compile time, not during run time.)

That now lets you write the following code to do the task of finding the empty rooms.

```reason;use(Days)
module Set = Belt.Set; /* an alias to save typing */
let requestedSet =
  Set.fromArray(requested, ~id=(module DayComparator));

let rooms = Belt.Array.keepMap(courses, item => {
  let daySet = Set.fromArray(item.days, ~id=(module DayComparator));
  if (Set.isEmpty(Set.intersect(daySet, requestedSet))) {
    None;
  } else {
    Some(item.room);
  }
});
Js.log(rooms);
```

A quick explanation of `Belt.Array.keepMap` is in order here. This function takes two arguments:

* The name of the array to be traversed
* A function that takes an item and returns `Some value` if the `value` is to be retained in the result, or `None` if the item is to be skipped.

`Belt.Array.keepMap` then applies the function to each item in the array, returning a new array consisting only of retained items.

### Challenge 1

The code you have seen here is a good example of an example. In a real school, a room might be used for several different courses. If you had added this entry to the `courses` array:

```reason;use(Days);no-run
{subject: "Video Editing", room: "VPA203", days: [| M, T |]}
```

then `VPA203` would show up twice in the list of occupied rooms. You might want to write a different version of the code that uses a set of `string` to make sure the occupied room list doesn’t have duplicates.

### Challenge 2

Given a type that represents a fraction as a pair of integers,
write a comparator named `FracComparator` that lets you construct sets of fractions.
Your comparator should make sure that equivalent fractions like `(3, 4)` and `(9, 12)` are treated the same. This
challenge’s data type does not use variants, but if you write a comparator properly, it will work great.

Hint: to compare fractions *a*/*b* and *c*/*d*, compare *a* × *d* to *c* × *b*. For example, to compare 5/7 to 3/8, you would compare 5 × 8 to 3 × 7. Since 40 is greater than 20, that means 5/7 is greater than 3/8.


```reason;no-run
type fraction = (int, int);
let s1 = Belt.Set.fromArray([| (5, 10), (3, 4), (5, 6), (6, 12) |],
  ~id=(module FracComparator));
let s2 = Belt.Set.fromArray([| (6, 8), (7, 12), (1, 3), (1, 2) |],
  ~id=(module FracComparator));
  
let both1 = Belt.Set.intersect(s1, s2);
let both2 = Belt.Set.intersect(s2, s1);

Js.log(Belt.Set.toArray(both1));
Js.log(Belt.Set.toArray(both2));
```

## Variants With Constructors

That’s great for simple variants, but what about a data type like this:

```reason;shared(Colour)
type colour = 
  | Red
  | Green
  | Blue
  | White
  | Black
  | Hex (int, int, int)
  | Named (string);
```
```reason;no-run
type colour = 
  | Red
  | Green
  | Blue
  | White
  | Black
  | Hex (int, int, int)
  | Named (string);
```
Can you make a `Belt.Set` of `colour`? Yes, you can. (Do you think I would be writing all of this just to tell you
that it can’t be done?) And, in fact, you don’t have to go to much extra effort, because it turns out that the
built-in `compare` function works like magic on these variants as well:

```reason;use(Colour)
Js.log(compare(Red, Blue));
Js.log(compare(White, Hex(255, 0, 0)));
Js.log(compare(Hex(15, 20, 45), Hex(15, 20, 30)));
Js.log(compare(Hex(15, 20, 45), Hex(10, 20, 45)));
Js.log(compare(Named("aqua"), Hex(128, 0, 255)));
Js.log(compare(Named("beige"), Named("peach")));
```

So, the comparator function for a set of `colour` can use the built-in `compare` and achieve acceptable results:

```reason;use(Colour)
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
```

## Conclusion

You can use your own variant data types in sets by:

* Creating a comparison function that returns -1, 0, and 1 for your criteria of less than, equal, and greater than.
* Use that comparison in a comparator `module`
* Specify that comparator when creating a `Belt.Set`
