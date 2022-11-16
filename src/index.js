import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RandomPic from './js/random-pic.js';

function getRandomPic() {
  let promise = RandomPic.getRandomPic();
  promise.then(function(response) {
    printElements(response);
  }, function(errorArray) {
    printError(errorArray);
  });
}


// UI LOGIC

function printElements(data) {
  document.querySelector("#pic-div").innerHTML = `<img src=${data[0].hdurl} alt=${data[0].title} width="700px">`;
  let h3 = document.createElement("h3");
  let paragraph = document.createElement("p");
  h3.append(`${data[0].title}`);
  paragraph.append(`${data[0].explanation}`)
  document.getElementById("pic-div").append(h3, paragraph);
}

function printError(error) {
  document.querySelector('#pic-div').innerHTML = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleClick() {
  document.querySelector('#pic-div').innerHTML = null;
  getRandomPic();
}

window.addEventListener("load", function() {
  document.getElementById("show").addEventListener("click", handleClick);
  
});