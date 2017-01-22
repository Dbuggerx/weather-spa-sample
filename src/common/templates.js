angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('app.html','<header class="main-header" data-ui-view="header"></header><div class="main-content"><div data-ui-view="" autoscroll="true"></div></div>');
$templateCache.put('home/home.html','<div class="container home"><div ng-if="!homeCtrl.weather" class="home__waiting"><h1>{{homeCtrl.title}}</h1><img src="img/gps.svg"><hr><button ui-sref="weather.zipcode-form">Check the weather by zip code instead</button></div><weather-card weather="homeCtrl.weather"></weather-card></div>');
$templateCache.put('zipcode-form/zipcode-form.html','<fieldset class="container"><form ng-submit="zipcodeFormCtrl.getWeather()" class="zipcode-form"><h1 class="zipcode-form__row">Please, provide your location</h1><hr><div class="zipcode-form__row zipcode-form__row--error" ng-if="zipcodeFormCtrl.errorMsg">{{zipcodeFormCtrl.errorMsg}}</div><div class="zipcode-form__row"><label for="zipcode">Zip code:</label><input type="text" name="zipcode" id="zipcode" class="zipcode-form__input" ng-model="zipcodeFormCtrl.zipCode" placeholder="Zipcode"></div><div class="zipcode-form__row"><label for="country">Country:</label><div refills-dropdown><div class="dropdown__container"><div class="dropdown__button">{{zipcodeFormCtrl.country.name}}</div><ul class="dropdown__menu"><li class="dropdown__menu-item" data-ng-repeat="country in zipcodeFormCtrl.countries" data-ng-click="zipcodeFormCtrl.selectCountry(country)">{{country.name}}</li></ul></div></div></div><div class="zipcode-form__row"><input type="submit" value="Check Weather" class="zipcode-form__right"></div></form><hr ng-if="zipcodeFormCtrl.weather"><weather-card weather="zipcodeFormCtrl.weather"></weather-card></fieldset>');
$templateCache.put('common/components/weather-card/weather-card.html','<article class="weather-card" ng-if="$ctrl.weatherAvailable"><h1>Weather in {{$ctrl.weather.name}}</h1><div class="weather-card__row">{{$ctrl.currentDate}}</div><div ng-if="$ctrl.hasWeatherData" class="weather-card__row"><img ng-src="{{$ctrl.iconUrl}}" class="weather-card__image"> <span class="weather-card__description">{{$ctrl.description | capitalize}}</span></div><div ng-if="$ctrl.hasMainData" class="weather-card__row"><div><span class="weather-icon weather-icon--temperature"></span> Temperature: {{$ctrl.temperature}} <span ng-if="$ctrl.shouldShowMinMaxTemp">(Min. {{$ctrl.minTemperature}} Max. {{$ctrl.maxTemperature}})</span><div><span class="weather-icon weather-icon--humidity"></span> Humidity: {{$ctrl.humidity}}</div></div></div><div ng-if="$ctrl.hasWind" class="weather-card__row"><span class="weather-icon weather-icon--wind"></span> Wind Speed: {{$ctrl.windSpeed}}</div><div ng-if="$ctrl.hasClods" class="weather-card__row"><span class="weather-icon weather-icon--cloud"></span> Cloudiness: {{$ctrl.cloudiness}}</div><div ng-if="$ctrl.hasRain" class="weather-card__row"><span class="weather-icon weather-icon--rain"></span> Rain volume: {{$ctrl.rain}}</div><div ng-if="$ctrl.hasSnow" class="weather-card__row"><span class="weather-icon weather-icon--snow"></span> Snow volume: {{$ctrl.snow}}</div></article>');}]);