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

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(10);
    constructor(distance, duration, coords) {
        this.distance = distance; // [lat, lng]
        this.duration = duration; // in km
        this.coords = coords; // in min
    }
}

class Running extends Workout {
    type = 'running';
    constructor(distance, duration, coords, cadence) {
        super(distance, duration, coords);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(distance, duration, coords, elevationGain) {
        super(distance, duration, coords);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

class App {
    #map;
    #mapE;
    #workouts = [];

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
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value; // value는 항상 String으로 가져오기 때문에, Number로 변환시켜야 함.
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapE.latlng;
        let workout;

        // If workout running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // Check if data is valid
            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert('Inputs have to be positive numbers!');

            workout = new Running(distance, duration, [lat, lng], cadence);
        }

        // If workout cycling, create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            // Check if data is valid
            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            )
                return alert('Inputs have to be positive numbers!');

            workout = new Cycling(distance, duration, [lat, lng], elevation);
        }

        // Add new object to workout array
        this.#workouts.push(workout);

        // Render workout on map as marker
        this.renderWorkoutMarker(workout);
    }
    
    renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent('workout')
            .openPopup();
    }
}

const app = new App();
