const COMMENTS_PER_ONE = 5;

const HASHTAG_LENGTH = 20;
const HASHTAGS_COUNT = 5;
const DESCRIPTION_LENGTH = 140;

const Effects = {
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

const URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_IMAGES: 'Не удалось загрузить данные. Обновите страницу.',
  POST_NEW_IMAGE: 'Не удалось отправить форму. Повторите попытку.',
};

const ALERT_SHOW_TIME = 5000;

const PICTURES_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю..',
};

export { COMMENTS_PER_ONE };
export { HASHTAG_LENGTH, HASHTAGS_COUNT, DESCRIPTION_LENGTH, Effects };
export { URL, Route, Method, ErrorText, ALERT_SHOW_TIME };
export { PICTURES_COUNT, Filters, FILE_TYPES, SubmitButtonText };
