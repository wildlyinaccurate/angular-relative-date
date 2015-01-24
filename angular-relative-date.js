(function() {
  'use strict';
  angular.module('relativeDate', []).value('now', new Date()).value('relativeDateTranslations', {
    just_now: 'just now',
    seconds_ago: '{{time}} seconds ago',
    a_minute_ago: 'a minute ago',
    minutes_ago: '{{time}} minutes ago',
    an_hour_ago: 'an hour ago',
    hours_ago: '{{time}} hours ago',
    a_day_ago: 'yesterday',
    days_ago: '{{time}} days ago',
    a_week_ago: 'a week ago',
    weeks_ago: '{{time}} weeks ago',
    a_month_ago: 'a month ago',
    months_ago: '{{time}} months ago',
    a_year_ago: 'a year ago',
    years_ago: '{{time}} years ago',
    over_a_year_ago: 'over a year ago',
    seconds_from_now: '{{time}} seconds from now',
    a_minute_from_now: 'a minute from now',
    minutes_from_now: '{{time}} minutes from now',
    an_hour_from_now: 'an hour from now',
    hours_from_now: '{{time}} hours from now',
    a_day_from_now: 'tomorrow',
    days_from_now: '{{time}} days from now',
    a_week_from_now: 'a week from now',
    weeks_from_now: '{{time}} weeks from now',
    a_month_from_now: 'a month from now',
    months_from_now: '{{time}} months from now',
    a_year_from_now: 'a year from now',
    years_from_now: '{{time}} years from now',
    over_a_year_from_now: 'over a year from now'
  }).filter('relativeDate', [
    '$injector', '$filter', 'now', 'relativeDateTranslations', function($injector, $filter, now, relativeDateTranslations) {
      var $translate;
      if ($injector.has('$translate')) {
        $translate = $injector.get('translate');
      } else {
        $translate = {
          instant: function(id, params) {
            return relativeDateTranslations[id].replace('{{time}}', params.time);
          }
        };
      }
      return function(date) {
        var calculateDelta, day, delta, hour, minute, month, timeValue, translateKey, translatePhrase, week, year;
        if (!(date instanceof Date)) {
          date = new Date(date);
        }
        delta = null;
        timeValue = null;
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
        switch (false) {
          case !(delta < 30):
            translatePhrase = 'just_now';
            break;
          case !(delta < minute):
            translatePhrase = 'seconds';
            timeValue = delta;
            break;
          case !(delta < 2 * minute):
            translatePhrase = 'a_minute';
            break;
          case !(delta < hour):
            translatePhrase = 'minutes';
            timeValue = Math.floor(delta / minute);
            break;
          case Math.floor(delta / hour) !== 1:
            translatePhrase = 'an_hour';
            break;
          case !(delta < day):
            translatePhrase = 'hours';
            timeValue = Math.floor(delta / hour);
            break;
          case !(delta < day * 2):
            translatePhrase = 'a_day';
            break;
          case !(delta < week):
            translatePhrase = 'days';
            timeValue = Math.floor(delta / day);
            break;
          case Math.floor(delta / week) !== 1:
            translatePhrase = 'a_week';
            break;
          case !(delta < month):
            translatePhrase = 'weeks';
            timeValue = Math.floor(delta / week);
            break;
          case Math.floor(delta / month) !== 1:
            translatePhrase = 'a_month';
            break;
          case !(delta < year):
            translatePhrase = 'months';
            timeValue = Math.floor(delta / month);
            break;
          case Math.floor(delta / year) !== 1:
            translatePhrase = 'a_year';
            break;
          default:
            translatePhrase = 'over_a_year';
        }
        if (translatePhrase === 'just_now') {
          translateKey = translatePhrase;
        } else if (now >= date) {
          translateKey = "" + translatePhrase + "_ago";
        } else {
          translateKey = "" + translatePhrase + "_from_now";
        }
        return $translate.instant(translateKey, {
          time: timeValue
        });
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=angular-relative-date.js.map
*/