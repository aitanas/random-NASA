import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RandomPic from './js/random-pic.js';
import PicRange from './js/pic-range.js';

// Business Logic 

function getRandomPic() {
  let promise = RandomPic.getRandomPic();
  promise.then(function(response) {
    printElements(response);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function getPicRange(startDate, endDate) {
  let promise = PicRange.getPicRange(startDate, endDate);
  promise.then(function(picArray) {
    printPicArray(picArray); //new function for printing elements?
  }, function(errorArray){
    printError(errorArray); //same error?
  });
}


// UI Logic

function printElements(data) {
  document.querySelector("#pic-div").innerHTML = `<img src=${data[0].hdurl} alt=${data[0].title} width="700px">`;
  let h3 = document.createElement("h3");
  let paragraph = document.createElement("p");
  h3.append(`${data[0].title}`);
  paragraph.append(`${data[0].explanation}`)
  document.getElementById("pic-div").append(h3, paragraph);
}

function printError(error) {
  document.querySelector('#pic-div').innerHTML = `There was an error accessing the photo data for ${error[0]}: ${error[0].msg}.`;
}

function handleClick() {
  document.querySelector('#pic-div').innerHTML = null;
  getRandomPic();
}

function printPicArray(data) {
  data[0].forEach(function (pic) {
    const img = document.createElement('img');
    img.setAttribute('src', pic.url);
    img.setAttribute('width', '400px');
    img.setAttribute('class', 'p-4');
    // document.getElementById('#pic-array').append(img); -- not working for some reason??
    document.body.append(img);
  })
}

function handleSubmit(event) {
  event.preventDefault();
  document.querySelector('#pic-array').innerHTML = null;
  const startInput = document.getElementById('start');
  const endInput = document.getElementById('end'); 
  getPicRange(startInput.value, endInput.value);
}

window.addEventListener("load", function() {
  document.getElementById("show").addEventListener("click", handleClick);
  document.querySelector("form#pic-range").addEventListener("submit", handleSubmit);
  
});