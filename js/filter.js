import { PICTURES_COUNT, Filters } from './data.js';

const filterElement = document.querySelector('.img-filters');

let currentFilter = Filters.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (firstPicture, secondPicture) =>
  secondPicture.comments.length - firstPicture.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filters.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (event) => {
    if (!event.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = event.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFilteredPictures());
  });
};

const init = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

export { init, getFilteredPictures };
