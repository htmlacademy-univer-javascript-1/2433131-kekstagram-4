import { addUploadImageTagsValidators, addUploadImageDescriptionValidators } from './validators.js';
import { Effects, FILE_TYPES, SubmitButtonText } from './data.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadFormOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const exitButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const imagePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectsPreviewsElement = document.querySelectorAll('.effects__preview');

const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');

const buttonSmallerElement = uploadFormElement.querySelector('.scale__control--smaller');
const buttonBiggerElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleControllerElement = uploadFormElement.querySelector('.scale__control--value');

const effectsElement = uploadFormElement.querySelector('.effects');
const effectSliderWrapperElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectSliderElement = uploadFormElement.querySelector('.effect-level__slider');
const effectLevelElement = uploadFormElement.querySelector('.effect-level__value');

let effect = Effects.NONE;

noUiSlider.create(effectSliderElement, {
  range: {
    min: Effects.NONE.min,
    max: Effects.NONE.max,
  },
  start: Effects.NONE.max,
  step: Effects.NONE.step,
  connect: 'lower',
});

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
}, true);

addUploadImageTagsValidators(pristine, hashtagsInputElement);
addUploadImageDescriptionValidators(pristine, descriptionInputElement);

const setUploadButtonState = () => {
  uploadButtonElement.disabled = !pristine.validate();
};

const showSlider = () => {
  effectSliderWrapperElement.classList.remove('hidden');
};

const hideSlider = () => {
  effectSliderWrapperElement.classList.add('hidden');
};

const updateSliderSettings = () => {
  effectSliderElement.noUiSlider.updateOptions(
    {
      range: {
        min: effect.min,
        max: effect.max
      },
      step: effect.step,
      start: effect.max
    });

  if (effect === Effects.NONE) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onPressEscapeInInput = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

descriptionInputElement.addEventListener('keydown', onPressEscapeInInput);
hashtagsInputElement.addEventListener('keydown', onPressEscapeInInput);

const onChangeEffect = (event) => {
  if (!event.target.classList.contains('effects__radio')) {
    return;
  }

  const effectName = `${event.target.value}`.toUpperCase();
  effect = Effects[effectName];
  imagePreviewElement.className = `effects__preview--${effect.name}`;
  updateSliderSettings();
};

const onUpdateSlider = () => {
  const sliderValue = effectSliderElement.noUiSlider.get();

  if (effect === Effects.NONE) {
    imagePreviewElement.style.filter = Effects.NONE.style;
  } else {
    imagePreviewElement.style.filter = `${effect.style}(${sliderValue}${effect.unit})`;
  }

  effectLevelElement.value = sliderValue;
};

effectsElement.addEventListener('change', onChangeEffect);
effectSliderElement.noUiSlider.on('update', onUpdateSlider);

const closeUploadModal = () => {
  uploadFormOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFormInputElement.value = '';

  uploadFormElement.reset();
  pristine.reset();
  effect = Effects.NONE;
  updateSliderSettings();

  document.removeEventListener('keydown', onPressEscape);
  descriptionInputElement.removeEventListener('input', setUploadButtonState);
  hashtagsInputElement.removeEventListener('input', setUploadButtonState);
  descriptionInputElement.removeEventListener('keydown', onPressEscapeInInput);
  hashtagsInputElement.removeEventListener('keydown', onPressEscapeInInput);
  effectsElement.removeEventListener('change', onChangeEffect);
};

function onPressEscape (event) {
  if(event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    closeUploadModal();
  }
}

uploadFormInputElement.oninput = () => {
  uploadFormOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPressEscape);
  descriptionInputElement.addEventListener('input', setUploadButtonState);
  hashtagsInputElement.addEventListener('input', setUploadButtonState);
};

exitButtonElement.onclick = closeUploadModal;

const getScaleButtonOnClick = (scaleAlphaValue) => () => {
  let scaleValue = parseInt(scaleControllerElement.value, 10);
  scaleControllerElement.value = `${scaleValue + scaleAlphaValue }%`;
  scaleValue += scaleAlphaValue;
  if (scaleValue > 100) {
    scaleControllerElement.value = '100%';
    scaleValue = 100;
  }
  if (scaleValue < 25) {
    scaleControllerElement.value = '25%';
    scaleValue = 25;
  }
  imagePreviewElement.style.transform = `scale(${scaleValue / 100})`;
};

buttonSmallerElement.onclick = getScaleButtonOnClick(-25);
buttonBiggerElement.onclick = getScaleButtonOnClick(25);

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

uploadFormInputElement.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file && isValidType(file)) {
    const imageUrl = URL.createObjectURL(file);
    imagePreviewElement.src = imageUrl;
    effectsPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreviewElement.src}'`;
    });
  }
});

const setSubmitButtonFetching = (isDisabled) => {
  uploadButtonElement.disabled = isDisabled;
  uploadButtonElement.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;
};

const setOnFormSubmit = () => {
  uploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const data = new FormData(uploadFormElement);
      setSubmitButtonFetching(true);
      sendData(data).then(() => {
        closeUploadModal();
        showSuccessMessage();
      }, () => {
        closeUploadModal();
        showErrorMessage();
      })
        .finally(setSubmitButtonFetching);
    }
  });
};

export { setOnFormSubmit };
