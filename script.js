'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//TODO ***add data with api with XMLHttpRequest***
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/portugal');
request.send();
request.addEventListener('load', function () {
  console.log(this.responseText);
});
