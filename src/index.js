/* global angular */

import translations from './translations'
import filter from './filter'

const relativeDate = angular.module('relativeDate', [])

relativeDate.value('now', null)
relativeDate.value('relativeDateTranslations', translations)

relativeDate.filter('relativeDate', ['$injector', 'now', 'relativeDateTranslations', filter])

export default relativeDate
