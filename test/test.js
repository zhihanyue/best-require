const assert = require('assert');
require('../index.js')(process.cwd(),{
    d1: ':bar/d1',
    d3: ':foo/d3',
    foo: ':t/foo',
    bar: ':t/bar',
    t: '~/test'
});
assert.strictEqual(require('~/test/bar/d1/a'), 1);
assert.strictEqual(require(':d1/a'), 1);
assert.strictEqual(require('~/test/bar/d2/b.js'), 2);
assert.strictEqual(require('~/test/foo/d3/c.js'), 3);
assert.strictEqual(require(':d3/c'), 3);
