const postsCount = 25;
const commentsPerOne = 5;
const descriptions = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8', 'Описание 9', 'Описание 10', 'Описание 11', 'Описание 12', 'Описание 13', 'Описание 14', 'Описание 15', 'Описание 16', 'Описание 17', 'Описание 18', 'Описание 19', 'Описание 20', 'Описание 21', 'Описание 22', 'Описание 23', 'Описание 24', 'Описание 25'];
const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const names = ['Имя 1', 'Имя 2', 'Имя 3', 'Имя 4', 'Имя 5', 'Имя 6', 'Имя 7', 'Имя 8', 'Имя 9', 'Имя 10'];

const hashtagLength = 20;
const hashtagsCount = 5;
const descriptionLength = 140;

const effects = {
  NONE: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  CHROME: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  SEPIA: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  MARVIN: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  PHOBOS: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  HEAT: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

export {postsCount, descriptions, commentsPerOne, messages, names, hashtagLength, hashtagsCount, descriptionLength, effects};
