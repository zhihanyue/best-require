Require Plus
=============

Require Plus is a `require()` hook plugin for requiring a module in your project elegantly for Node.js.

```js
require(':controllers/posts');
require(':models/Users');
require('~/application/apis/config');
```

Install
--------

```bash
npm install require-plus
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

When faced with the problem, you might tend to find a unified way to access the `posts` module, just like me. I used to require modules by this way:

```js
require(ROOT_PATH + 'application/apis/controllers/posts');
// other require()...
require(ROOT_PATH + 'application/apis/controllers/users');
require(ROOT_PATH + 'application/apis/controllers/products');
require(ROOT_PATH + 'application/apis/services/rest');
require(ROOT_PATH + 'application/apis/config');
```

emmmm... It's more maintainable than before. But, `ROOT_PATH` is ugly, isn't it?

#### Solution

Let's try to use Require Plus, by adding this at the beginning of the app:

```js
require('require-plus')(process.cwd())
```

Now, we can use `~` to represent `process.cwd()` in the path:

```js
require('~/application/apis/controllers/posts');
require('~/application/apis/controllers/users');
require('~/application/apis/controllers/products');
require('~/application/apis/services/rest');
require('~/application/apis/config');
```

However, this directory name is still a bit long, which can be shortened in this way:

```js
require('require-plus')(process.cwd(), {
    apis: process.cwd() + '/app/apis',
    controllers: process.cwd() + '/application/apis/controllers'
});
```

Then we are supposed to use `:api` for `~/application/apis` and `:controllers` for `~/application/apis/controllers`.

```js
require(':controllers/posts');
require(':controllers/users');
require(':controllers/products');
require(':apis/services/rest');
require(':apis/config');
```

Usage
------

Add this at the beginning of the program:

```js
require('require-plus')(
    root_path, // [optional] project root directory, defaults to `process.cwd()`
    name_mapping // [optional] name mapping
)();
```

Then you can use:

```js
require('~/(path)'); // require(root_path + '/(path)');
require(':key/(path)'); // require(name_mapping[key] + '/(path)');
```
