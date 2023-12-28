import simpleLightbox from 'simplelightbox';
import { fetchRequest } from './fetchimages';
import { refs } from './refs';
import { Loading, Notify } from 'notiflix';
import { renderingMarkup } from './createmarkup';

export const hideMoreBtn = () => {
  refs.loadMore.style.display = 'none';
};
const showMoreBtn = () => {
  refs.loadMore.style.display = 'block';
};

let page = 1;
const maxPerPage = 40;

export async function onFormSubmit(e) {
  e.preventDefault();
  let request = refs.form.searchQuery.value.trim();
  clearMarkup();
  await fetchRequest(request)
    .then(data => {
      const hits = data.hits;
      const totalHits = data.totalHits;

      if (request === '') {
        clearMarkup();
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Всего нашли ${totalHits}`);
        showMoreBtn();
        renderingMarkup(hits);
      }
    })
    .catch(e => {
      console.log(e);
    });
}

export async function onLoadMoreData(e) {
  e.preventDefault();
  let requestLoadMore = refs.form.searchQuery.value.trim();
  await fetchRequest(requestLoadMore, (page += 1)).then(data => {
    const totalHits = data.totalHits;
    const delenie = Math.floor(data.totalHits / maxPerPage);
    if (page === delenie) {
      Notify.info('Больше фото нет');
      hideMoreBtn();
    }
    Notify.success(`Всего фото ${totalHits}`);
    renderingMarkup(data.hits);
  });
}

function clearMarkup() {
  hideMoreBtn();
  refs.gallery.innerHTML = '';
  page = 1;
}
