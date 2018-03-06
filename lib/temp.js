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
    
    if(! root.startsWith('/')) {
        throw new Error('BestRequire: the root path must be absolute!');
    }

    let pathMap = {'~': root};
    for(let name in map) {
        pathMap[':' + name] = map[name];
    }

    // use Memory Search Method to solve dependences in the map
    let cache = {};
    function solveDependences(name) {
        if(!cache[name]) {
            if(cache[name] === '') {
                throw new Error('BestRequire: cyclic dependence occurs in the difinition of name mapping!');
            }
            cache[name] = '';
            cache[name] = pathMap[name].split('/')
                             .map((s) => pathMap[s] ? solveDependences(s) : s)
                             .join('/');
        }
        return cache[name];
    }
    for(let name in pathMap) {
        solveDependences(name);
    }

    const old = module.__proto__.require;
    module.__proto__.require = function(id, ...args) {
        let res = "";
        let segStr = "";
        for(let ch of id) {
            if(ch === '/') {
                res += cache.hasOwnProperty(segStr) ? cache[segStr] : segStr;
                res += '/';
                segStr = "";
            } else segStr += ch;
        }
        if(segStr)
            res += cache.hasOwnProperty(segStr) ? cache[segStr] : segStr;

        return old.apply(this, [
                res,
                ...args // for future compatibility
            ]
        );
    };
    return old;
};
