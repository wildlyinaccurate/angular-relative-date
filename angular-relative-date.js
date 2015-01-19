(function() {
  'use strict';
  angular.module('relativeDate', ['pascalprecht.translate']).config([
    '$translateProvider', function($translateProvider) {
      return $translateProvider.translations('en', {
        just_now: 'just now',
        seconds_ago: '{{seconds}} seconds ago',
        a_minute_ago: 'a minute ago',
        minutes_ago: '{{minutes}} minutes ago',
        an_hour_ago: 'an hour ago',
        hours_ago: '{{hours}} hours ago',
        yesterday: 'yesterday',
        days_ago: '{{days}} days ago',
        a_week_ago: 'a week ago',
        weeks_ago: '{{weeks}} weeks ago',
        a_month_ago: 'a month ago',
        months_ago: '{{months}} months ago',
        a_year_ago: 'a year ago',
        years_ago: '{{years}} years ago',
        over_a_year_ago: 'over a year ago',
        seconds_from_now: '{{seconds}} seconds from now',
        a_minute_from_now: 'a minute from now',
        minutes_from_now: '{{minutes}} minutes from now',
        an_hour_from_now: 'an hour from now',
        hours_from_now: '{{hours}} hours from now',
        tomorrow: 'tomorrow',
        days_from_now: '{{days}} days from now',
        a_week_from_now: 'a week from now',
        weeks_from_now: '{{weeks}} weeks from now',
        a_month_from_now: 'a month from now',
        months_from_now: '{{months}} months from now',
        a_year_from_now: 'a year from now',
        years_from_now: '{{years}} years from now',
        over_a_year_from_now: 'over a year from now'
      }).preferredLanguage('en');
    }
  ]).value('now', new Date()).filter('relativeDate', [
    '$filter', 'now', function($filter, now) {
      return function(date) {
        var calculateDelta, day, delta, hour, minute, month, translateArg, translatePhrase, week, year;
        if (!(date instanceof Date)) {
          date = new Date(date);
        }
        delta = null;
        minute = 60;
        hour = minute * 60;
        day = hour * 24;
        week = day * 7;
        month = day * 30;
        year = day * 365;
        calculateDelta = function() {
          return delta = Math.round(Math.abs(now - date) / 1000);
        };
        calculateDelta();
        if (delta > day && delta < week) {
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
          calculateDelta();
        }
        if (now >= date) {
          switch (false) {
            case !(delta < 30):
              translatePhrase = 'just_now';
              break;
            case !(delta < minute):
              translatePhrase = 'seconds_ago';
              translateArg = {
                seconds: delta
              };
              break;
            case !(delta < 2 * minute):
              translatePhrase = 'a_minute_ago';
              break;
            case !(delta < hour):
              translatePhrase = 'minutes_ago';
              translateArg = {
                minutes: Math.floor(delta / minute)
              };
              break;
            case Math.floor(delta / hour) !== 1:
              translatePhrase = 'an_hour_ago';
              break;
            case !(delta < day):
              translatePhrase = 'hours_ago';
              translateArg = {
                hours: Math.floor(delta / hour)
              };
              break;
            case !(delta < day * 2):
              translatePhrase = 'yesterday';
              break;
            case !(delta < week):
              translatePhrase = 'days_ago';
              translateArg = {
                days: Math.floor(delta / day)
              };
              break;
            case Math.floor(delta / week) !== 1:
              translatePhrase = 'a_week_ago';
              break;
            case !(delta < month):
              translatePhrase = 'weeks_ago';
              translateArg = {
                weeks: Math.floor(delta / week)
              };
              break;
            case Math.floor(delta / month) !== 1:
              translatePhrase = 'a_month_ago';
              break;
            case !(delta < year):
              translatePhrase = 'months_ago';
              translateArg = {
                months: Math.floor(delta / month)
              };
              break;
            case Math.floor(delta / year) !== 1:
              translatePhrase = 'a_year_ago';
              break;
            default:
              translatePhrase = 'over_a_year_ago';
          }
        } else {
          switch (false) {
            case !(delta < minute):
              translatePhrase = 'seconds_from_now';
              translateArg = {
                seconds: delta
              };
              break;
            case !(delta < 2 * minute):
              translatePhrase = 'a_minute_from_now';
              break;
            case !(delta < hour):
              translatePhrase = 'minutes_from_now';
              translateArg = {
                minutes: Math.floor(delta / minute)
              };
              break;
            case Math.floor(delta / hour) !== 1:
              translatePhrase = 'an_hour_from_now';
              break;
            case !(delta < day):
              translatePhrase = 'hours_from_now';
              translateArg = {
                hours: Math.floor(delta / hour)
              };
              break;
            case !(delta < day * 2):
              translatePhrase = 'tomorrow';
              break;
            case !(delta < week):
              translatePhrase = 'days_from_now';
              translateArg = {
                days: Math.floor(delta / day)
              };
              break;
            case Math.floor(delta / week) !== 1:
              translatePhrase = 'a_week_from_now';
              break;
            case !(delta < month):
              translatePhrase = 'weeks_from_now';
              translateArg = {
                weeks: Math.floor(delta / week)
              };
              break;
            case Math.floor(delta / month) !== 1:
              translatePhrase = 'a_month_from_now';
              break;
            case !(delta < year):
              translatePhrase = 'months_from_now';
              translateArg = {
                months: Math.floor(delta / month)
              };
              break;
            case Math.floor(delta / year) !== 1:
              translatePhrase = 'a_year_from_now';
              break;
            default:
              translatePhrase = 'over_a_year_from_now';
          }
        }
        return $filter('translate')(translatePhrase, translateArg);
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=angular-relative-date.js.map
*/