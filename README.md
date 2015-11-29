# prime-generator package
This is a test of creating an Atom package, it provides no tools for helping people write code more convenient, I wrote this package just for fun.

![Screenshot](./resources/images/screenshot.png)

# Prime Number Definition

## Common definition
 - A **prime number** (or a **prime**) is a natural number greater than 1 that has no positive divisor other than 1 and itself, a natural number greater than 1 that is not a prime number is called a *composite number*.
 - Source: https://en.wikipedia.org/wiki/Prime_number

## Equivalent definition (which is used in this algorithm)
 - 0 and 1 are not prime numbers.
 - 2 is a prime number.
 - A prime number is a natural number greater than 1 which has no prime divisor other than itself.

# Prime Generator

## Idea of algorithm
 - Any number which is not divisible by any less prime number is a prime number
 - The only even prime number is 2, so, only check odd numbers

## Idea of program structure
 - ECMAScript 2015 provides `for...of` loop to iterate iterable object, `prime.js` provides class `PrimeGenerator`, which used to create an iterable object for primes

## Usage of `PrimeGenerator`

### Getting class
#### Installation
Open your terminal, type:
```bash
cd path/to/node_modules
npm install https://github.com/ksxnodemodules/ksxnodemodules.git
```
#### Importation in JavaScript
```javascript
var PrimeGenerator = require('ksxnodemodules').prime.PrimeGenerator;
```

### Constructor
```javascript
new PrimeGenerator(listclass, loopcondition);
```
 - Parameter `listclass` is a constructor/class which should create an iterable object, this object must have `.add(element)` method. If `listclass` was not be specified, use `Set` by default.
 - Parameter `loopcondition` is a function, which receives `n` as the only argument, and returns a boolean. If `loopcondition` was not be specified, use `() => true` by default.
  - Parameter `n`: current checking potential odd number.
  - Return value: if `false`, the iterating process will stop, `true` for otherwise.
 - Return value: an object of `PrimeGenerator`.

### Object usage
```javascript
for (let prime of primegen) {
	statements;
}
```
 - `primegen` is an object of class `PrimeGenerator`.
 - `prime` is a prime number (greater than 2).
 - `statements` is JavaScript statements.
