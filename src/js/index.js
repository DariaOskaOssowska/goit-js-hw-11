import { fetchImages } from '../js/fetchImages';
import Notiflix from 'notiflix';
// // Opisany w dokumentacji
// import SimpleLightbox from 'simplelightbox';
// // Dodatkowy import stylów
// import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

let pageNumber = 1;

btnSearch.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  const trimmedValue = input.value.trim();
  console.log(fetchImages(trimmedValue, pageNumber), 'Siemanko fetch');

  fetchImages(trimmedValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImageList(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
    }
  });
});

btnLoadMore.addEventListener('click', () => {
  pageNumber++;
const trimmedValue = input.value.trim();
console.log(fetchImages(trimmedValue, pageNumber), 'Siemanko fetch');

fetchImages(trimmedValue, pageNumber).then(foundData => {
  if (foundData.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    renderImageList(foundData.hits);
    Notiflix.Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
  }
});

});

function renderImageList(images) {
  console.log(images, 'images');
  const markup = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card">
       <img class="photo" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML += markup;
}

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
}
