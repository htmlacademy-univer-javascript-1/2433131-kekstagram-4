import { HASHTAG_LENGTH, HASHTAGS_COUNT, DESCRIPTION_LENGTH } from './data.js';

const validateUploadImageTagsLength = (value) => {
  const tags = value.trim().split(' ');
  return tags.length <= HASHTAGS_COUNT;
};

const validateUploadImageTagsUnique = (value) => {
  const tags = value.trim().split(' ');
  const normalizedTags = new Set(tags.map((tag) => tag.toLowerCase()));
  return normalizedTags.size === tags.length;
};

const validateUploadImageEveryTag = (value) => {
  const tags = value.trim().split(' ');
  if(tags.length === 1 && tags[0] === '') {
    return true;
  }
  return tags.every((tag) => /^#[a-zа-яёA-Z0-9]{1,19}$/i.test(tag) && tag.length <= HASHTAG_LENGTH);
};

const validateUploadImageComment = (value) => value.length <= DESCRIPTION_LENGTH;

const tagsValidators = [
  {
    validator: validateUploadImageTagsLength,
    message: 'Не более 5 хештегов!'
  },
  {
    validator: validateUploadImageTagsUnique,
    message: 'Хештеги должны быть уникальными!'
  },
  {
    validator: validateUploadImageEveryTag,
    message: 'Хештег должны начинаться с # и содержать только цифры и буквы!'
  }
];

const addUploadImageTagsValidators = (pristine, input) => {
  tagsValidators.map((tagValidator, index) => {
    pristine.addValidator(
      input,
      tagValidator.validator,
      tagValidator.message,
      index,
      true
    );
  });
};

const addUploadImageDescriptionValidators = (pristine, input) => {
  pristine.addValidator(
    input,
    validateUploadImageComment,
    'Описание не более 140 символов!',
    1,
    true
  );
};

export {addUploadImageTagsValidators, addUploadImageDescriptionValidators};
