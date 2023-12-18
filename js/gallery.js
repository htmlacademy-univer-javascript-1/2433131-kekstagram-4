import { showBigPicture } from './showBigPicture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createPicture = function ({ url, description, comments, likes, id}) {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.dataset.pictureId = id;

  return picture;
};

const renderPictures = function (pictures) {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((pict) => {
    const picture = createPicture(pict);
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(pict);
    });
    fragment.append(picture);
  });
  container.append(fragment);
};

const renderGallery = function (pictures) {
  renderPictures(pictures, container);
};

export { renderGallery };
