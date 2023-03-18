// any
// any kind of renders the typecheker useless, so avoid this
// you have to be explicit about the type, otherwise Ts will throw an compile-time exception
// if it infers that by itself
let a: any = 666; // any
let b: any = ["danger"]; // any
let c = a + b; // any


// unknown
// for values whose types you do not know ahead of time, reach for unknown instead of any
// can use (!, ==, ===, ||, &&, and ?) with unknown
// you have to be explicit about it
let ua: unknown = 30; // unknown
let ub = a === 123; // boolean
// let uc = a + 10 // error


// boolean
let ba = true;
const bc = true; // let ts infer that the value is a spcific boolean (type literasl)
let bd: boolean = false; // explicit
let be: true = true; // (rare) tell ts explicitly that the value is a specific boolen
// by using a value as a type, you limit the possible values for be from all booleans to one specific one (type literals)
// let bf: true = false // error -> can not assign type false to type true


// number
// including integers, floats, positives, negatives, Infinity, NaN ...
let na = 1234; // number
let nb = Infinity * 0.3; // number
const nc = 5678; // 5678 (type literal)
let nd: number = 90; // number
let ne: 26.1 = 26.1; // 26.1 (type literal)
// let g: 26.1 = 10 // error -> type 10 is not assignable to type 26.1
let oneMillion = 1_000_000; // can use nemeric separators in both type and value


// bigint
// > 2^53 -> not available before ES20202
// let biga = 1234n
// const bigb = 5678n
// let bige = 88.5n // error -> bigint literal mus be an integer
// let bigg: 100n = 100n
// let bigh: bigint = 100 // error -> can not assign int to bigint


// string
let sa = "hello";
const sb = "ak47"; // ak47
let sc: string = "string";
let sd: "john" = "john";
// let sg: "john" = "zoe" // error -> can not assign type "zoe" to type "john"


// symbol
// usually used as an alternative to string keys in objects and maps, when you want to be extra
// sure that people are using the right well-known key and did not accedently set the key
let syma = Symbol("a");
let symb: symbol = Symbol("b");
// let d = a + 'x' // error -> can not be applied on type symbol
// symbols with given names are unique and will not be equal to any other symbol even if it
// had the same exact name
// symbols are inferred to be of type symbol, but can be explicitly typed as unique symbol
const symf: unique symbol = Symbol("f");
const syme = Symbol("e"); // unique symbol
// let symg: unique symbol = Symbol('f') // error -> must be a const


// object
// object types in ts specify the shapes of objects.
// they can not tell the difference between using an object literal and using new Object()
// using object
let obja: object = {
	b: "x",
};
// obja.b // error -> property b does not exist on type object
// because object just tells you that the value is a javascript object, but does not tell you about
// the values it describes, bit narrow
// ts can infer the type on its own like so:
let objb = {
	c: {
		d: "f",
	},
}; // {c: {d: string}}
// explicitly
let objc: { b: number } = {
	b: 12,
}; // {b: number}
let objd: {
	firstName: string;
	lastName: string;
} = {
	firstName: "john",
	lastName: "barrowman",
};
class Person {
    constructor(
        public firstName: string,
        public lastName: string
    ) {}
}
objd = new Person("John", "Doe") // ok -> class and literal both satify the shape
let obje: {b: number}
// obje = {} // error -> missing property b
// obje = {
//     b: 12,
//     c: 1

// } // error -> c does not exist in the type we defined
let objf: {
    b: number
    c?: string // optional, can be a string, or undefined
    [key: number]: boolean // might have any number of numeric properties that are booleans
}
objf = {b: 1, 10: true, 20: false}
objf = {b: 1, c: undefined}
// objf = {10: true} // error -> property b is missing
// [key: T]: U is called index signature. Tells ts that the object might contains more keys
// keys of type T must only be assigned to either number or string
// index signature key's name does not have to be key
let objg: {
    [someting: string]: string
} = {
    "abd": "efg"
}
let user: {
    readonly firstName: string // can mark a field as readonly (its value can not be modified)
} = {
    firstName: "John"
}
let danger = {} // avoid, configure the linter to warn you


