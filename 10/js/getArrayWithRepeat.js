import {messages, names} from './data.js';

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

export {getArrayWithRepeat};
