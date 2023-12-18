import { hashtagLength, hashtagsCount, descriptionLength } from './data.js';

function validateUploadImageTagsLength (value) {
  const tags = value.trim().split(' ');
  return tags.length <= hashtagsCount;
}

function validateUploadImageTagsUnique (value) {
  const tags = value.trim().split(' ');
  const normilizedTags = new Set(tags.map((tag) => tag.toLowerCase()));
  return normilizedTags.size === tags.length;
}

function validateUploadImageEveryTag (value) {
  const tags = value.trim().split(' ');
  if(tags.length === 1 && tags[0] === '') {
    return true;
  }
  return tags.every((tag) => /^#[a-zа-яёA-Z0-9]{1,19}$/i.test(tag) && tag.length <= hashtagLength);
}

function validateUploadImageComment (value) {
  if(value.length > descriptionLength) {
    return false;
  }

  return true;
}

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

function addUploadImageTagsValidators (pristine, input) {
  tagsValidators.map((tagValidator, index) => {
    pristine.addValidator(
      input,
      tagValidator.validator,
      tagValidator.message,
      index,
      true
    );
  });
}

function addUploadImageDescriptionValidators (pristine, input) {
  pristine.addValidator(
    input,
    validateUploadImageComment,
    'Описание не более 140 символов!',
    1,
    true
  );
}

export {addUploadImageTagsValidators, addUploadImageDescriptionValidators};

