[![Build Status](https://travis-ci.org/yuezhihan/best-require.svg)](https://travis-ci.org/yuezhihan/best-require)
[![NPM version](https://img.shields.io/npm/v/best-require.svg)](https://www.npmjs.com/package/best-require)

Best Require
=============

**Best Require** is a `require()` hook plugin for requiring a module in your project elegantly for Node.js.

```js
require(':controllers/posts');
require(':models/Users');
require('~/application/apis/config');
```

Installation
-------------

```bash
npm install best-require --save
```

Introduction
-------------

#### Background

Have you ever coded like this in your application?

```js
// require the 'posts' module
require('./posts');
require('./controllers/posts');
require('../controllers/posts');
require('../../controllers/posts');
require('../../../apis/controllers/posts');
```

When our project contains many layers of directory, the relative path of each module will become complicated, which not only makes us very confused, but also makes the project difficult to maintain.

When faced with the problem, you might tend to find a unified way to access the `posts` module, just like me. I used to require modules in this way:

```js
require(ROOT_PATH + '/application/apis/controllers/posts');
// other require()...
require(ROOT_PATH + '/application/apis/controllers/users');
require(ROOT_PATH + '/application/apis/controllers/products');
require(ROOT_PATH + '/application/apis/services/rest');
require(ROOT_PATH + '/application/apis/config');
```

ummmm... It's more maintainable than before. But, `ROOT_PATH` is ugly, isn't it?

#### Solution

Let's try to use **Best Require**, by adding this at the beginning of the app:

```js
require('best-require')(process.cwd())
```

Now, we can use `~` to represent `process.cwd()` in the path:

```js
require('~/application/apis/controllers/posts');
require('~/application/apis/controllers/users');
require('~/application/apis/controllers/products');
require('~/application/apis/services/rest');
require('~/application/apis/config');
```

However, this directory name is still a bit long, which can be shortened by defining the name mapping:

```js
const ROOT_PATH = process.cwd();
require('best-require')(ROOT_PATH, {
    apis: ROOT_PATH + '/application/apis',
    controllers: ROOT_PATH + '/application/apis/controllers'
});
```

Then we are able to use `:apis` for `~/application/apis` and `:controllers` for `~/application/apis/controllers`:

```js
require(':controllers/posts');
require(':controllers/users');
require(':controllers/products');
require(':apis/services/rest');
require(':apis/config');
```

With the release V1.1+, you can also use other keys in the definition of a key-value pair in the name mapping, and our plug-in will automatically handle the keys' dependencies on each other. Therefore, the definition can be simplified as:

```js
require('best-require')(ROOT_PATH, {
    apis: '~/application/apis',
    controllers: ':apis/controllers'
});
```


Usage
------

Add this at the beginning of the program:

```js
require('best-require')(
    root_path, // [optional] project root directory, defaults to `process.cwd()`
    name_mapping // [optional] name mapping
)();
```

Then you can use:

```js
require('~/(path)'); // require(root_path + '/(path)');
require(':key/(path)'); // require(name_mapping[key] + '/(path)');
```
