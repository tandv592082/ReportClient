import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export function isBeforeNow(date) {
  const mDate = moment(date);
  const now = moment();

  return mDate >= now;
}

export const DAY_IN_WEEK_VI = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
export const DAY_IN_WEEK_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function getTodayWork(works) {
  const today = moment().format('YYYY-MM-DD');
  return works.filter((w) => w.date.split('T')[0] === today)[0];
}

export function getVoteOpening(work) {
  if (work) {
    const now = Date.now() - new Date(work.date).getTime();
    const { expires } = work;
    const [hours, minutes] = expires.split(':');
    const expiresInMs = +hours * 60 * 60 * 1000 + +minutes * 60 * 1000 + 24 * 60 * 60 * 1000;
    return now - expiresInMs;
  }
  return null;
}

export function getCurrentWeekNumber() {
  return moment(moment(), 'MMDDYYYY').isoWeek();
}

export function getStartEndWeek() {
  const startWeek = moment().startOf('isoWeek').format('DD/MM/YYYY'); // false
  const endWeek = moment().endOf('isoWeek').format('DD/MM/YYYY');
  return [startWeek, endWeek];
}
