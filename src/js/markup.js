export default function markup(data) { 
  return data
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
      <div class="photo-card">
      <a class="gallery__item" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>  
        <div class="info">
          <p class="info-item">
            <b>Likes<br /><span class='text'> ${likes}</span></b>
          </p>
          <p class="info-item">
            <b>Views<br /><span class='text'> ${views}</span></b>
          </p>
          <p class="info-item">
            <b>Comments<br /><span class='text'> ${comments}</span></b>
          </p>
          <p class="info-item">
            <b>Downloads<br /><span class='text'> ${downloads}</span></b>
          </p>
        </div>
      </div> 
    `;
    })
    .join('');   
}


 