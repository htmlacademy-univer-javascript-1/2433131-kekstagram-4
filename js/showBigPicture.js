const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = document.querySelector('.social__comment-count');
const commentListElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = function ({avatar, name, message}) {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = function (comments) {
  commentListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(createComment(comment));
  });
  commentListElement.append(fragment);
};

const hideBigPicture = function () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = function () {
  hideBigPicture();
};

const renderPictureDetails = function ({url, description, likes}) {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = function (data) {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPictureDetails(data);
  renderComments(data.comments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showBigPicture };
