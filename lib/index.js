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
    const solveDependences = require('./solve-dependences');
    const path = require('path');
    const process = require('process');
    root = root || process.cwd();

    if (!path.isAbsolute(root)) {
        throw new Error('BestRequire: The root path must be absolute!');
    }

    let pathMap = { '~': root };
    for (let name in map) {
        pathMap[':' + name] = map[name];
    }

    let cache = solveDependences(pathMap);

    const old = module.__proto__.require;
    module.__proto__.require = function(id, ...args) {
        return old.apply(this, [
            id
                .split(/[\\\/]/g)
                .map(function(s) {
                    if (s.startsWith('::')) {
                        return s.substring(1);
                    } else return cache.hasOwnProperty(s) ? cache[s] : s;
                })
                .join('/'),
            ...args // for future compatibility
        ]);
    };
    return old;
};
