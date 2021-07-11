import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 60 },
        { duration: '2m', target: 60 },
        { duration: '1m', target: 120 },
        { duration: '2m', target: 120 },
        { duration: '1m', target: 180 },
        { duration: '2m', target: 180 },
        { duration: '1m', target: 240 },
        { duration: '2m', target: 240 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<50'], // 99% of requests must complete below 50ms
    },
};

const BASE_URL = 'https://mwkwon-service.kro.kr/';

export default function () {

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let pathsRes = http.get(`${BASE_URL}/paths/?source=1&target=23`, params);

    check(pathsRes, {
        'path in successfully': (resp) => resp.status === 200,
        'correct distance' : (resp) => resp.json('distance') === 100
    });
    sleep(1);
};
