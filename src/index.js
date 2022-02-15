import './css/styles.css';
import markup from './js/markup';
import FetchBildsAPI from './js/service-api';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    inputForm: document.querySelector('input'),
    submitBtn: document.querySelector('button[type=submit]'),
    gallery: document.querySelector('.gallery'),
}

refs.submitBtn.addEventListener('submit', onSubmitBtn);
const loadbildsApi = new FetchBildsAPI();


function onSubmitBtn(e) {
  e.preventDefault();

  const isFilled = e.currentTarget.elements.searchQuery.value;
  
  if (isFilled) {
    loadService.searchQuery = isFilled;
    loadService.resetPage();
    refs.gallery.innerHTML = '';
    
    loadbildsApi.getBilds()
      .then(renderGallery)
      .catch(error => {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      })
  }

  
  function renderGallery(data) {
    const markupData = markup(data);
    return refs.gallery.insertAdjacentHTML('beforeend', markupData);
  }
}

let modalGallery = new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,    
}); 


