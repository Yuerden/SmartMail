import {EmailGetter} from './getEmails.js';
// This function will be called when the Load Summaries button is clicked
function loadSummaries() {
  console.log('summaries...');
}

// This function simulates fetching email summaries, replace with your actual
// data fetching logic function fetchEmailSummaries() {}

// This function handles the display of email summaries on the page
// function displayEmailSummaries(summaries) {}

// Event listener for DOMContentLoaded to ensure the DOM is fully loaded before
// trying to access elements
document.addEventListener('DOMContentLoaded', (event) => {
  var emailGetter = new EmailGetter();
  // Get the button by its ID and add an event listener
  var loadButton = document.getElementById('loadButton');
  if (loadButton) {
    loadButton.addEventListener('click', function() {
      chrome.storage.local.get('token', function(result) {
        emailGetter.getEmailList()
      });
    });

  } else {
    console.error('loadButton not found')
  }
  var nextEmailButton = document.getElementById('nextEmail');
  if (nextEmailButton) {
    nextEmailButton.addEventListener('click', function() {
      emailGetter.getNextEmail()
    });
  }
});

/* Carousel JS (Find a way to integrate into load button above)*/
const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentIndex = 0;

/*Initial Email Summary Slide*/
addSlide();

/*Next Email Function*/
function slideNext() {

  currentIndex++;
  addSlide();
  updateSlide();
}

/*Previous Email Function*/
function slidePrev() {
  currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
  updateSlide();
}

/*moves/updates carousel*/
function updateSlide() {
  // const slideWidth = carousel.children[0].offsetWidth;
  // carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  const offset = -currentIndex * 100.6; //This is weird as fuck gotta change later
  carousel.style.transform = `translateX(${offset}%)`;

}

// Function to add a new slide
function addSlide() {
  const slide = document.createElement('div');
  slide.classList.add('slide');
  slide.textContent = 'New Email Slide ' + (currentIndex + 1);
  carousel.appendChild(slide);
}

/* When Button is clicked run functions respectively*/
nextButton.addEventListener('click', slideNext);
prevButton.addEventListener('click', slidePrev);

