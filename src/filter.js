const getTranslate = (injector, translations) => {
  if (injector.has('$translate')) {
    return injector.get('$translate')
  } else {
    return {
      instant: (id, params) => translations[id].replace('{{time}}', params.time)
    }
  }
}

const calculateDelta = (now, date) => Math.round(Math.abs(now - date) / 1000)

export default function relativeDateFilter ($injector, _now, relativeDateTranslations) {
  const $translate = getTranslate($injector, relativeDateTranslations)

  return function (date) {
    const now = _now || new Date()

    if (!(date instanceof Date)) {
      date = new Date(date)
    }

    var delta = null

    const minute = 60
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    const month = day * 30
    const year = day * 365

    delta = calculateDelta(now, date)

    if (delta > day && delta < week) {
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
      delta = calculateDelta(now, date)
    }

    const translate = (translatePhrase, timeValue) => {
      var translateKey

      if (translatePhrase === 'just_now') {
        translateKey = translatePhrase
      } else if (now >= date) {
        translateKey = `${translatePhrase}_ago`
      } else {
        translateKey = `${translatePhrase}_from_now`
      }

      return $translate.instant(translateKey, {
        time: timeValue
      })
    }

    switch (false) {
      case !(delta < 30):
        return translate('just_now')

      case !(delta < minute):
        return translate('seconds', delta)

      case !(delta < 2 * minute):
        return translate('a_minute')

      case !(delta < hour):
        return translate('minutes', Math.floor(delta / minute))

      case Math.floor(delta / hour) !== 1:
        return translate('an_hour')

      case !(delta < day):
        return translate('hours', Math.floor(delta / hour))

      case !(delta < day * 2):
        return translate('a_day')

      case !(delta < week):
        return translate('days', Math.floor(delta / day))

      case Math.floor(delta / week) !== 1:
        return translate('a_week')

      case !(delta < month):
        return translate('weeks', Math.floor(delta / week))

      case Math.floor(delta / month) !== 1:
        return translate('a_month')

      case !(delta < year):
        return translate('months', Math.floor(delta / month))

      case Math.floor(delta / year) !== 1:
        return translate('a_year')

      default:
        return translate('over_a_year')
    }
  }
}
