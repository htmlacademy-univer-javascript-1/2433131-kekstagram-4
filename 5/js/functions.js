const isSmaller = function (str, maxLen) {
  return str.length <= maxLen;
};

const isPalindrome = function (str) {
  const str1 = str.replaceAll(' ', '').toLowerCase();
  const str2 = str1.split('').reverse().join('');
  return str1 === str2;
};

const getNumbers = function (str) {
  const result = parseInt(str.toString().replace(/[^\d]/g, ''), 10);
  return result;
};


isSmaller('проверяемая строка', 20);
isSmaller('проверяемая строка', 18);
isSmaller('проверяемая строка', 10);

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');

getNumbers('2023 год');
getNumbers('ECMAScript 2022');
getNumbers('1 кефир, 0.5 батона');
getNumbers('агент 007');
getNumbers('а я томат');

getNumbers(2023);
getNumbers(-1);
getNumbers(1.5);

const getMinutes = function (number) {
  const result = number.split(':');
  return parseInt(result[0], 10) * 60 + parseInt(result[1], 10);
} ;

const IsAtWorkingTime = function (start, finish, startConv, duration) {
  start = getMinutes(start);
  finish = getMinutes(finish);
  startConv = getMinutes(startConv);
  const finishConv = startConv + duration;
  return start <= startConv && finishConv <= finish;
};

IsAtWorkingTime('08:00', '17:30', '14:00', 90);
IsAtWorkingTime('8:0', '10:0', '8:0', 120);
IsAtWorkingTime('08:00', '14:30', '14:00', 90);
IsAtWorkingTime('14:00', '17:30', '08:0', 90);
IsAtWorkingTime('8:00', '17:30', '08:00', 900);
