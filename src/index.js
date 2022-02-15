import './css/styles.css';
import markup from './js/markup';
import FetchBildsAPI from './js/service-api';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    form: document.querySelector('.search-form'),
    submitBtn: document.querySelector('button[type=submit]'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

refs.loadMoreBtn.classList.add('is-hidden');
refs.form.addEventListener('submit', onSubmitBtn);

const loadbildsApi = new FetchBildsAPI();

let modalGallery = new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,    
}); 

function onSubmitBtn(e) {
  e.preventDefault();

  const inputText = e.currentTarget.elements.searchQuery.value;
  
  if (inputText) {
    loadbildsApi.searchQuery = inputText;
    loadbildsApi.resetPage();
    refs.gallery.innerHTML = '';
    
    
    loadbildsApi.getBilds()
      .then(renderGallery)
      .catch(error => {
    console.log(error);
  });
  }
}
  
function renderGallery(data) {
   
  if (data.data.totalHits === 0) {
    refs.loadMoreBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    ;
  }
  refs.loadMoreBtn.classList.remove('is-hidden');
   if (data.data.totalHits !== 0 && data.data.hits.length === 0) {
     Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
    ;
   }
  
  
  refs.gallery.insertAdjacentHTML('afterbegin', markup(data.data.hits));

  modalGallery.refresh();

  if (loadbildsApi.pageNumber === 2) {
    Notiflix.Notify.info(`Hooray! We found ${data.data.totalHits} images.`);
  } else {
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2 + 120,
      behavior: 'smooth',
    });
  }
}


/* refs.loadMoreBtn.addEventListener('click', onSubmitBtn); */

