const assert = require('assert');
require('../index.js')(process.cwd(),{
    d1: process.cwd() + '/test/bar/d1',
    d3: process.cwd() + '/test/foo/d3'
});
assert.strictEqual(require('~/test/bar/d1/a'), 1);
assert.strictEqual(require(':d1/a'), 1);
assert.strictEqual(require('~/test/bar/d2/b.js'), 2);
assert.strictEqual(require('~/test/foo/d3/c.js'), 3);
assert.strictEqual(require(':d3/c'), 3);