// type aliases, unions and intersections
// you can also perform operations on types
// declare a type alias that points to a type
type Age = number
type PersonType = {
    name: string
    age: Age
}
let driver: PersonType = {
    name: "John",
    age: 20
}
// you can not declare a type twice
// types aliases are block-scoped

// union and intersection types
type Cat = {name: string, purrs: boolean}
type Dog = {name: string, barks: boolean, wags: boolean}
type CatOrDogOrBoth = Cat | Dog // union using |
type CatAndDog = Cat & Dog // intersection using &
let animal: CatOrDogOrBoth = {
    name: "john",
    barks: true,
    wags: true
}
let anotherAnimal: CatAndDog = {
    name: "Mesa",
    purrs: true,
    barks: true,
    wags: true
}
type Returns = string | null


// Arrays
let arra = [1,2,3] // number[]
let arrb: ["a", "b"] // string[]
let arrc: string[] = ["a", "b"] // string[]
let arrd = [1, "b"] // (string | number)[]
const arre = [2, "b"] // (string | number)[]
// just like objects, using const with arrays wont hint to ts to infer their types more narrowly
let arrf = ["red"]
arrf.push("blue") // ok
// arrf.push(true) // error -> can not push boolean to string[]
let arrg = [] // any[]
// in this particular case, once the array leaves the scopr it was defined in, ts will assin it
// a final type (like within a function) and can not be expanded anymore
arrg.push(1) // ok
arrg.push("a") // (string | number)[]
let arrh: number[] = [] // number[]
arrh.push(1)
// arrh.push("red") // error
// we can use two syntaxes for arrays: T[] and Array<T>, it is just a matter of preference
// try to keep arrays homogeneous


// Tuples
// subtypes of array. considered arrays of fixed lengths, and each value at each index has a
// specific known type
// tuples have to be explicitly typed when you declare them
let tupa: [number] = [1]
let tupb: [string, string, number] = ["a", "b", 1]
// tupb = ["a", "b", 1, 2] // error -> string is not assignable to type number
let tupc: [number, number?][] = [
    [1],
    [1, 2],
    [1]
] // tuples support optional elements
// the above is equivalent to:
let _tupc: ([number] | [number, number])[] = [
    // ...
]
// tuples also support rest elements (used to type tuples with minimum lengths)
let tupd: [string, ...string[]] = ["a", "b", "c", "d"]
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c'] // heterogeneous

// readonly arrays (immutable)
let as: readonly number[] = [1, 2, 3]
// as[2] = 6 // error -> only permits reading

// the other forms you can define tuple and array types (a matter of taste)
type A = readonly string[] // readonly string[]
type B = ReadonlyArray<string> // readonly string[]
type C = Readonly<string[]> // readonly string[]

type D = readonly [number, string] // readonly [number, string]
type E = Readonly<[number, string]> // readonly [number, string]


// null, undefined, void, and never
// void is the return type of functions that do not explicitly return a value
// never is the return type of functions that never return a value (throw an error, or loop forever)
// never is the subtype of every type (bottom type)
// behavior might differ if TSC's strictNullChecks is enabled or disabled


// Enums
// can be thought of as objects where the keys are fixed at compile time
// there are two types, enums that map from strings to strings, and enums that map from strings
// to numbers
// by convention, enum keys are all uppercase and singular
enum Language {
    English,
    Spanish,
    Russian
}
// ts will automatically infer a number as the value for each member of your enum, but you
// can also set values explicitly
enum Job {
    WebDev = 1,
    WebDesigner = 2,
    PM = 3
}
// you can use dot or bracket notation to access enum members
// you can split your enums across multiple declarations, and ts will automatically merge them
// for us into a single enum
enum Color {
    Red = 1,
    Green = 2,
}
enum Color {
    Blue = 3
}
// with strings
enum _Color {
    Red = '#c10000',
    Blue = '#007ac1',
    Pink = 0xc10050,
    White = 255
}
// can access enums both by value and by key
// A const enum doesn’t let you do reverse lookups, and so behaves a lot like a regular
// JavaScript object.
const enum Lang {
    English,
    Spanish,
    Russian
}
// let c = Lang[0] // error -> cannot perform reverse lookups on const enums
