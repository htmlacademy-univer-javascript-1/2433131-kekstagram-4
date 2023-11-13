import {nPosts, messages, names} from './constants.js';
import {getArrayNoRepeat} from './getArrayNoRepeat.js';
import {getArrayWithRepeat} from './getArrayWithRepeat.js';

const getCommentsArray = function(n){
  const array = [];
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
    array[i] = comment;
  }
  return array;
};

const getPostsCommentsArray = function (n){
  const array = [];
  const nComments = getArrayWithRepeat(0, 30, n, 'nComments');
  for (let i = 0; i < n; i++){
    array[i] = getCommentsArray(nComments[i]);
  }
  return array;
};

const getPosts = function (n){
  const array = [];
  const idArray = getArrayNoRepeat(1, nPosts, 'Id');
  const urlArray = getArrayNoRepeat(1, nPosts, 'Url');
  const descriprionArray = getArrayNoRepeat(0, nPosts, 'Description');
  const likesArray = getArrayWithRepeat(15, 200, nPosts, 'Likes');
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

export {getPosts};
