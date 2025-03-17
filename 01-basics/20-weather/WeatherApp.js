import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    const cards = getWeatherData()
    const icons = WeatherConditionIcons

    function formatToCelsium(kelvin) {
      return (kelvin - 273.15).toFixed(1)
    }

    function formatPressure(pressure) {
      return (pressure * 0.75).toFixed(0)
    }

    function isNightTime(timestamp, sunrise, sunset) {
      const sunriseTime = new Date().setHours(sunrise.split(':')[0], sunrise.split(':')[1], 0, 0)
      const sunsetTime = new Date().setHours(sunset.split(':')[0], sunset.split(':')[1], 0, 0)
      const currentTime = new Date().setHours(timestamp.split(':')[0], timestamp.split(':')[1], 0, 0)
      return currentTime <= sunriseTime || currentTime >= sunsetTime
    }

    return { cards, formatToCelsium, icons, formatPressure, isNightTime }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="card in cards" class="weather-card" :class="{ 'weather-card--night': isNightTime(card.current.dt, card.current.sunrise, card.current.sunset) }">
          <div v-if="card.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{card.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{card.current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="card.current.weather.description">{{icons[card.current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{formatToCelsium(card.current.temp)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{formatPressure(card.current.pressure)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{card.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{card.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{card.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
