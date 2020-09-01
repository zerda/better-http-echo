import http from 'k6/http';
import { sleep } from 'k6';
import { randomItem, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const prefixes = ['/api/v1/', '/api/v2/'];
const resources = ['cats', 'dogs', 'animals', 'ants', 'hawks', 'red-pandas'];
const statusCodes = [200, 201, 204, 301, 302, 400, 401, 403, 404, 500, 502, 503, 504];

export default function () {
    const delay = Math.random() > 0.5 ? randomIntBetween(1, 20000) : 0;
    const method = Math.random() < 0.4 ? randomItem(methods) : 'GET';
    const prefix = randomItem(prefixes);
    const resource = randomItem(resources);
    const status = Math.random() < 0.3 ? randomItem(statusCodes) : 200;
    http.request(method, `http://localhost:3000${prefix}${resource}?delay=${delay}&status=${status}`);
}