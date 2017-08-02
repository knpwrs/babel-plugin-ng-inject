# babel-plugin-ng-inject

[![Greenkeeper badge](https://badges.greenkeeper.io/knpwrs/babel-plugin-ng-inject.svg)](https://greenkeeper.io/)

Like [`ng-annotate`] except it runs as a part of your Babel build (like
[`babel-plugin-ng-annotate`] except it doesn't use ES7 decorators).

## Usage

Install `babel-plugin-ng-inject`:

```
npm i --save-dev babel-plugin-ng-inject
```

Then either use it in your `.babelrc` (recommended):

```
{
  "plugins": ["ng-inject"]
}
```

Or from the CLI:

```
babel --plugins ng-inject
```

Functions which contain the `'ngInject'` ECMAScript directive will be modified
to have their arguments injected. For example, the following:

```js
angular.module('MyMod').controller('MyCtrl', function ($scope, $timeout) {
  'ngInject';
});
```

Will be transformed to:

```js
angular.module('MyMod').controller('MyCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
}]);
```

Notice that the `'ngInject'` directive was removed. This plugin also works with arrow functions. The following:

```js
angular.module('MyMod').controller('MyCtrl', ($scope, $timeout) => {
  'ngInject';
});
```

Will be transformed to:

```js
angular.module('MyMod').controller('MyCtrl', ['$scope', '$timeout', ($scope, $timeout) => {
}]);
```

## License

**The MIT License (MIT)**

Copyright (c) 2016 Kenneth Powers <ken@kenpowers.net> (http://knpw.rs)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[CLI]: http://babeljs.io/docs/usage/cli/ "Babel CLI"
[Babel]: http://babeljs.io/ "Babel: The compiler for writing next generation JavaScript"
[`babel-plugin-ng-annotate`]: https://github.com/mchmielarski/babel-plugin-ng-annotate "babel-plugin-ng-annotate"
[`ng-annotate`]: https://github.com/olov/ng-annotate "ng-annotate"
