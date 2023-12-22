import { showBigPicture } from './show-big-picture.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const containerElement = document.querySelector('.pictures');

const createPicture = ({ url, description, comments, likes, id}) => {
  const picture = pictureTemplateElement.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.dataset.pictureId = id;

  return picture;
};

const renderPictures = (pictures) => {
  containerElement.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((pict) => {
    const picture = createPicture(pict);
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(pict);
    });
    fragment.append(picture);
  });
  containerElement.append(fragment);
};

const renderGallery = (pictures) => {
  renderPictures(pictures, containerElement);
};

export { renderGallery };
