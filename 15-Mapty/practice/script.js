'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #map;
    #mapE;

    constructor() {
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
    }

    _getPosition() {
        // getCurrentPosition()
        // successCallback : 위치를 불러오는 데 성공했을 경우의 callback. 위치를 얻는 데 성공했을 경우 인자로 받아올 수 있다.
        // errorCallback : 위치를 불러오는 데 실팼을 경우의 callback
        navigator.geolocation.getCurrentPosition(
            this._loadMap.bind(this),
            function () {
                alert('Could not get your postion');
            }
        );
    }

    _loadMap(position) {
        // 위치를 얻는 데 성공했을 경우 인자로 받아올 수 있다.
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, 13);
        // L은 Leaflet의 namespace.
        // map()은 인자로 받은 String을 id로 하는 div에 map 이미지를 불러와주는 메소드
        // setView()는 위도와 경도 배열, 지도 줌 정도를 인자로 받는다.

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);
        // tileLayer()는 지도의 이미지를 타일 단위로 불러와주는데, openstreetmap 뿐만 아니라 구글맵과 같은 다양한 지도를 불러와준다.

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapEvent) {
        this.#mapE = mapEvent;
        form.classList.remove('hidden');
        inputDistance.focus();
    }


    _toggleElevationField() {
        inputElevation.closest('form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        e.preventDefault();

        // Clear input fields
        

        // console.log(this.#mapE);
        const { lat, lng } = this.#mapE.latlng;

        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup',
                })
            )
            .setPopupContent('workout')
            .openPopup();
    }
}


const app = new App();
