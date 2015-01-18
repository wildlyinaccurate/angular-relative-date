'use strict'

angular.module('relativeDate', [])
  .value('now', new Date())
  .filter 'relativeDate', ['now', (now) ->
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
          when delta < 30 then 'just now'
          when delta < minute then "#{delta} seconds ago"
          when delta < 2 * minute then 'a minute ago'
          when delta < hour then "#{Math.floor(delta / minute)} minutes ago"
          when Math.floor(delta / hour) == 1 then 'an hour ago'
          when delta < day then "#{Math.floor(delta / hour)} hours ago"
          when delta < day * 2 then 'yesterday'
          when delta < week then "#{Math.floor(delta / day)} days ago"
          when Math.floor(delta / week) == 1 then 'a week ago'
          when delta < month then "#{Math.floor(delta / week)} weeks ago"
          when Math.floor(delta / month) == 1 then 'a month ago'
          when delta < year then "#{Math.floor(delta / month)} months ago"
          when Math.floor(delta / year) == 1 then 'a year ago'
          else 'over a year ago'
      else
        switch
          when delta < minute then "#{delta} seconds from now"
          when delta < 2 * minute then 'a minute from now'
          when delta < hour then "#{Math.floor(delta / minute)} minutes from now"
          when Math.floor(delta / hour) == 1 then 'an hour from now'
          when delta < day then "#{Math.floor(delta / hour)} hours from now"
          when delta < day * 2 then 'tomorrow'
          when delta < week then "#{Math.floor(delta / day)} days from now"
          when Math.floor(delta / week) == 1 then 'a week from now'
          when delta < month then "#{Math.floor(delta / week)} weeks from now"
          when Math.floor(delta / month) == 1 then 'a month from now'
          when delta < year then "#{Math.floor(delta / month)} months from now"
          when Math.floor(delta / year) == 1 then 'a year from now'
          else 'over a year from now'
  ]
