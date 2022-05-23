import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/v1/auth/login',
    method: 'post',
    data,
  });
}

export function logout() {
  return request({
    url: '/v1/auth/logout',
    method: 'post',
  });
}

export function createUser(data) {
  return request({
    url: '/v1/users',
    method: 'post',
    data,
  });
}

export function getUserInfo(userId) {
  return request({
    url: `/v1/users/${userId}`,
    method: 'get',
  });
}

export function getAllUser() {
  return request({
    url: '/v1/users',
    method: 'get',
  });
}

export function updateUser(userId, data) {
  return request({
    url: `/v1/users/${userId}`,
    method: 'patch',
    data,
  });
}

export function deleteUser(userId) {
  return request({
    url: `/v1/users/${userId}`,
    method: 'delete',
  });
}
