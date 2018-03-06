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
    const solveDependences = require('./solve-dependences.js');
    const process = require('process');
    root = root || process.cwd();
    
    if(! root.startsWith('/')) {
        throw new Error('BestRequire: the root path must be absolute!');
    }

    let pathMap = {'~': root};
    for(let name in map) {
        pathMap[':' + name] = map[name];
    }

    let cache = solveDependences(pathMap);

    const old = module.__proto__.require;
    module.__proto__.require = function(id, ...args) {
        return old.apply(this, [
                id.split('/').map(function(s) {
                    if(s.startsWith('::')) {
                        return s.substring(1);
                    } else return cache.hasOwnProperty(s) ? cache[s] : s;
                }).join('/'),
                ...args // for future compatibility
            ]
        );
    };
    return old;
};
