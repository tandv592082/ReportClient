import moment from 'moment';
import { DAY_IN_WEEK_VI, DAY_IN_WEEK_EN } from './date';
/* eslint-disable no-param-reassign */

// eslint-disable-next-line import/prefer-default-export
export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const votedKey = 'voted';

export function setTodayVoted(userId) {
  const today = new Date(Date.now()).toISOString().split('T')[0];
  let localVotedData = localStorage.getItem(votedKey);
  if (localVotedData) {
    localVotedData = JSON.parse(localVotedData);
    const hasTodayVotedData = localVotedData.some((v) => v.date === today);
    if (hasTodayVotedData) {
      // eslint-disable-next-line no-restricted-syntax
      for (const i in localVotedData) {
        if (localVotedData[i].date === today) {
          localVotedData[i].users.push(userId);
          localStorage.setItem(votedKey, JSON.stringify(localVotedData));
        }
      }
    } else {
      localVotedData.push({
        date: today,
        users: [userId],
      });
    }
  } else {
    const initialData = [{
      date: today,
      users: [userId],
    }];
    localStorage.setItem(votedKey, JSON.stringify(initialData));
  }
}

export function isTodayVoted(userId) {
  let voted = localStorage.getItem(votedKey);
  if (voted) {
    voted = JSON.parse(voted);
    const today = new Date(Date.now()).toISOString().split('T')[0];
    return voted.some((v) => v.date === today && v.users.includes(userId));
  }
  return false;
}

export function filterWorkOfUser(user) {
  const { works, dateOfBirth } = user;
  // eslint-disable-next-line no-param-reassign
  user.works = works.length;
  // eslint-disable-next-line no-param-reassign
  // eslint-disable-next-line prefer-destructuring
  user.dateOfBirth = dateOfBirth.split('T')[0];

  // eslint-disable-next-line no-param-reassign
  user.votes = user.works ? (works.map((w) => {
    const { votes } = w;
    if (votes.length) {
      return votes.map((v) => v.vote).reduce((a, b) => a + b, 0) / votes.length;
    }
    return 0;
  }).reduce((a, b) => a + b, 0) / user.works).toFixed(1) : 'Không có đánh giá nào!';
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
  works = cloneObj(works);
  const startWeek = moment().startOf('isoWeek'); // false
  const endWeek = moment().endOf('isoWeek'); // true
  const isInsideWeek = (work) => !startWeek.isAfter(moment(work.date), 'day') && endWeek.isAfter(moment(work.date), 'day');
  return works.filter(isInsideWeek).map((work) => {
    const tomorrow = moment().add(1, 'days');
    const isWorkNotOpening = tomorrow.isAfter(moment(work.date), 'day');
    work.isWorkNotOpening = isWorkNotOpening;
    work.votes = work.votes.length ? work.votes.reduce((avg, v, _, { length }) => avg + (v.vote / length), 0).toFixed(1) : 'Chưa có đánh giá!';
    work.users = work.users.map((u) => u.name);
    work.expires = `${work.expires} ${moment().format('DD/MM')} đến ${work.expires} ${moment().add(1, 'days').format('DD/MM')}`;
    work.day = DAY_IN_WEEK_VI[DAY_IN_WEEK_EN.indexOf(moment(work.date).format('ddd'))];
    // eslint-disable-next-line prefer-destructuring
    work.date = work.date.split('T')[0].split('-').reverse().join('/');
    return work;
  });
}
