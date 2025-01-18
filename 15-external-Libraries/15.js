import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import isSatSun from './15f.js';

let today = dayjs();

// 15a
console.log(`15a output: ${today.format('MMMM D')}`);

// 15b
let oneMonth = today.add(1, 'month');
console.log(`One month from now: ${oneMonth.format('MMMM D')}`);

// 15c
oneMonth = today.subtract(1, 'month');
console.log(`One month ago from now: ${oneMonth.format('MMMM D')}`);

// 15d
let dayOfTheWeek = today.format('dddd');
console.log(dayOfTheWeek);

console.log(isSatSun(dayOfTheWeek));