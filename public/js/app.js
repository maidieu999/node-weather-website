console.log("client side javascript is loaded");

// fetch('http://localhost:3000/weather?address=boston')
//     .then(response => response.json())
//     .then(data => {
//         console.log('location', data.location)
//         console.log('forecast', data.forecast)
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

const weatherFrm = document.querySelector('form')
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const errMessage = document.querySelector('#err-message')
const weatherMessage = document.querySelector('#weather-message');



weatherFrm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInput.value;
    
    errMessage.textContent = 'Loading...';
    weatherMessage.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                errMessage.textContent = data.location
                weatherMessage.textContent = data.forecast
            } else {
                errMessage.textContent = data.error
            }
        })
})