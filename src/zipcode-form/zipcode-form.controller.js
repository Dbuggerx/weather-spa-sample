/** Loading the ISO country list using JSPM's JSON loader plugin */
import jsonData from '../../jspm_packages/npm/countries-list@1.2.0/countries.minimal.json!json';

const privates = new WeakMap();

export default class ZipcodeFormCtrl {
  constructor($scope, $state, OpenWeather) {
    'ngInject';
    privates.set(this, {
      $scope,
      $state,
      OpenWeather
    });

    this.countries = Object.keys(jsonData)
      .map(code => ({
        code,
        name: jsonData[code]
      }))
      .sort((a, b) => {
        if (a.name < b.name)
          return -1;
        else if (a.name > b.name)
          return 1;
        else
          return 0;
      });

    this.zipCode = '';
    this.country = {
      code: null,
      name: '--Select one country--'
    };
  }

  selectCountry(country) {
    this.country = country;
  }

  getWeather() {
    const me = privates.get(this);
    this.weather = null;
    this.errorMsg = this.getErrorMsg();
    if(this.errorMsg)
      return;
    return me.OpenWeather.getByZip(this.zipCode, this.country.code)
      .then(weather => {
        this.weather = weather;
      })
      .catch(err => console.log(err));
  }

  getErrorMsg(){
    if(this.zipCode.trim().length === 0)
      return 'Please inform the zipcode';
    else if(!this.country.code)
      return 'Please inform the country';
    else
      return null;
  }
}
