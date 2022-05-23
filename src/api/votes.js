import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export function createVote(data) {
  return request({
    url: '/v1/votes',
    method: 'post',
    data,
  });
}
