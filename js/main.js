import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { setOnFormSubmit } from './form.js';
import { showAlert, debounce } from './util.js';
import { init as initFilter, getFilteredPictures } from './filter.js';

getData().then((pictures) => {
  const debouncedRenderGallery = debounce(renderGallery);
  initFilter(pictures, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
}, (error) => {
  showAlert(error.message);
});

setOnFormSubmit();
