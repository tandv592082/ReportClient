const votes = [];

// eslint-disable-next-line max-len
const avgVotes = votes.length ? votes.reduce((avg, v, _, { length }) => avg + (v.vote / length), 0) : 'Chưa có đánh giá!';
console.log(avgVotes);
