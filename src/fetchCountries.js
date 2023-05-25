export default function fetchCountries(nameOfCountry) {

  const fields = 'name,capital,population,flags,languages';
  const url = `https://restcountries.com/v3.1/name/${nameOfCountry}?fields=${fields}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Ошибка при получении данных');
      }
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Неверный формат данных');
      }
      return data;
    });
}

// export default function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Error: Network response was not ok');
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.log('Error:', error);
//       throw error;
//     });
// }