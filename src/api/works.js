import request from '@/utils/request';

export function createWork(data) {
  return request({
    url: '/v1/works',
    method: 'post',
    data,
  });
}

export function getWorkInfo(workId) {
  return request({
    url: `/v1/works/${workId}`,
    method: 'get',
  });
}

export function getAllWork() {
  return request({
    url: '/v1/works',
    method: 'get',
  });
}

export function updateWork(workId) {
  return request({
    url: `/v1/works/${workId}`,
    method: 'patch',
  });
}

export function deleteWork(workId) {
  return request({
    url: `/v1/works/${workId}`,
    method: 'delete',
  });
}
