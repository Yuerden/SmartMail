// mainpageScripts.js

import {EmailGetter} from './getEmails.js';

/* MAIN */

var total_unread_emails = -1;

//Button event listener main function
document.addEventListener('DOMContentLoaded', (event) => {
    
  //EmailGetter Object that utilizes functions in getEmails.js
  var emailGetter = new EmailGetter();
  var sameEmail = false;
    
    //Load Button logic for loading and getting the next email
    var getEmail = document.getElementById('getEmail');
    if (getEmail) {
      getEmail.addEventListener('click', function() {


        sameEmail = false;
        addSlideWithSpinner();
        addSlideSummary();
        slideCurrent();
        emailGetter.getNextEmail().then(emailData => {
            updateSlideContent(emailData.body);
        });


        //Set Total emails counters
        emailGetter.getEmailList().then(emaillength =>{

          if(total_unread_emails == -1){
            total_unread_emails = emaillength;
          }
          else{
            total_unread_emails -= 1;
          }
          const total = document.getElementById('total_unread');
          total.textContent = "Total Unread: " + total_unread_emails;
          console.log(total_unread_emails);
        });
      });
    } 
    else {
      console.error('getEmail not found')
    }
    
    //Next Email Button Logic for getting the summary of the current email
    var getEmailSummary = document.getElementById('summarize');
    if (getEmailSummary) {
      getEmailSummary.addEventListener('click', function() {
        carousel.getElementsByClassName('slide_summary')[carousel.getElementsByClassName('slide_summary').length - 1].innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>';
        slideCurrent();
        emailGetter.summarizeEmail().then(summary => {
          summaryParse(summary);
          
        });
        sameEmail=true;
      });
    }

    //Next Slide Button Logic to generate and animate to next slide
    var nextSlideButton = document.getElementById('nextSlide');
    if (nextSlideButton) {
      nextSlideButton.addEventListener('click', function() {
        slideNext();
      });
    }

    //Previous Slide Button Logic to animate to previous slide
    var prevSlideButton = document.getElementById('prevSlide');
    if (prevSlideButton) {
      prevSlideButton.addEventListener('click', function() {
        //LOGIC HERE
        slidePrev();
      });
    }
});


/* HELPERS */

/* Carousel JS (Find a way to integrate into load button above)*/
const carousel = document.getElementById('carousel');
let currentIndex = 0;

/*Next Slide Function*/
function slideNext() {
  currentIndex += 1;
  updateSlide();
}

/*Previous Email Function*/
function slidePrev() {
  currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
  updateSlide();
}

function slideCurrent() {
  currentIndex = (carousel.children.length-1)/2-((carousel.children.length-1)%2)/2;
  console.log(carousel.children.length-1);
  updateSlide(); 
}

/*moves/updates carousel*/
function updateSlide() {
  // Assuming each slide (including margins/gap) takes up 100% of the carousel's width
  const slideWidth = carousel.offsetWidth; // This gets the width of the carousel container
  const offset = -currentIndex * slideWidth; // This calculates the offset based on the current index
  carousel.style.transform = `translateX(${offset}px)`; // Use pixels for transform as offsetWidth is in pixels
}


// New Add Slide Function (Includes spinner)
function addSlideWithSpinner() {
  const slide = document.createElement('div');
  slide.classList.add('slide');
  slide.innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>'; // Add your spinner here
  carousel.appendChild(slide);
  updateSlide(); // Move to the new slide with the spinner
}
function addSlideSummary() {
  const slide = document.createElement('div');
  slide.classList.add('slide_summary');
  carousel.appendChild(slide);
  updateSlide(); // Move to the new slide with the spinner
}

// Function to update the content of the latest slide
function updateSlideContent(content) {
  const slides = carousel.getElementsByClassName('slide');
  const latestSlide = slides[slides.length - 1]; // Get the last slide
  if (latestSlide) {
      latestSlide.innerHTML = ''; // Clear the spinner
      latestSlide.textContent = content; // Add the new content
  }
}
function updateSlideContent_summary(content) {
  const slides = carousel.getElementsByClassName('slide_summary');
  const latestSlide = slides[slides.length - 1]; // Get the last slide
  if (latestSlide) {
      latestSlide.innerHTML = ''; // Clear the spinner
      latestSlide.innerHTML = content; // Add the new content
  }
}

// Function to parse text based on a token and store in a list
function parseText(text) {
  // Split the text based on the token (SPLIT BROKEN FOR SOME REASON, MAYBE CHANGE DATA TYPE TO STRING)
  const segments = text.split("\n");

  // Remove any empty segments
  const parsedSegments = segments.filter(segment => segment.trim() !== '');

  return parsedSegments;

}

// Function for parsing summary
function summaryParse(summary){
  
  // Parse the text to make a list of points
  var list = parseText(summary);
  console.log(list);

  // Create an unordered list element
  var summary_list = document.createElement("ul");

  // Iterate over each item in the list
  list.forEach(function(item) {
    // Create a list item element
    var summary_part = document.createElement("li");
    
    // Set the text content of the list item
    summary_part.textContent = item;

    // Append the list item to the unordered list
    summary_list.appendChild(summary_part);
  });

  console.log("Old List:\n", list);
  console.log("Updated List:\n", summary_list);
  //Send finished summary text to updateSlideContent
  // var test = "<p>HI<p>"
  updateSlideContent_summary(summary_list.innerHTML);
}
