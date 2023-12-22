const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
};

const showMessage = (messageElement, closeButtonClass) => {
  const message = messageElement.cloneNode(true);
  message.querySelector(closeButtonClass).addEventListener('click', hideMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', onBodyClick);
  bodyElement.append(messageElement);
};

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

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
