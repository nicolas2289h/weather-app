(() => {
    const container = document.querySelector('.container')
    const search = document.querySelector('.search-box')
    const weatherBox = document.querySelector('.weather-box')
    const weatherDetails = document.querySelector('.weather-details')
    const error404 = document.querySelector('.not-found')
    const cityHide = document.querySelector('.city-hide')

    search.addEventListener('click', (e) => {
        e.preventDefault()
        const API_KEY = '3a586022d9cd87274e8ecf52cc154a6c'
        let inputCity = document.querySelector('.search-box input').value

        if (inputCity.trim() == '') {
            document.querySelector('.search-box input').focus()
            document.querySelector('.search-box input').value = ''
            return
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}&&lang=es`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.cod == '404') {
                    cityHide.textContent = inputCity
                    container.style = 'height: 400px'
                    weatherBox.classList.remove('active')
                    weatherDetails.classList.remove('active')
                    error404.classList.add('active')
                    return
                }

                const image = document.querySelector('.weather-box img')
                const temperature = document.querySelector('.weather-box .temperature')
                const description = document.querySelector('.weather-box .description')
                const humidity = document.querySelector('.weather-details .humidity span')
                const wind = document.querySelector('.weather-details .wind span')

                if (cityHide.textContent == inputCity) {
                    return
                } else {
                    cityHide.textContent = inputCity.toUpperCase()
                    container.style = 'height: 555px'
                    weatherBox.classList.add('active')
                    weatherDetails.classList.add('active')
                    error404.classList.remove('active')

                    setTimeout(() => {
                        container.classList.remove('active')
                    }, 2000)

                    switch (data.weather[0].main) {
                        case 'Clear':
                            image.src = 'assets/clear.png'
                            break

                        case 'Rain':
                            image.src = 'assets/rain.png'
                            break

                        case 'Snow':
                            image.src = 'assets/snow.png'
                            break

                        case 'Clouds':
                            image.src = 'assets/cloud.png'
                            break

                        case 'Mist':
                            image.src = 'assets/mist.png'
                            break

                        case 'Haze':
                            image.src = 'assets/haze.png'
                            break

                        default:
                            image.src = 'assets/cloud.png'
                    }

                    temperature.innerHTML = `<p class="temperature">${(data.main.temp - 273).toFixed(0)}<span>°C</span></p>`
                    description.textContent = data.weather[0].description
                    humidity.textContent = `${data.main.humidity}%`
                    wind.textContent = `${data.wind.speed}Km/h`
                }

            })
            .catch(error => console.log('ERROR PRODUCIDO: ', error))

        // document.querySelector('.search-box input').value = ''

    })
})()