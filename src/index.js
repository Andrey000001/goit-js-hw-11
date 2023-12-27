
import { hideMoreBtn ,onFormSubmit ,onLoadMoreData} from './js/handlers';
import { refs } from './js/refs';
hideMoreBtn()
refs.loadMore.addEventListener('click',onLoadMoreData)
refs.form.addEventListener('submit',onFormSubmit)
