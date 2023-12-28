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
        <b class="info-bold">Likes</b>
        <span class="info-span">${likes}</span>
      </p>
      <p class="info-item">
        <b class="info-bold">Views</b>
        <span class="info-span">${views}</span>
      </p>
      <p class="info-item">
        <b class="info-bold">Comments</b>
        <span class="info-span">${comments}</span>
      </p>
      <p class="info-item">
        <b class="info-bold">Downloads</b>
        <span class="info-span">${downloads}</span>
      </p>
    </div>
    </a>
  </div>
    `
  ).join('')
  refs.gallery.insertAdjacentHTML('beforeend',markup)
  new simpleLightbox('.gallery a')
}
