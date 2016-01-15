# angular-relative-date

[![Build Status](https://travis-ci.org/wildlyinaccurate/angular-relative-date.png?branch=master)](https://travis-ci.org/wildlyinaccurate/angular-relative-date)

AngularJS filter for creating relative, human-readable dates.

## Usage

For regular usage, just download and include `dist/angular-relative-date.js` in your application.

```html
<script src="angular-relative-date.js"></script>
```

You can also use the ES6 module directly using a packaging tool like [browserify](http://browserify.org/) or [webpack](https://webpack.github.io/).

```js
import relativeDate from 'angular-relative-date'
```

Add the `relativeDate` module to your application's dependencies.

```js
angular.module('myApp', ['relativeDate']);
```

Use the filter by passing it date strings or `Date` objects.

```html
<script>
angular.module('myApp', ['relativeDate']).controller('MainCtrl', function($scope) {
    $scope.dateString = '2015-05-08';
    $scope.dateObject = new Date();
});
</script>

<p>Date strings work: <strong>{{ dateString | relativeDate }}</strong></p>
<p>And so do <code>Date</code> objects: <strong>{{ dateObject | relativeDate }}</strong></p>
```

The above example will look something like this:

> Date strings work: **a week ago**
>
> And so do `Date` objects: **just now**

## i18n

Simple internationalisation support is available via the `relativeDateTranslations` value. See below for all available translation keys.

```html
<script>
angular.module('myApp', ['relativeDate'])
       .value('relativeDateTranslations', {
            just_now: '今'
       })
       .controller('MainCtrl', function($scope) {
            $scope.lastUpdated = new Date();
        });
</script>

<p>Last updated: <strong>{{ lastUpdated | relativeDate }}</strong></p>
```

The above will output:

> Last updated: **今**

As well as the built-in translation, [angular-translate](http://angular-translate.github.io/) is also supported. Simply add the translation keys to your `$translateProvider`.

```js
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        just_now: 'just now',
        seconds_ago: '{{time}} seconds ago',
    });

    $translateProvider.translations('de', {
        just_now: 'soeben',
        seconds_ago: 'vor {{time}} stunden',
    });

    $translateProvider.preferredLanguage('en');
});
```

### Translation keys

| Key                    | Default value             |
|------------------------|---------------------------|
| `just_now`             | just now                  |
| `seconds_ago`          | {{time}} seconds ago      |
| `a_minute_ago`         | a minute ago              |
| `minutes_ago`          | {{time}} minutes ago      |
| `an_hour_ago`          | an hour ago               |
| `hours_ago`            | {{time}} hours ago        |
| `a_day_ago`            | yesterday                 |
| `days_ago`             | {{time}} days ago         |
| `a_week_ago`           | a week ago                |
| `weeks_ago`            | {{time}} weeks ago        |
| `a_month_ago`          | a month ago               |
| `months_ago`           | {{time}} months ago       |
| `a_year_ago`           | a year ago                |
| `years_ago`            | {{time}} years ago        |
| `over_a_year_ago`      | over a year ago           |
| `seconds_from_now`     | {{time}} seconds from now |
| `a_minute_from_now`    | a minute from now         |
| `minutes_from_now`     | {{time}} minutes from now |
| `an_hour_from_now`     | an hour from now          |
| `hours_from_now`       | {{time}} hours from now   |
| `a_day_from_now`       | tomorrow                  |
| `days_from_now`        | {{time}} days from now    |
| `a_week_from_now`      | a week from now           |
| `weeks_from_now`       | {{time}} weeks from now   |
| `a_month_from_now`     | a month from now          |
| `months_from_now`      | {{time}} months from now  |
| `a_year_from_now`      | a year from now           |
| `years_from_now`       | {{time}} years from now   |
| `over_a_year_from_now` | over a year from now      |

## Contributing

Please modify `angular-relative-date.coffee` and then run `grunt build` to compile and minify the JavaScript (you may need to run `npm install` first).

Submit your change as a pull request, including a description of the change. Please be sure to add any relevant test cases to `test/spec/relativ-date-filter.js`.

## License

Released under the terms of MIT License:

The MIT License (MIT)

Copyright (c) 2015 Joseph Wynn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
