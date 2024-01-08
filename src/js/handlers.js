import { fetchRequest } from './fetchimages';
import { refs } from './refs';
import { Notify } from 'notiflix';
import { renderingMarkup } from './createmarkup';

export const hideMoreBtn = () => (refs.loadMore.style.display = 'none');
const showMoreBtn = () => (refs.loadMore.style.display = 'block');

let page = 1;
const maxPerPage = 40;

export async function onFormSubmit(e) {
  e.preventDefault();
  let request = refs.form.searchQuery.value.trim();
  clearMarkup();
  try {
    const data = await fetchRequest(request);
    const hits = data.hits;
    const totalHits = data.totalHits;
    if (request === '') {
      clearMarkup();
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Total found ${totalHits}`);
      showMoreBtn();
      renderingMarkup(hits);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function onLoadMoreData(e) {
  e.preventDefault();
  let requestLoadMore = refs.form.searchQuery.value.trim();
  try {
    const data = await fetchRequest(requestLoadMore, (page += 1));
    const totalHits = data.totalHits;
    const delenie = Math.ceil(data.totalHits / maxPerPage);
    if (page === delenie) {
      Notify.info('No more photos');
      hideMoreBtn();
    }
    Notify.success(`Total found ${totalHits}`);
    renderingMarkup(data.hits);
  } catch (error) {
    console.error('Error:', error);
  }
}

function clearMarkup() {
  hideMoreBtn();
  refs.gallery.innerHTML = '';
  page = 1;
}
