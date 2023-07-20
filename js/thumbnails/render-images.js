import { renderBigPicture } from './render-big-picture.js';
import { getData } from '../server/server.js';

const SERVER_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();


const createPicture = (post) => {
  const newPicture = template.cloneNode(true);
  const img = newPicture.querySelector('.picture__img');
  img.src = post.url;
  img.alt = post.description;
  newPicture.querySelector('.picture__likes').textContent = post.likes;
  newPicture.querySelector('.picture__comments').textContent = post.comments.length;
  newPicture.addEventListener('click', (event) => {
    event.preventDefault();
    renderBigPicture(post);
  });
  fragment.append(newPicture);
};

const renderImagesFromServer = (posts) => {
  posts.forEach((post) => createPicture(post));
  pictureContainer.append(fragment);
};

const renderImages = () => {
  getData(SERVER_URL, renderImagesFromServer);
};

export { renderImages };