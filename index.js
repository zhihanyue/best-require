/**
 * Enhance the 'require()' function.
 *
 * Note that the original module.require() will be hooked.
 *
 * @param {String} root project root directory (use '~' in path)
 * @param {Object} map macro definitions (use ':macroname' in path)
 * @return {Function} original require() function
 */

module.exports = function(root, map) {
    const process = require('process');
    root = root || process.cwd();
    map = map || {};
    if(! root.startsWith('/')) {
        throw new Error('BestRequire: the root path must be absolute!');
    }
    const old = module.__proto__.require;
    module.__proto__.require = function(id, ...args) {
        return old.apply(this, [
                id.split('/').map(function(s) {
                    if(s.startsWith(':'))
                        return map[s.substring(1)] || s;
                    if(s === '~')
                        return root;
                    return s;
                }).join('/'),
                ...args // for future compatibility
            ]
        );
    };
    return old;
};
