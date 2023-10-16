const nPosts = 25;
const discriptions = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8', 'Описание 9', 'Описание 10', 'Описание 11', 'Описание 12', 'Описание 13', 'Описание 14', 'Описание 15', 'Описание 16', 'Описание 17', 'Описание 18', 'Описание 19', 'Описание 20', 'Описание 21', 'Описание 22', 'Описание 23', 'Описание 24', 'Описание 25'];
const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const names = ['Имя 1', 'Имя 2', 'Имя 3', 'Имя 4', 'Имя 5', 'Имя 6', 'Имя 7', 'Имя 8', 'Имя 9', 'Имя 10'];

const getIdArray = function (min, max){
  const array1 = [];
  for (let i = min; i <= max; i++){
    array1[i - 1] = i;
  }
  const array2 = [];
  while (array1.length) {
    const position = Math.random()*array1.length;
    const element = array1.splice(position, 1)[0];
    array2.push(element);
  }
  return array2;
};

const getUrlArray = function (min, max){
  const array1 = [];
  for (let i = min; i <= max; i++){
    array1[i - 1] = i;
  }
  const array2 = [];
  while (array1.length) {
    const position = Math.random()*array1.length;
    const element = array1.splice(position, 1)[0];
    array2.push(`photos/${element}.jpg`);
  }
  return array2;
};

const getDescriptionArray = function (max){
  const array1 = [];
  for (let i = 0; i < max; i++){
    array1[i] = i;
  }
  const array2 = [];
  while (array1.length) {
    const position = Math.random()*array1.length;
    const element = array1.splice(position, 1)[0];
    array2.push(discriptions[element]);
  }
  return array2;
};

const getLikesArray = function (min, max, n){
  const array = [];
  for (let i = 0; i < n; i++){
    array[i] = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return array;
};

const getNCommentsArray = function(min, max, n){
  const array = [];
  for (let i = 0; i < n; i++){
    array[i] = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return array;
};

const getIdComArray = function(min, max){
  const array1 = [];
  for (let i = min; i <= max; i++){
    array1[i - 1] = i;
  }
  const array2 = [];
  while (array1.length) {
    const position = Math.random()*array1.length;
    const element = array1.splice(position, 1)[0];
    array2.push(element);
  }
  return array2;
};

const getAvatarArray = function(min, max, n){
  const array = [];
  for (let i = 0; i < n; i++){
    const element = Math.floor(Math.random() * (max - min + 1) + min);
    array[i] = `img/avatar-${element}.svgelement`;
  }
  return array;
};

const getMessageArray = function(min, max, n){
  const array = [];
  for (let i = 0; i < n; i++){
    const element = Math.floor(Math.random() * (max - min + 1) + min);
    array[i] = messages[element];
  }
  return array;
};

const getNameArray = function(min, max, n){
  const array = [];
  for (let i = 0; i < n; i++){
    const element = Math.floor(Math.random() * (max - min + 1) + min);
    array[i] = names[element];
  }
  return array;
};

const getCommentsArray = function(n){
  const array = [];
  const comIdArray = getIdComArray(1, n);
  const comAvatarArray = getAvatarArray(1, 6, n);
  const comMassageArray = getMessageArray(1, messages.length, n);
  const comNameArray = getNameArray(1, names.length, n);
  for (let i = 0; i < n; i++){
    const comment = {
      'id': comIdArray[i],
      'avatar': comAvatarArray[i],
      'message': comMassageArray[i],
      'name': comNameArray[i],
    };
    array[i] = comment;
  }
  return array;
};

const getPostsCommentsArray = function (n){
  const array = [];
  const nComments = getNCommentsArray(0, 30, n);
  for (let i = 0; i < n; i++){
    array[i] = getCommentsArray(nComments[i]);
  }
  return array;
};

const getPosts = function (n){
  const array = [];
  const idArray = getIdArray(1, nPosts);
  const urlArray = getUrlArray(1, nPosts);
  const descriprionArray = getDescriptionArray(nPosts);
  const likesArray = getLikesArray(15, 200, nPosts);
  const commentsArray = getPostsCommentsArray(nPosts);
  for (let i = 0; i < n; i++){
    const post = {
      'id': idArray[i],
      'url': urlArray[i],
      'description': descriprionArray[i],
      'likes': likesArray[i],
      'comments': commentsArray[i],
    };
    array[i] = post;
  }
  return array;
};

getPosts(nPosts);
