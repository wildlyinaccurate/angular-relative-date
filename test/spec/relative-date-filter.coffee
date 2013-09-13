'use strict'

describe 'Filter: relativeDate', ->
  relativeDate = null

  NOW = new Date('Fri Sep 7 2013 12:00:00 GMT+0100 (BST)')

  beforeEach module 'relativeDate', ($provide) ->
    $provide.value 'now', NOW

    undefined

  beforeEach inject (_$filter_) ->
    relativeDate = _$filter_ 'relativeDate'

  it 'Allows the `now` value to be set', ->
    inject (now) ->
      expect(now).toEqual NOW

  it 'Interprets date strings correctly', ->
    expect(relativeDate '2013-08-30').toEqual 'a week ago'
    expect(relativeDate '2013-09-07 00:00:00').toEqual '12 hours ago'
    expect(relativeDate '2013-09-07 12:00:00').toEqual 'just now'

  it 'Has the correct response for each interval', ->
    expect(relativeDate '2013-09-07 12:00:00').toEqual 'just now'
    expect(relativeDate '2013-09-07 11:59:31').toEqual 'just now'
    expect(relativeDate '2013-09-07 11:59:29').toEqual '31 seconds ago'
    expect(relativeDate '2013-09-07 11:59:01').toEqual '59 seconds ago'
    expect(relativeDate '2013-09-07 11:59:00').toEqual 'a minute ago'
    expect(relativeDate '2013-09-07 11:58:01').toEqual 'a minute ago'
    expect(relativeDate '2013-09-07 11:58:00').toEqual '2 minutes ago'
    expect(relativeDate '2013-09-07 11:00:01').toEqual '59 minutes ago'
    expect(relativeDate '2013-09-07 11:00:00').toEqual 'an hour ago'
    expect(relativeDate '2013-09-07 10:00:01').toEqual 'an hour ago'
    expect(relativeDate '2013-09-07 10:00:00').toEqual '2 hours ago'
    expect(relativeDate '2013-09-06 12:00:01').toEqual '23 hours ago'
    expect(relativeDate '2013-09-06 12:00:00').toEqual 'yesterday'
    expect(relativeDate '2013-09-06 00:00:00').toEqual 'yesterday'
    expect(relativeDate '2013-09-05 23:59:59').toEqual '2 days ago'
    expect(relativeDate '2013-09-01').toEqual '6 days ago'
    expect(relativeDate '2013-08-31').toEqual 'a week ago'
    expect(relativeDate '2013-08-09').toEqual '4 weeks ago'
    expect(relativeDate '2013-08-08').toEqual 'a month ago'
    expect(relativeDate '2013-03-01').toEqual '6 months ago'
    expect(relativeDate '2012-09-07').toEqual 'a year ago'
    expect(relativeDate '2012-04-07').toEqual 'a year ago'
    expect(relativeDate '2011-04-07').toEqual 'over a year ago'
