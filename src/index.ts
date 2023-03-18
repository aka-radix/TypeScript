console.log("Hello World!");

let a = 1 + 2;
let b = a + 3;
let c = {
	apple: a,
	banana: b,
};
let d = c.apple * 4;

function squreOf(n: number) {
    return n * n;
}
squreOf(2);
// squreOf("2");

let x: any = 4;
let y: any = ["danger"]
let z = x + y;

let e: unknown = 30
let f = e === 123
// let g = e + 10
let r: true = true // type literal (represents a signle value and nothing else)
// let g: 26.218 = 10
const q = 456 // type 456 (a specific number)
const u = Infinity
let ak: number = NaN
let million: number = 1_000_000
// let big: bigint = 1234n    // < 2^53
let str: string = "hello"
let abc: "abc" = "abc"
// let val: "str" = "abc"
let sym = Symbol("a")
let s: symbol = Symbol("a")
let eq = sym === s
console.log(eq)
const t: unique symbol = Symbol("t")

let obj: object = {
    bb: 'x'
}
// can not obj.b

let bb = {
    cc: {
        dd: "d"
    }
}
let aa: {bb: number} = {
    bb: 12
}
let name: {
    firstName: string,
    lastName: string
} = {
    firstName: "John",
    lastName: "Doe"
}
class Person {
    constructor(
        public firstName: string,
        public lastName: string
    ) {}
}
name = new Person("Jane", "Doe") // ok

let ab: {
    b: number,
    c?: string, // optional, might be undefined cuz ts is strict about object attributes
    [key: number]: boolean // means that ab might have any number of numeric properties that are booleans e.g. ab = {b: 1, 10: true, 20: false}
    //  [key: T]: U => index signature, index signature key's type must be assignale to either a number or string
}
let user: {
    readonly firstname: string // can not be modified later
} = {
    firstname: "John"
}
type age = number
type Human = {
    name: string,
    age: age
}
let driver: Human = {
    name: "John",
    age: 20
}
type Cat = {name: string, purrs: boolean}
type Dog = {name: string, barks: boolean, wags: boolean}
type CatOrDogOrBoth = Cat | Dog // union
type CatAndDog = Cat & Dog // intersection

let Perro: CatAndDog = {
    name: "Perro",
    purrs: true,
    barks: true,
    wags: true
}
let Gata: CatOrDogOrBoth = {
    name: "Perro",
    barks: true,
    wags: true
}
let numArr = [1, 2, 3] // number[]
let strArr: string[] = ['a']
let ddd = [1, "a"] // (string | number)[]
// numArr.push("a")
let h: number[] = []
let g = [] // any[]
g.push(1) // number[]
g.push("red") // (string | number)[]
function buildArray() {
    let v = []
    v.push(1)
    v.push("v")
    return v
}
let myArray = buildArray()
// myArray.push(true) // array left the scope it was defined in, this will cause an error

let au: [number] = [1] // tuple
let bu: [string, string, number] = ["a", "b", 1]
let trainFares: [number, number?][] = [[3.75], [8.25, 7.70], [10.50]] // the second one is optional
// equivalent to
let moreTrainFares: ([number] | [number, number])[] = [[3.75], [8.25, 7.70], [10.50]]
let friends: [string, ...string[]] = ["Sara", "Tali", "Chloe", "Claire"] // rest parameter
let as: readonly number[] = [1, 2, 3] // readonly array can not push or pop or update

type A = readonly string[]
type B = ReadonlyArray<string>
type C = Readonly<string[]>
type D = readonly [number, string]
type E = Readonly<[number, string]>
// which to use? is a matter of preference

function af(yzx: number) {
    return yzx
}

enum Language {
    English,
    Spanish,
    Russian
}
enum Language {
    English = 0,
    Spanish = 1,
    Russian = 2
}
