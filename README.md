# angular-relative-date

[![Build Status](https://travis-ci.org/wildlyinaccurate/angular-relative-date.png?branch=master)](https://travis-ci.org/wildlyinaccurate/angular-relative-date)

AngularJS filter for creating relative, human-readable dates.

## Usage

Include angular-relative-date.js in your application.

```html
<script src="angular-relative-date.js"></script>
```

Add the `relativeDate` module to your application's dependencies.

```js
angular.module('myApp', ['relativeDate']);
```

Use the filter by passing it date strings or `Date` objects.

```html
<script>
    angular.module('myApp').controller('MainCtrl', function($scope) {
        $scope.dateString = '2013-09-08';
        $scope.dateObject = new Date();
    });
</script>

<p>Date strings work: <strong>{{ dateString | relativeDate }}</strong></p>
<p>And so do <code>Date</code> objects: <strong>{{ dateObject | relativeDate }}</strong></p>
```

> Date strings work: **a week ago**
> And so do `Date` objects: **just now**

## License

Released under the terms of MIT License:

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
