const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.picture');

const createPicture = function ({ url, description, comments, likes }) {
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;

  return picture;
};

const renderPictures = function (pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((pict) => {
    const picture = createPicture(pict);
    fragment.append(picture);
  });
  container.append(fragment);
};

export {renderPictures};
