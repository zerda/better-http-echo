import http from 'k6/http';
import { randomItem, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';

const methods = {
    'GET': 80,
    'POST': 10,
    'PUT': 9,
    'DELETE': 0.5,
    'PATCH': 0.5
};
const prefixes = {
    '/api/v1/': 4,
    '/api/v2/': 1
};
const resources = ['cats', 'dogs', 'animals', 'ants', 'hawks', 'red-pandas'];
const statusCodes = {
    200: 80,
    201: 2,
    204: 0.5,
    301: 0.5,
    302: 0.5,
    400: 3,
    401: 0.5,
    403: 0.5,
    404: 0.5,
    500: 2,
    502: 0.5,
    503: 0.5,
    504: 0.5
};
const timeRanges = {
    'lv1': { chance: 50, min: 5, max: 1000 },
    'lv2': { chance: 20, min: 1000, max: 2500 },
    'lv3': { chance: 20, min: 2500, max: 10000 },
    'lv4': { chance: 10, min: 10000, max: 20000 }
}
const timeLevels = Object.entries(timeRanges)
    .reduce((accum, [k, v]) => {
        accum[k] = v.chance;
        return accum;
    }, {});

function randomWeightedItem(itemWithChances) {
    let chances = Object.values(itemWithChances);
    const sum = chances.reduce((acc, el) => acc + el, 0);
    let acc = 0;
    chances = chances.map(el => (acc = el + acc));
    const rand = Math.random() * sum;

    const items = Object.keys(itemWithChances);
    return items[chances.findIndex(el => el > rand)];
}

export default function () {
    const level = randomWeightedItem(timeLevels);
    const delay = randomIntBetween(timeRanges[level].min, timeRanges[level].max);

    const method = randomWeightedItem(methods);
    const prefix = randomWeightedItem(prefixes);
    const resource = randomItem(resources);
    const status = randomWeightedItem(statusCodes);

    http.request(method, `http://localhost:8080${prefix}${resource}?delay=${delay}&status=${status}`);
}