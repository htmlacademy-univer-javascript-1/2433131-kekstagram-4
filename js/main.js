import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { setOnFormSubmit, closeUploadModal } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { showAlert } from './alert.js';

setOnFormSubmit(async (data) => {
  sendData(data).then(() => {
    closeUploadModal();
    showSuccessMessage();
  }, () => {
    closeUploadModal();
    showErrorMessage();
  });
});

getData().then((pictures) => {
  renderGallery(pictures);
}, (error) => {
  showAlert(error.message);
});
