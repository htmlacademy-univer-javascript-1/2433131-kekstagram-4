import {postsCount} from './data.js';
import { renderGallery } from './gallery.js';
import {getPosts} from './getPosts.js';

renderGallery(getPosts(postsCount));
