import { descriptions, messages, names } from './data.js';
import { AlertShowTime } from './data.js';

const getArrayNoRepeat = function (min, max, flag){
  const array1 = [];
  if (flag === 'Description'){
    for (let i = min; i < max; i++){
      array1[i] = i;
    }
  }
  else {
    for (let i = min; i <= max; i++){
      array1[i - 1] = i;
    }
  }
  const array2 = [];
  while (array1.length) {
    const position = Math.random()*array1.length;
    const element = array1.splice(position, 1)[0];
    switch (flag) {
      case 'Id':
        array2.push(element);
        break;
      case 'Url':
        array2.push(`photos/${element}.jpg`);
        break;
      case 'Description':
        array2.push(descriptions[element]);
        break;
      case  'IdCom':
        array2.push(element);
        break;
    }
  }
  return array2;
};

const getArrayWithRepeat = function (min, max, n, flag){
  const array = [];
  for (let i = 0; i < n; i++){
    const element = Math.floor(Math.random() * (max - min + 1) + min);
    switch (flag) {
      case 'Likes':
        array[i] = element;
        break;
      case 'nComments':
        array[i] = element;
        break;
      case 'Avatar':
        array[i] = `img/avatar-${element}.svg`;
        break;
      case 'Message':
        array[i] = messages[element];
        break;
      case 'Name':
        array[i] = names[element];
        break;
    }
  }
  return array;
};

const showAlert = function (message) {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append (alert);

  setTimeout(() => {
    alert.remove();
  }, AlertShowTime);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getArrayNoRepeat, getArrayWithRepeat };
export { showAlert };
export { debounce };
