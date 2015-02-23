'use strict'

var Recoo = function(regex) {

  if (!(this instanceof Recoo)) {
    return new Recoo(regex);
  }

  this.regex = '';
  this.opts = '';
  this.eval = '';
  this.description = '';

  if (regex instanceof Recoo) {
    this.regex = regex.regex;
  } else if (typeof regex == 'string') {
    this.regex = regex;
  }

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
    //this.regex = '(' + this.regex + ')';
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
  if (typeof str == 'string') {
    this.eval = str;
    return this;
  } else {
    return new RegExp(this.regex, this.opts);
  }
}

Recoo.prototype.go = function(opts) {
  if (typeof opts == 'string') {
    this.regex = new RegExp(this.regex, opts);
  } else {
    this.regex = new RegExp(this.regex, this.opts);
  }
  return this;
}

Recoo.prototype.opt = function(opts) {
  if (/^[img]+$/i.test(opts)) {
    this.opts = opts || '';
  } else {
    this.opts = opts || '';
  }
  return this;
}

Recoo.prototype.exact = function() {
  this.regex = '(?:^' + this.regex + '$)';
  return this;
}

Recoo.prototype.is = function(str) {
  str = typeof str == 'string' ? str : this.eval;
  return new RegExp('(?:^' + this.regex + '$)', this.opts).test(str);
}

Recoo.prototype.contain = function(str) {
  str = typeof str == 'string' ? str : this.eval;
  return new RegExp(this.regex, this.opts + 'g').test(str);
}

Recoo.prototype.match = function(str) {
  str = typeof str == 'string' ? str : this.eval;
  return (str).match(new RegExp(this.regex, this.opts + 'g'));
}
