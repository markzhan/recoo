'use strict'

var Recoo = function(regex) {

  if (!(this instanceof Recoo)) {
    return new Recoo(regex);
  }

  if (regex instanceof Recoo) {
    this.regex = regex.regex;
  } else if (typeof regex == 'string') {
    this.regex = regex;
  } else {
    this.regex = '';
  }

  this.description = '';
  this.eval = '';

  return this;
}

module.exports = Recoo;

Recoo.prototype.desc = function(desc) {
  this.description = (typeof desc == 'string') ? desc : this.description;
  return this;
}

/**
 * Append regex -> <...>[{m,n}]
 *
 * @param {Mixed}
 * @param {Mixed}
 * @param {Number}
 * @return {Recoo}
 * @api public
 */

Recoo.prototype.a = function(re, m, n) {
  if (re instanceof Recoo) {
    this.regex += re.regex;
  } else if (typeof re == 'string') {
    this.regex += re;
  }
  this.n(m, n);
  return this;
}

/**
 * -> ...<|...>[{m,n}]
 */

Recoo.prototype.or = function(re, m, n) {
  if (re instanceof Recoo) {
    this.regex += '|' + re.regex;
  } else if (typeof re == 'string' && re != '') {
    this.regex += '|' + re;
  } else {
    this.regex += '|';
  }
  this.n(m, n);
  return this;
}

/**
 * Regex module -> <[...]>[{m,n}]
 */

Recoo.prototype.m = function(re, m, n) {
  if (re instanceof Recoo) {
    this.regex += '[' + re.regex + ']';
  } else if (typeof re == 'string' && re !== '') {
    this.regex += '[' + re + ']';
  } else {
    this.regex = '[' + this.regex + ']';
  }
  this.n(m, n);
  return this;
}

/**
 * A part of regex -> <(...)>[{m,n}]
 */

Recoo.prototype.p = function(re, m, n) {
  if (re instanceof Recoo) {
    this.regex += '(?:' + re.regex + ')';
  } else if (typeof re == 'string' && re !== '') {
    this.regex += '(?:' + re + ')';
  } else {
    this.regex = '(?:' + this.regex + ')';
  }
  this.n(m, n);
  return this;
}

/**
 * Repeat number -> {m,n} | + | ? | *
 */

Recoo.prototype.n = function(m, n) {
  if (typeof m == 'number' && typeof n == 'number') {
    if (m >=0 && n >= m) {
      this.regex += '{' + m + ',' + n + '}';
    }
  } else if (typeof m == 'number' && typeof n == 'undefined') {
    if (m >= 0) this.regex += '{' + m + '}';
  } else if (typeof m == 'string' && typeof n == 'undefined') {
    //if (m.match(/^[*+?]?$/)) this.regex += m;
    this.regex += m;
  }
  return this;
}

Recoo.prototype.e = function(str) {
  this.eval = (typeof str == 'string') ? str : this.eval;
  return this;
}

/**
 * -> (?:^...$)
 */

Recoo.prototype.exact = function() {
  this.regex = '(?:^' + this.regex + '$)';
  //this.regex = '^' + this.regex + '$';
  return this;
}

Recoo.prototype.go = function(opts) {
  if (typeof opts == 'string') {
    this.regex = new RegExp(this.regex, opts);
  } else {
    this.regex = new RegExp(this.regex);
  }
  return this;
}

Recoo.prototype.is = function(str) {
  str = typeof str == 'string' ? str : this.eval;
  return new RegExp('(?:^' + this.regex + '$)').test(str);
  //return this.exact().go().regex.test(str);
}

Recoo.prototype.contain = function(str) {
  str = typeof str == 'string' ? str : this.eval;
  return new RegExp(this.regex).test(str);
  //return this.go().regex.test(str);
}

Recoo.prototype.match = function(str) {
  str = typeof str == 'string' ? str : this.eval;
  return (str).match(new RegExp(this.regex, 'g'));
  //return str.match(this.go('g').regex);
}
