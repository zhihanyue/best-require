require('../index.js')(process.cwd(),{
    d1: ':bar/d1',
    d3: ':foo/d3',
    foo: ':t/foo',
    bar: ':t/bar',
    t: '~/test'
});

let t = new Date();
for(var i = 0; i < 500000; ++i) {
    require('~/test/bar/d1/a');
    require(':d1/a');
    require('~/test/bar/d2/b.js');
    require('~/test/foo/d3/c.js');
    require(':d3/c');
}
console.log(new Date() - t);
