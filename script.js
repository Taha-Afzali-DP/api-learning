'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); // destructuring آرایه
//     console.log(data);

//     const html = `
//       <article class="country">
//         <img class="country__img" src="${data.flags.svg}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name.common}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${(
//             +data.population / 1000000
//           ).toFixed(1)} million</p>
//           <p class="country__row"><span>🗣️</span>${
//             Object.values(data.languages)[0]
//           }</p>
//           <p class="country__row"><span>💰</span>${
//             Object.values(data.currencies)[0].name
//           }</p>
//         </div>
//       </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

//TODO *** new ppart ***
const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} million</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
//TODO ***render cuontry***
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
/*
const getCountryDataAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    const neighbours = data.borders;

    if (!neighbours || neighbours.length === 0) return;

    neighbours.forEach(neighbour => {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener('load', function () {
        const [data2] = JSON.parse(this.responseText);
        renderCountry(data2, 'neighbour');
      });
    });
  });
};
// getCountryDataAndNeighbour('germany');
getCountryDataAndNeighbour('portugal');
// getCountryDataAndNeighbour('usa');
// getCountryDataAndNeighbour('iran');
*/
//TODO *** fetch ***
const req = fetch('https://restcountries.com/v3.1/name/iran');
console.log(req);
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
const getJSON = function (url, errMsg = 'somthing went worng') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} ${response.status}`);
    }
    return response.json();
  });
};
const getCountryData = function (country) {
  //! //country 1\\
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found'
  ).then(data1 => {
    renderCountry(data1[0]);
    //! //country 2\\
    const neighbour = data1[0].borders[0];
    if (!neighbour) throw new Error('no neighbour found!');
    console.log(neighbour);
    return getJSON(
      `https://restcountries.com/v3.1/alpha/${neighbour}`,
      'Country not found'
    )
      .then(data2 => renderCountry(data2[0], 'neighbour'))
      .catch(err => {
        console.error(`${err} ⛔🛑‼️`);
        renderError(`somthing went worng ‼️${err.message}.try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  });
};
btn.addEventListener('click', function () {
  getCountryData('portugal');
  // getCountryData('cvfsz');
});

getCountryData('australia');
//! API:curl 'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key'

//! API-KEY: 74488022537145152005x25148
//todo ***Coding Challange***
/*
const whereAmI = function (lat, lng) {
  return fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=74488022537145152005x25148`
  )
    .then(response => {
      if (!response.ok) throw new Error(`problem for API...${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`you are in ${data.city} in ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${errMsg} ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => console.error(`${err.message}oppsss...TRY_AGAIN`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
console.log(whereAmI(52.508, 13.381));
console.log(whereAmI(30.28211, 57.03559));

console.log('test start');
setTimeout(() => console.log('0 second time out'), 0);
Promise.resolve('resolved promise 1 ').then(res => console.log(res));
Promise.resolve('resolved promise 2 ').then(res => {
  for (let i = 0; i < 100; i++) {}
  console.log(res);
});
console.log('test end');
*/
//TODO *** bullding promise ***
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('lottery draw is happening 🔮');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('you WIN 💰🤑');
    } else {
      reject(new Error('you lost your money ‼️'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.Error(err));

//TODO promisifying setTimeOut ::
const waits = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
waits(2).then(() => console.log('I waited for 2 seconds'));
