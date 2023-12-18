const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

function hideMessage () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

function onBodyClick (event) {
  const container = document.querySelector('.success__inner') || document.querySelector('.error__inner');
  if (event.target !== container) {
    hideMessage();
  }
}

function onDocumentKeydown (event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    hideMessage();
  }
}

const showMessage = function (messageElement, closeButtonClass) {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = function () {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = function () {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
