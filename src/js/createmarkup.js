import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'

import { refs } from "./refs"

export function renderingMarkup(items) {
  const markup = items.map(
    ({
      downloads,
      largeImageURL,
      likes,
      tags,
      views,
      comments,
      webformatURL,
    }) => `
    <div class="photo-card">
    <a href="${largeImageURL}">
    <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </p>
    </div>
    </a>
  </div>
    `
  ).join('')
  refs.gallery.insertAdjacentHTML('beforeend',markup)
  new simpleLightbox('.gallery a')
}
