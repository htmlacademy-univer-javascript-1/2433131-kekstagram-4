import { addUploadImageTagsValidators, addUploadImageDescriptionValidators } from './validators.js';
import { effects } from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormInput = uploadForm.querySelector('.img-upload__input');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const exitButton = uploadForm.querySelector('.img-upload__cancel');
const uploadButton = uploadForm.querySelector('.img-upload__submit');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');

const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const desriptionInput = uploadForm.querySelector('.text__description');

const buttonSmaller = uploadForm.querySelector('.scale__control--smaller');
const buttonBigger = uploadForm.querySelector('.scale__control--bigger');
const scallerController = uploadForm.querySelector('.scale__control--value');

const effectsElement = uploadForm.querySelector('.effects');
const effectSliderWrapper = uploadForm.querySelector('.img-upload__effect-level');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevel = uploadForm.querySelector('.effect-level__value');

// const SubmitButtonText = {
//   IDLE: 'Опубликовать',
//   SUBMITTING: 'Отправляю..',
// };

let effect = effects.NONE;

noUiSlider.create(effectSlider, {
  range: {
    min: effects.NONE.min,
    max: effects.NONE.max,
  },
  start: effects.NONE.max,
  step: effects.NONE.step,
  connect: 'lower',
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
}, true);

addUploadImageTagsValidators(pristine, hashtagsInput);
addUploadImageDescriptionValidators(pristine, desriptionInput);

function escapeEvent (event) {
  if(event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    closeUploadModal();
  }
}

uploadFormInput.oninput = function() {
  uploadFormOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escapeEvent);
  desriptionInput.addEventListener('input', setUploadButtonState);
  hashtagsInput.addEventListener('input', setUploadButtonState);
};


const showSlider = () => {
  effectSliderWrapper.classList.remove('hidden');
};

const hideSlider = () => {
  effectSliderWrapper.classList.add('hidden');
};

const updateSliderSettings = () => {
  effectSlider.noUiSlider.updateOptions(
    {
      range: {
        min: effect.min,
        max: effect.max
      },
      step: effect.step,
      start: effect.max
    });

  if (effect === effects.NONE) {
    hideSlider();
  } else {
    showSlider();
  }
};

function closeUploadModal () {
  uploadFormOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFormInput.value = '';

  uploadForm.reset();
  pristine.reset();
  effect = effects.NONE;
  updateSliderSettings();

  document.removeEventListener('keydown', escapeEvent);
  desriptionInput.removeEventListener('input', setUploadButtonState);
  hashtagsInput.removeEventListener('input', setUploadButtonState);
}

exitButton.onclick = closeUploadModal;

desriptionInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

hashtagsInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

function setUploadButtonState () {
  if(!pristine.validate()) {
    uploadButton.disabled = true;
  } else {
    uploadButton.disabled = false;
  }
}

buttonSmaller.onclick = function () {
  let scallerValue = parseInt(scallerController.value, 10);
  scallerController.value = `${scallerValue - 25  }%`;
  scallerValue -= 25;
  if(scallerValue < 25) {
    scallerController.value = '25%';
    scallerValue = 25;
  }
  imagePreview.style.transform = `scale(${scallerValue / 100})`;
};

buttonBigger.onclick = function () {
  let scallerValue = parseInt(scallerController.value, 10);
  scallerController.value = `${scallerValue + 25  }%`;
  scallerValue += 25;
  if(scallerValue> 100) {
    scallerController.value = '100%';
    scallerValue = 100;
  }
  imagePreview.style.transform = `scale(${scallerValue / 100})`;
};

const onChangeEffect = (event) => {
  if (!event.target.classList.contains('effects__radio')) {
    return;
  }

  const effectName = `${event.target.value}`.toUpperCase();
  effect = effects[effectName];
  imagePreview.className = `effects__preview--${effect.name}`;
  updateSliderSettings();
};

const onUpdateSlider = () => {
  const sliderValue = effectSlider.noUiSlider.get();

  if (effect === effects.NONE) {
    imagePreview.style.filter = effects.NONE.style;
  } else {
    imagePreview.style.filter = `${effect.style}(${sliderValue}${effect.unit})`;
  }

  effectLevel.value = sliderValue;
};

effectsElement.addEventListener('change', onChangeEffect);
effectSlider.noUiSlider.on('update', onUpdateSlider);

uploadFormInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;
  }
});

// const toggleSubmitButton = function (isDisabled) {
//   uploadButton.disabled = isDisabled;
//   uploadButton.textContent = isDisabled
//     ? SubmitButtonText.SUBMITTING
//     : SubmitButtonText.IDLE;
// };

const setOnFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      // toggleSubmitButton(true);
      await callback(new FormData(uploadForm));
      // toggleSubmitButton();
    }
  });
};

export { setOnFormSubmit, closeUploadModal };
