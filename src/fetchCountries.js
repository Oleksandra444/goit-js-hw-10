export default function fetchCountries(nameOfCountry) {

  const fields = 'name,capital,population,flags,languages';
  const url = `https://restcountries.com/v3.1/name/${nameOfCountry}?fields=${fields}`;

  
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        if (res.status === 404) { 
          return []; 
        }
        throw new Error('Помилка при отриманні даних');
      }
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Невірний формат даних');
      }
      return data;
    });
}
