import {descriptions} from './data.js';

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

export {getArrayNoRepeat};
