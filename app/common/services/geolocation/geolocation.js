export default class Geolocation {

  static getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(resolve, reject);
      else
        reject('Geolocation is not supported by this browser');
    });
  }

}
