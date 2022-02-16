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
}

refs.form.addEventListener('submit', onSubmitBtn);

const loadbildsApi = new FetchBildsAPI();

let modalGallery = new SimpleLightbox('.gallery a', {
  caption: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    observer.unobserve(entries[0].target);
    loadBilds();
  }
};

const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 1,
});

function onSubmitBtn(e) {
  e.preventDefault();
  
  const inputText = e.currentTarget.elements.searchQuery.value;

  if (!inputText.trim()) {
    return Notiflix.Notify.warning('Oops, enter your request');
  }

  if (inputText) {
    loadbildsApi.searchQuery = inputText;
    loadbildsApi.resetPage();
    refs.gallery.innerHTML = '';
     loadBilds();  
  }
}

function loadBilds() {
  loadbildsApi.getBilds()
      .then(renderGallery)
      .catch(error => {
        console.log(error);
      });
}

function renderGallery(data) {
  if (data.data.totalHits === 0) {
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

  if (data.data.totalHits !== 0 && data.data.hits.length === 0) {
    return Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
  }

  refs.gallery.insertAdjacentHTML('beforeend', markup(data.data.hits));

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

  observer.observe(refs.gallery.lastElementChild);
}


  


