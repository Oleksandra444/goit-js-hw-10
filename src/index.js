import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');
searchBox.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch() {
  const nameOfCountry = searchBox.value.trim();
  if (nameOfCountry) {
    fetchCountries(nameOfCountry)
      .then((countries) => {
        if (countries.length > 10) {
          showNotification('Too many matches found. Please enter a more specific name.');
        } else if (countries.length > 1) {
          showCountryList(countries);
        } else if (countries.length === 1) {
          showCountryInfo(countries[0]);
        } else {
          showNotification('Oops, there is no country with that name.');
        }
      })
      .catch((error) => {
        console.error(error);
        showNotification('Oops, something went wrong. Please try again later.');
      });
  } else {
    clearResults();
  }
}

function showCountryList(countries) {
  clearResults();

  countries.forEach((country) => {
    const { name, flags } = country;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<img src="${flags.svg}" alt="${flags.alt} width="40" height = "80" /><span style = "margin-left: 10px">${name.official}</span>`;
    countryList.appendChild(listItem);
  });
}

function showCountryInfo(country) {
  clearResults();
  
  const { name, capital, population, flags, languages } = country;
  const countryCard = document.createElement('div');
  countryCard.innerHTML = `
    <img src="${flags.svg}" alt="${flags.alt}" width = "120" height = "120" />
    <h2>${name.official}</h2>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Languages:</strong> ${Object.values(languages).join(', ')}</p>
  `;

  countryInfoContainer.appendChild(countryCard);
}

function clearResults() {
  // const countryList = document.querySelector('.country-list');
  // const countryInfoContainer = document.querySelector('.country-info');
  countryList.innerHTML = '';
  countryInfoContainer.innerHTML = '';
}

function showNotification(message) {
  Notiflix.Notify.info(message);
}
