var myApp = angular.module('myApp', ['pascalprecht.translate', 'relativeDate'])

myApp.config(function($translateProvider) {
  $translateProvider.translations('en', {
    weeks_ago: '{{time}}週間前',
    a_year_ago: '一年前',
    hours_from_now: '{{time}}時間今から'
  }).preferredLanguage('en')
})

myApp.controller('TestCtrl', function($scope, $filter) {
  var relativeDate = $filter('relativeDate')

  $scope.fourWeeksAgo = relativeDate('2013-08-09')
  $scope.aYearAgo = relativeDate('2012-09-07')
  $scope.twoHoursFromNow = relativeDate('2013-09-07T14:00:00Z')
})
