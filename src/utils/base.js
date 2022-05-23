import moment from 'moment';
import { DAY_IN_WEEK_VI, DAY_IN_WEEK_EN } from './date';
/* eslint-disable no-param-reassign */

// eslint-disable-next-line import/prefer-default-export
export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const votedKey = 'voted';

export function setTodayVoted() {
  const today = new Date(Date.now()).toISOString().split('T')[0];
  return localStorage.setItem(votedKey, today);
}

export function isTodayVoted() {
  const voted = localStorage.getItem(votedKey);
  const today = new Date(Date.now()).toISOString().split('T')[0];
  return voted === today;
}

export function filterWorkOfUser(user) {
  const { works, dateOfBirth } = user;
  // eslint-disable-next-line no-param-reassign
  user.works = works.length;
  // eslint-disable-next-line no-param-reassign
  // eslint-disable-next-line prefer-destructuring
  user.dateOfBirth = dateOfBirth.split('T')[0];

  // eslint-disable-next-line no-param-reassign
  user.votes = user.works ? works.map((w) => {
    const { votes } = w;
    if (votes.length) {
      return votes.map((v) => v.vote).reduce((a, b) => a + b, 0) / votes.length;
    }
    return 5;
  }).reduce((a, b) => a + b, 0) / user.works : 0;
  return user;
}

// export function getUserRange(dateStart, dateEnd, users) {
//   const from = new Date(dateStart).getTime();
//   const to = new Date(dateEnd).getTime();
//   return users.filter(u => {
//     const userDate = new Date(user.)
//   })
// }

// eslint-disable-next-line no-unused-vars
export function getWeekWorks(works) {
  const startWeek = moment().startOf('isoWeek'); // false
  const endWeek = moment().endOf('isoWeek'); // true
  const isInsideWeek = (work) => !startWeek.isAfter(moment(work.date), 'day') && endWeek.isAfter(moment(work.date), 'day');
  return works.filter(isInsideWeek).map((work) => {
    const tomorrow = moment().add(1, 'days');
    const isWorkNotOpening = tomorrow.isAfter(moment(work.date), 'day');
    work.isWorkNotOpening = isWorkNotOpening;
    work.votes = work.votes.length ? work.votes.reduce((a, b) => a + b, 0) / work.votes.length : 5;
    work.users = work.users.map((u) => u.name);
    work.day = DAY_IN_WEEK_VI[DAY_IN_WEEK_EN.indexOf(moment(work.date).format('ddd'))];
    // eslint-disable-next-line prefer-destructuring
    work.date = work.date.split('T')[0].split('-').reverse().join('/');
    return work;
  });
}
