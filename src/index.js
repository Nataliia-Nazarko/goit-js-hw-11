import './css/styles.css';
import './js/markup';
import FetchBildsAPI from './js/service-api';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    inputForm: document.querySelector('input'),
    submitBtn: document.querySelector('button[type=submit]'),
    gallery: document.querySelector('.gallery'),
}

refs.submitBtn.addEventListener('click', onSubmitBtn);

function onSubmitBtn(e) {
    e.preventDefault();

    const inputText = refs.inputForm.value.trim();
    
    const bildsApi = new FetchBildsAPI();

    if (inputText) {
        bildsApi(inputText)
            .then(renderGallery)
            .catch(error => {
                return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            })
    }


/* function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
} */
 
}


