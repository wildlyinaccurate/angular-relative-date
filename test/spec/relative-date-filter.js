var NOW = new Date('2013-09-07T12:00:00Z')

describe('Filter: relativeDate', function() {
  var relativeDate

  beforeEach(function() {
    module('relativeDate', function($provide) {
      $provide.value('now', NOW)
    })

    inject(function(_$filter_) {
      relativeDate = _$filter_('relativeDate')
    })
  })

  it('Allows the `now` value to be set', function() {
    inject(function(now) {
      expect(now).toEqual(NOW)
    })
  })

  it('Has the correct response for each interval', function() {
    // Past
    expect(relativeDate('2013-09-07T12:00:00Z')).toEqual('just now')
    expect(relativeDate('2013-09-07T11:59:31Z')).toEqual('just now')
    expect(relativeDate('2013-09-07T11:59:29Z')).toEqual('31 seconds ago')
    expect(relativeDate('2013-09-07T11:59:01Z')).toEqual('59 seconds ago')
    expect(relativeDate('2013-09-07T11:59:00Z')).toEqual('a minute ago')
    expect(relativeDate('2013-09-07T11:58:01Z')).toEqual('a minute ago')
    expect(relativeDate('2013-09-07T11:58:00Z')).toEqual('2 minutes ago')
    expect(relativeDate('2013-09-07T11:00:01Z')).toEqual('59 minutes ago')
    expect(relativeDate('2013-09-07T11:00:00Z')).toEqual('an hour ago')
    expect(relativeDate('2013-09-07T10:00:01Z')).toEqual('an hour ago')
    expect(relativeDate('2013-09-07T10:00:00Z')).toEqual('2 hours ago')
    expect(relativeDate('2013-09-06T12:00:01Z')).toEqual('23 hours ago')
    expect(relativeDate('2013-09-06T12:00:00Z')).toEqual('yesterday')
    expect(relativeDate('2013-09-06T00:00:00Z')).toEqual('yesterday')
    expect(relativeDate('2013-09-05T22:59:59Z')).toEqual('2 days ago')
    expect(relativeDate('2013-09-01')).toEqual('6 days ago')
    expect(relativeDate('2013-08-31')).toEqual('a week ago')
    expect(relativeDate('2013-08-09')).toEqual('4 weeks ago')
    expect(relativeDate('2013-08-08')).toEqual('a month ago')
    expect(relativeDate('2013-03-01')).toEqual('6 months ago')
    expect(relativeDate('2012-09-07')).toEqual('a year ago')
    expect(relativeDate('2012-04-07')).toEqual('a year ago')
    expect(relativeDate('2011-04-07')).toEqual('over a year ago')

    // Future
    expect(relativeDate('2013-09-07T12:00:31Z')).toEqual('31 seconds from now')
    expect(relativeDate('2013-09-07T12:00:59Z')).toEqual('59 seconds from now')
    expect(relativeDate('2013-09-07T12:01:00Z')).toEqual('a minute from now')
    expect(relativeDate('2013-09-07T12:01:01Z')).toEqual('a minute from now')
    expect(relativeDate('2013-09-07T12:02:00Z')).toEqual('2 minutes from now')
    expect(relativeDate('2013-09-07T12:59:01Z')).toEqual('59 minutes from now')
    expect(relativeDate('2013-09-07T13:00:00Z')).toEqual('an hour from now')
    expect(relativeDate('2013-09-07T13:00:01Z')).toEqual('an hour from now')
    expect(relativeDate('2013-09-07T14:00:00Z')).toEqual('2 hours from now')
    expect(relativeDate('2013-09-08T11:00:01Z')).toEqual('23 hours from now')
    expect(relativeDate('2013-09-08T12:00:00Z')).toEqual('tomorrow')
    expect(relativeDate('2013-09-09T00:00:00Z')).toEqual('tomorrow')
    expect(relativeDate('2013-09-10T22:59:59Z')).toEqual('2 days from now')
    expect(relativeDate('2013-09-14')).toEqual('6 days from now')
    expect(relativeDate('2013-09-14T12:00:00Z')).toEqual('a week from now')
    expect(relativeDate('2013-10-05T12:00:00Z')).toEqual('4 weeks from now')
    expect(relativeDate('2013-10-07T12:00:00Z')).toEqual('a month from now')
    expect(relativeDate('2014-03-07T12:00:00Z')).toEqual('6 months from now')
    expect(relativeDate('2014-09-07T12:00:00Z')).toEqual('a year from now')
    expect(relativeDate('2015-01-07T12:00:00Z')).toEqual('a year from now')
    expect(relativeDate('2015-10-07T12:00:00Z')).toEqual('over a year from now')
  })
})

describe('Filter: relativeDate', function() {
  var relativeDate

  beforeEach(function() {
    module('relativeDate')

    inject(function(_$filter_) {
      relativeDate = _$filter_('relativeDate')
    })
  })

  it('Updates the value of NOW', function(done) {
    // Create a date 29 seconds ago (30 is the "just now" cutoff)
    var now = new Date(new Date() - 29000)
    var flag

    expect(relativeDate(now)).toEqual('just now')

    setTimeout(function() {
      expect(relativeDate(now)).toEqual('30 seconds ago')

      done()
    }, 1001)
  })
})

describe('Filter: relativeDate', function() {
  var relativeDate

  beforeEach(function() {
    module('relativeDate', function($provide) {
      $provide.value('now', NOW)
      $provide.value('relativeDateTranslations', {
        weeks_ago: '{{time}}週間前',
        a_year_ago: '一年前',
        hours_from_now: '{{time}}時間今から'
      })
    })

    inject(function(_$filter_) {
      relativeDate = _$filter_('relativeDate')
    })
  })

  it('Performs simple translations', function() {
    expect(relativeDate('2013-08-09')).toEqual('4週間前')
    expect(relativeDate('2012-09-07')).toEqual('一年前')
    expect(relativeDate('2013-09-07T14:00:00Z')).toEqual('2時間今から')
  })
})

describe('Filter: relativeDate', function() {
  var $scope

  beforeEach(function() {
    module('myApp', function($provide) {
      $provide.value('now', NOW)
    })

    inject(function($rootScope, $controller, $filter) {
      $scope = $rootScope.$new()
      $controller('TestCtrl', {
        $scope: $scope
      })
    })
  })

  describe('Integration with angular-translate', function() {
    it('Uses angular-translate when available', function() {
      expect($scope.fourWeeksAgo).toEqual('4週間前')
      expect($scope.aYearAgo).toEqual('一年前')
      expect($scope.twoHoursFromNow).toEqual('2時間今から')
    })
  })
})
