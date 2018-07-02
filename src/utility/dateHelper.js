import moment from 'moment'

export const parseDate = dateString => {

 const time = moment(dateString).format('LT');

 const date = moment(dateString).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    // when the date is further away, use from-now functionality
    sameElse: function () {
      return '[' + simpleDate(dateString) + ']'
    }
  })

  return `${date} at ${time}`
}

const simpleDate = dateString => {
  return moment(dateString).format('l');
}
