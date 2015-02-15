[![Build Status](https://api.travis-ci.org/markzhan/recoo.svg?branch=master)](https://travis-ci.org/markzhan/recoo)
[![Coverage Status](https://coveralls.io/repos/markzhan/recoo/badge.svg)](https://coveralls.io/r/markzhan/recoo)
[![NPM Downloads](https://img.shields.io/npm/dm/recoo.svg?style=flat)](https://www.npmjs.org/package/recoo)


# recoo

Regex Chain & Helper - A new method for regular expressions.


## Installation

```sh
npm i recoo --save
```

## Usage

```js
var r = require('recoo');

var ipv4 = r()
.a('25[0-5]')
.or('2[0-4][0-9]')
.or('1[0-9][0-9]')
.or('[1-9][0-9]')
.or('[0-9]')
.p()

ipv4 = ipv4.a(r('\\.').a(ipv4).p(0,3));

console.log(ipv4.regex);  // (?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}
console.log(ipv4.is('192.168.1.1')); // true
console.log(ipv4.contain('192.168.1.a 192.168.1.1'));  // true
console.log(ipv4.match('192.168.1.a 192.68.1.1-8.8.8.8.'));  // [ '192.68.1.1', '8.8.8.8' ]
console.log(ipv4.e().test('192.168.1.1'));  // true
```
## API

#### .a(re, [m, n]) - `<...>[{m,n}]`

* @param{ Mixed } regex string or recoo object
* @param{ Mixed } {m,n} <- m, m >= 0 OR ? + * {...} {...}?
* @param{ Number } {m,n} <- n, n >= m
```js
var r = require('recoo');
console.log(r().a('\\d').regex); // \d
console.log(r().a('\\d').is('8')); // true
console.log(r().a(r('\\d')).is('8')); // true
```

#### .or([re, [m, n]]) - `<|...>[{m,n}]`

* @param{ Mixed } regex string or recoo object
* @param{ Mixed } {m,n} <- m, m >= 0 OR ? + * {...} {...}?
* @param{ Number } {m,n} <- n, n >= m
```js
var r = require('recoo');
console.log(r('hello').or('world').regex); // hello|world
console.log(r('hello').or('world').match('hello')); // [ 'hello' ]
console.log(r('hello').or('world').match('world')); // [ 'world' ]
```

#### .m([re, [m, n]]) - `<[...]>[{m,n}]`

* @param{ Mixed } regex string or recoo object
* @param{ Mixed } {m,n} <- m, m >= 0 OR ? + * {...} {...}?
* @param{ Number } {m,n} <- n, n >= m
```js
var r = require('recoo');
console.log(r().m('0-7').regex); // [0-7]
console.log(r().m('0-7').is('8')); // false
console.log(r().m(r('0-9')).is('8')); // true
```

#### .p([re, [m, n]]) - `<(...)>[{m,n}]`

* @param{ Mixed } regex string or recoo object
* @param{ Mixed } {m,n} <- m, m >= 0 OR ? + * {...} {...}?
* @param{ Number } {m,n} <- n, n >= m
```js
var r = require('recoo');
console.log(r().p('abc').regex); // (?:abc)
console.log(r().p('abc').contain('123')); // false
console.log(r().p(r('abc')).contain('abc123')); // true
```

#### .n(m, n) - `{m,n}`

* @param{ Mixed } {m,n} <- m, m >= 0 OR string : ? + * {...} {...}?
* @param{ Number } {m,n} <- n, n >= m
```js
var r = require('recoo');
console.log(r('\\d').n('+').regex); // \d+
console.log(r('\\d').n(3,3).regex); // \d{3,3}
console.log(r('\\d').n('+').match('99')); // [ '99' ]
console.log(r('\\d').n(3,3).match('99.999')); // [ '999' ]
```

#### .exact()
```js
var r = require('recoo');
console.log(r('\\d').regex); // \d
console.log(r('\\d').contain('8.8')); // true
console.log(r('\\d').exact().contain('8.8')); // false
```

#### .go([opts])
```js
var r = require('recoo');
console.log(r('\\d').regex); // String: \d
console.log(r('\\d').go().regex); // Regexp: /\d/
console.log(r('\\d').go('ig').regex); // Regexp: /\d/gi
```

#### .e([str])

* @param { Mixed }

```js
var r = require('recoo');
console.log(r('\\w').e());  // /\w/
console.log(r('\\w').e('ig'));  // /\w/gi
console.log(r('\\w').e('abc').is()); // false
console.log(r('\\w').e('abc').contain()); // true
console.log(r('abc').e('abc').match()); // [ 'abc' ]
console.log(r('\\d').e('abc').match()); // null
console.log(r('\\d').e().test('8'));  // true
```

#### .is([str])

* same as previous

#### .contain([str])

* same as previous

#### .match([str])

* same as previous

#### .desc(str)
```js
var r = require('recoo');
console.log(r().desc('API test').description); // 'API test'
```


## License

Copyright © 2015 [Mark Zhan](http://markzhan.com).

This project is available under the Apache license. See [LICENSE](https://github.com/markzhan/recoo/blob/master/LICENSE) for details.
