'use strict'
var r = require('./');
var chai = require('chai'), assert = chai.assert;


describe('recoo', function() {

  it('new()', function() {
    assert.equal(new r().regex, '');
    assert.equal(new r({}).regex, '');
    assert.equal(new r(123).regex, '');
    assert.equal(new r('123').regex, '123');
    assert.equal(new r(r('abc')).regex, 'abc');
  });
  it('a()', function() {
    assert.equal(r().a().regex, '');
    assert.equal(r().a(0).regex, '');
    assert.equal(r().a('').regex, '');
    assert.equal(r().a(-1).regex, '');
    assert.equal(r().a(123).regex, '');
    assert.equal(r().a('abc').regex, 'abc');
    assert.equal(r().a(r(0)).regex, '');
    assert.equal(r().a(r('1')).regex, '1');
    assert.equal(r().a(r(r(-1))).regex, '');
    assert.equal(r().a('abc',0).regex, 'abc{0}');
    assert.equal(r().a('abc',1).regex, 'abc{1}');
    assert.equal(r().a('abc',0,0).regex, 'abc{0,0}');
    assert.equal(r().a('abc',0,1).regex, 'abc{0,1}');
    assert.equal(r().a('abc',1,0).regex, 'abc');
    assert.equal(r().a('abc',1,1).regex, 'abc{1,1}');
    assert.equal(r().a('abc',-1,-1).regex, 'abc');
    assert.equal(r().a('abc',-1).regex, 'abc');
    assert.equal(r().a('abc','').regex, 'abc');
    assert.equal(r().a('abc','*').regex, 'abc*');
    assert.equal(r().a('abc','*+?').regex, 'abc*+?');
    assert.equal(r().a('abc','{0,1}?').regex, 'abc{0,1}?');
  });
  it('or()', function() {
    assert.equal(r().or().regex, '|');
    assert.equal(r().or('').regex, '|');
    assert.equal(r().or(0).regex, '|');
    assert.equal(r().or(1).regex, '|');
    assert.equal(r().or(-1).regex, '|');
    assert.equal(r().or('123').regex, '|123');
    assert.equal(r().or('abc').regex, '|abc');
    assert.equal(r().or(r(0)).regex, '|');
    assert.equal(r().or(r('1')).regex, '|1');
    assert.equal(r().or(r(r(-1))).regex, '|');
    assert.equal(r().or('abc',0).regex, '|abc{0}');
    assert.equal(r().or('abc',1).regex, '|abc{1}');
    assert.equal(r().or('abc',0,0).regex, '|abc{0,0}');
    assert.equal(r().or('abc',0,1).regex, '|abc{0,1}');
    assert.equal(r().or('abc',1,0).regex, '|abc');
    assert.equal(r().or('abc',1,1).regex, '|abc{1,1}');
    assert.equal(r().or('abc',-1,-1).regex, '|abc');
    assert.equal(r().or('abc',-1).regex, '|abc');
    assert.equal(r().or('abc','').regex, '|abc');
    assert.equal(r().or('abc','*').regex, '|abc*');
    assert.equal(r().or('abc','*+?').regex, '|abc*+?');
    assert.equal(r().or('abc','{0,1}?').regex, '|abc{0,1}?');
  });
  it('m()', function() {
    assert.equal(r().m().regex, '[]');
    assert.equal(r().m('').regex, '[]');
    assert.equal(r().m(0).regex, '[]');
    assert.equal(r().m(1).regex, '[]');
    assert.equal(r().m(-1).regex, '[]');
    assert.equal(r().m('123').regex, '[123]');
    assert.equal(r().m('abc').regex, '[abc]');
    assert.equal(r().m(r(0)).regex, '[]');
    assert.equal(r().m(r('1')).regex, '[1]');
    assert.equal(r().m(r(r(-1))).regex, '[]');
    assert.equal(r().m('abc',0).regex, '[abc]{0}');
    assert.equal(r().m('abc',1).regex, '[abc]{1}');
    assert.equal(r().m('abc',0,0).regex, '[abc]{0,0}');
    assert.equal(r().m('abc',0,1).regex, '[abc]{0,1}');
    assert.equal(r().m('abc',1,0).regex, '[abc]');
    assert.equal(r().m('abc',1,1).regex, '[abc]{1,1}');
    assert.equal(r().m('abc',-1,-1).regex, '[abc]');
    assert.equal(r().m('abc',-1).regex, '[abc]');
    assert.equal(r().m('abc','').regex, '[abc]');
    assert.equal(r().m('abc','*').regex, '[abc]*');
    assert.equal(r().m('abc','*+?').regex, '[abc]*+?');
    assert.equal(r().m('abc','{0,1}?').regex, '[abc]{0,1}?');
    assert.equal(r().a('abc').m().regex, '[abc]');
    assert.equal(r().a('abc').m(1).regex, '[abc]');
    assert.equal(r().a('abc').m('1').regex, 'abc[1]');
    assert.equal(r().a('abc').m(1,1,1).regex, '[abc]{1,1}');
    assert.equal(r().a('abc').m('1',1,1).regex, 'abc[1]{1,1}');
    assert.equal(r().a('abc').m('',1,1).regex, '[abc]{1,1}');
    assert.equal(r().a('abc').m(0,1,1).regex, '[abc]{1,1}');
  });
  it('p()', function() {
    assert.equal(r().p().regex, '(?:)');
    assert.equal(r().p('').regex, '(?:)');
    assert.equal(r().p(0).regex, '(?:)');
    assert.equal(r().p(1).regex, '(?:)');
    assert.equal(r().p(-1).regex, '(?:)');
    assert.equal(r().p('123').regex, '(?:123)');
    assert.equal(r().p('abc').regex, '(?:abc)');
    assert.equal(r().p(r(0)).regex, '(?:)');
    assert.equal(r().p(r('1')).regex, '(?:1)');
    assert.equal(r().p(r(r(-1))).regex, '(?:)');
    assert.equal(r().p('abc',0).regex, '(?:abc){0}');
    assert.equal(r().p('abc',1).regex, '(?:abc){1}');
    assert.equal(r().p('abc',0,0).regex, '(?:abc){0,0}');
    assert.equal(r().p('abc',0,1).regex, '(?:abc){0,1}');
    assert.equal(r().p('abc',1,0).regex, '(?:abc)');
    assert.equal(r().p('abc',1,1).regex, '(?:abc){1,1}');
    assert.equal(r().p('abc',-1,-1).regex, '(?:abc)');
    assert.equal(r().p('abc',-1).regex, '(?:abc)');
    assert.equal(r().p('abc','').regex, '(?:abc)');
    assert.equal(r().p('abc','*').regex, '(?:abc)*');
    assert.equal(r().p('abc','*+?').regex, '(?:abc)*+?');
    assert.equal(r().p('abc','{0,1}?').regex, '(?:abc){0,1}?');
    assert.equal(r().a('abc').p().regex, '(?:abc)');
    assert.equal(r().a('abc').p(1).regex, '(?:abc)');
    assert.equal(r().a('abc').p('1').regex, 'abc(?:1)');
    assert.equal(r().a('abc').p(1,1,1).regex, '(?:abc){1,1}');
    assert.equal(r().a('abc').p('1',1,1).regex, 'abc(?:1){1,1}');
    assert.equal(r().a('abc').p('',1,1).regex, '(?:abc){1,1}');
    assert.equal(r().a('abc').p(0,1,1).regex, '(?:abc){1,1}');
  });
  it('e()', function() {
    assert.deepEqual(r().e(), new RegExp());
    assert.deepEqual(r().e(0), new RegExp());
    assert.deepEqual(r().e([]), new RegExp());
    assert.equal(r().e('ok').eval, 'ok');
    assert.equal(r('\\d').e('9').is(), true);
    assert.equal(r('\\d').e('99').is(), false);
  });
  it('n()', function() {
    assert.deepEqual(r('\\d').n('+').match('99'), [ '99' ]);
    assert.deepEqual(r('\\d').n().match('99'), [ '9','9' ]);
  });
  it('opt()', function() {
    assert.equal(r('[a-z]+').opt('i').e().test('ABC1'), true);
    assert.equal(r('[a-z]+').opt('i').exact().e().test('ABC1'), false);
  });
  it('exact()', function() {
    assert.equal(r().exact().regex, '(?:^$)');
    assert.equal(r('\\w').exact().regex, '(?:^\\w$)');
  });
  it('go()', function() {
    assert.deepEqual(r('\\w').go().regex, /\w/);
    assert.deepEqual(r('\\w').go('g').regex, /\w/g);
  });
  it('is()', function() {
    assert.equal(r('\\d').is(), false);
    assert.equal(r('\\d').is(8), false);
    assert.equal(r('\\d').is('8a'), false);
    assert.equal(r('\\d').is('8.8'), false);
    assert.equal(r('\\d').is('abc'), false);
    assert.equal(r('\\d').e('abc').is(), false);
    assert.equal(r('abc').e('abc').is(), true);
  });
  it('contain()', function() {
    assert.equal(r('\\d').contain(8.8), false);
    assert.equal(r('\\d').contain('8.8.'), true);
    assert.equal(r('\\d').contain('abc'), false);
  });
  it('match()', function() {
    assert.equal(r('\\d').match({}), null);
    assert.sameMembers(r('\\d').match('8.8.'), ['8','8']);
  });
  it('desc()', function() {
    assert.equal(r().desc().description, '');
    assert.equal(r().desc([]).description, '');
    assert.equal(r().desc('API test').description, 'API test');
  });

});
