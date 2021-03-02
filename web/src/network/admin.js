import { adminRequest } from './request';

export function publishBlog(data) {
    return adminRequest({
        url: '/add',
        method: 'POST',
        data
    })
}

export function login(data) {
    return adminRequest({
        url: '/login',
        method: 'POST',
        data
    })
}