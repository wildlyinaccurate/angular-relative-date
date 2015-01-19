'use strict'

angular.module('relativeDate', ['pascalprecht.translate'])
  .config(['$translateProvider', ($translateProvider) ->
    $translateProvider.translations('en', {
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
    })
    .preferredLanguage('en')
  ])
  .value('now', new Date())
  .filter 'relativeDate', ['$filter', 'now', ($filter, now) ->
    (date) ->
      date = new Date(date) unless date instanceof Date
      delta = null

      minute = 60
      hour = minute * 60
      day = hour * 24
      week = day * 7
      month = day * 30
      year = day * 365

      calculateDelta = ->
        delta = Math.round(Math.abs(now - date) / 1000)

      calculateDelta()

      if delta > day && delta < week
        # We're dealing with days now, so time becomes irrelevant
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
        calculateDelta()

      if now >= date
        switch
          when delta < 30 then translatePhrase = 'just_now'
          when delta < minute
            translatePhrase = 'seconds_ago'
            translateArg = { seconds: delta }
          when delta < 2 * minute then translatePhrase = 'a_minute_ago'
          when delta < hour
            translatePhrase = 'minutes_ago'
            translateArg = { minutes: Math.floor(delta / minute) }
          when Math.floor(delta / hour) == 1 then translatePhrase = 'an_hour_ago'
          when delta < day
            translatePhrase = 'hours_ago'
            translateArg = { hours: Math.floor(delta / hour) }
          when delta < day * 2 then translatePhrase = 'yesterday'
          when delta < week
            translatePhrase = 'days_ago'
            translateArg = { days: Math.floor(delta / day) }
          when Math.floor(delta / week) == 1 then translatePhrase = 'a_week_ago'
          when delta < month
            translatePhrase = 'weeks_ago'
            translateArg = { weeks: Math.floor(delta / week) }
          when Math.floor(delta / month) == 1 then translatePhrase = 'a_month_ago'
          when delta < year
            translatePhrase = 'months_ago'
            translateArg = { months: Math.floor(delta / month) }
          when Math.floor(delta / year) == 1 then translatePhrase = 'a_year_ago'
          else translatePhrase = 'over_a_year_ago'
      else
        switch
          when delta < minute
            translatePhrase = 'seconds_from_now'
            translateArg = { seconds: delta }
          when delta < 2 * minute then translatePhrase = 'a_minute_from_now'
          when delta < hour
            translatePhrase = 'minutes_from_now'
            translateArg = { minutes: Math.floor(delta / minute) }
          when Math.floor(delta / hour) == 1 then translatePhrase = 'an_hour_from_now'
          when delta < day
            translatePhrase = 'hours_from_now'
            translateArg = { hours: Math.floor(delta / hour) }
          when delta < day * 2 then translatePhrase = 'tomorrow'
          when delta < week
            translatePhrase = 'days_from_now'
            translateArg = { days: Math.floor(delta / day) }
          when Math.floor(delta / week) == 1 then translatePhrase = 'a_week_from_now'
          when delta < month
            translatePhrase = 'weeks_from_now'
            translateArg = { weeks: Math.floor(delta / week) }
          when Math.floor(delta / month) == 1 then translatePhrase = 'a_month_from_now'
          when delta < year
            translatePhrase = 'months_from_now'
            translateArg = { months: Math.floor(delta / month) }
          when Math.floor(delta / year) == 1 then translatePhrase = 'a_year_from_now'
          else translatePhrase = 'over_a_year_from_now'

      $filter('translate')(translatePhrase, translateArg)
  ]
