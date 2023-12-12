
import { addUploadImageTagsValidators, addUploadImageDescriptionValidators } from './validators.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormInput = uploadForm.querySelector('.img-upload__input');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const exitButton = uploadForm.querySelector('.img-upload__cancel');
const uploadButton = uploadForm.querySelector('.img-upload__submit');

const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const desriptionInput = uploadForm.querySelector('.text__description');

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

function closeUploadModal () {
  uploadFormOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFormInput.value = '';

  uploadForm.reset();
  pristine.reset();

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
