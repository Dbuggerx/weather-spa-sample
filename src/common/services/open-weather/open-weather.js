const privates = new WeakMap();

export default class OpenWeather {
  static get $inject() {
    return ['$resource'];
  }

  constructor($resource) {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const key = 'a22b2fa4abeb9caf7969f9961e7970b8';

    privates.set(this, {
      endpoints: {
        geolocation: $resource(`${baseUrl}?lat=:latitude&lon=:longitude&units=metric&APPID=:key`, {
          latitude: '@latitude',
          longitude: '@longitude',
          key
        }),
        zipCode: $resource(`${baseUrl}?q=:zip,:country&units=metric&APPID=:key`, {
          zip: '@zip',
          country: '@country',
          key
        })
      }
    });
  }

  getByGeolocation(latitude, longitude) {
    return privates.get(this).endpoints.geolocation.get({
      latitude,
      longitude
    }).$promise;
  }

  getByZip(zip, country) {
    return privates.get(this).endpoints.zipCode.get({
      zip,
      country
    }).$promise;
  }
}
