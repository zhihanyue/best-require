// use Memory Search Method to solve dependences in the map

module.exports = function(pathMap) {
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
    return cache;
}
