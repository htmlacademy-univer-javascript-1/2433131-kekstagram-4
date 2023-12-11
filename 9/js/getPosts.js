import {messages, names} from './data.js';
import {getArrayNoRepeat} from './getArrayNoRepeat.js';
import {getArrayWithRepeat} from './getArrayWithRepeat.js';

const getCommentsArray = function(n){
  const comments = [];
  const comIdArray = getArrayNoRepeat(1, n, 'IdCom');
  const comAvatarArray = getArrayWithRepeat(1, 6, n, 'Avatar');
  const comMassageArray = getArrayWithRepeat(1, messages.length - 1, n, 'Message');
  const comNameArray = getArrayWithRepeat(1, names.length - 1, n, 'Name');
  for (let i = 0; i < n; i++){
    const comment = {
      'id': comIdArray[i],
      'avatar': comAvatarArray[i],
      'message': comMassageArray[i],
      'name': comNameArray[i],
    };
    comments[i] = comment;
  }
  return comments;
};

const getPostsCommentsArray = function (count){
  const array = [];
  const commentsCount = getArrayWithRepeat(0, 30, count, 'nComments');
  for (let i = 0; i < count; i++){
    array[i] = getCommentsArray(commentsCount[i]);
  }
  return array;
};

const getPosts = function (postsCount){
  const posts = [];
  const idArray = getArrayNoRepeat(1, postsCount, 'Id');
  const urlArray = getArrayNoRepeat(1, postsCount, 'Url');
  const descriprionArray = getArrayNoRepeat(0, postsCount, 'Description');
  const likesArray = getArrayWithRepeat(15, 200, postsCount, 'Likes');
  const commentsArray = getPostsCommentsArray(postsCount);
  for (let i = 0; i < postsCount; i++){
    const post = {
      'id': idArray[i],
      'url': urlArray[i],
      'description': descriprionArray[i],
      'likes': likesArray[i],
      'comments': commentsArray[i],
    };
    posts[i] = post;
  }
  return posts;
};

export {getPosts};
