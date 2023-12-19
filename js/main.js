import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { setOnFormSubmit, closeUploadModal } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { showAlert, debounce } from './util.js';
import { init as initFilter, getFilteredPictures } from './filter.js';

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
  const debouncedRenderGallery = debounce(renderGallery);
  initFilter(pictures, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
}, (error) => {
  showAlert(error.message);
});
