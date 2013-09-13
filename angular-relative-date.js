(function() {
  'use strict';
  angular.module('relativeDate', []).value('now', new Date()).filter('relativeDate', [
    'now', function(now) {
      return function(date) {
        var calculateDelta, day, delta, hour, minute, month, week, year;
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
          return delta = Math.round((now - date) / 1000);
        };
        calculateDelta();
        if (delta > day && delta < week) {
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
          calculateDelta();
        }
        switch (false) {
          case !(delta < 30):
            return 'just now';
          case !(delta < minute):
            return "" + delta + " seconds ago";
          case !(delta < 2 * minute):
            return 'a minute ago';
          case !(delta < hour):
            return "" + (Math.floor(delta / minute)) + " minutes ago";
          case Math.floor(delta / hour) !== 1:
            return 'an hour ago';
          case !(delta < day):
            return "" + (Math.floor(delta / hour)) + " hours ago";
          case !(delta < day * 2):
            return 'yesterday';
          case !(delta < week):
            return "" + (Math.floor(delta / day)) + " days ago";
          case Math.floor(delta / week) !== 1:
            return 'a week ago';
          case !(delta < month):
            return "" + (Math.floor(delta / week)) + " weeks ago";
          case Math.floor(delta / month) !== 1:
            return 'a month ago';
          case !(delta < year):
            return "" + (Math.floor(delta / month)) + " months ago";
          case Math.floor(delta / year) !== 1:
            return 'a year ago';
          default:
            return 'over a year ago';
        }
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=angular-relative-date.js.map
*/