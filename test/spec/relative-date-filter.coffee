'use strict'

describe 'Filter: relativeDate', ->
  relativeDate = null

  NOW = new Date '2013-09-07T12:00:00Z'

  beforeEach module 'relativeDate', ($provide) ->
    $provide.value 'now', NOW

    # Hack to get around CoffeeScript's implicit return
    undefined

  beforeEach inject (_$filter_) ->
    relativeDate = _$filter_ 'relativeDate'

  it 'Allows the `now` value to be set', ->
    inject (now) ->
      expect(now).toEqual NOW

  it 'Has the correct response for each interval', ->
    expect(relativeDate '2013-09-07T12:00:00Z').toEqual 'just now'
    expect(relativeDate '2013-09-07T11:59:31Z').toEqual 'just now'
    expect(relativeDate '2013-09-07T11:59:29Z').toEqual '31 seconds ago'
    expect(relativeDate '2013-09-07T11:59:01Z').toEqual '59 seconds ago'
    expect(relativeDate '2013-09-07T11:59:00Z').toEqual 'a minute ago'
    expect(relativeDate '2013-09-07T11:58:01Z').toEqual 'a minute ago'
    expect(relativeDate '2013-09-07T11:58:00Z').toEqual '2 minutes ago'
    expect(relativeDate '2013-09-07T11:00:01Z').toEqual '59 minutes ago'
    expect(relativeDate '2013-09-07T11:00:00Z').toEqual 'an hour ago'
    expect(relativeDate '2013-09-07T10:00:01Z').toEqual 'an hour ago'
    expect(relativeDate '2013-09-07T10:00:00Z').toEqual '2 hours ago'
    expect(relativeDate '2013-09-06T12:00:01Z').toEqual '23 hours ago'
    expect(relativeDate '2013-09-06T12:00:00Z').toEqual 'yesterday'
    expect(relativeDate '2013-09-06T00:00:00Z').toEqual 'yesterday'
    expect(relativeDate '2013-09-05T22:59:59Z').toEqual '2 days ago'
    expect(relativeDate '2013-09-01').toEqual '6 days ago'
    expect(relativeDate '2013-08-31').toEqual 'a week ago'
    expect(relativeDate '2013-08-09').toEqual '4 weeks ago'
    expect(relativeDate '2013-08-08').toEqual 'a month ago'
    expect(relativeDate '2013-03-01').toEqual '6 months ago'
    expect(relativeDate '2012-09-07').toEqual 'a year ago'
    expect(relativeDate '2012-04-07').toEqual 'a year ago'
    expect(relativeDate '2011-04-07').toEqual 'over a year ago'
