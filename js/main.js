import {nPosts} from './constants.js';
import {getPosts} from './getPosts.js';
import { renderPictures } from './picture.js';

renderPictures(getPosts(nPosts));
