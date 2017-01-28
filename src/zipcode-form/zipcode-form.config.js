import 'angular-ui-router';

export default ['$stateProvider', function ($stateProvider) {
  $stateProvider.state('weather.zipcode-form', {
    url: '/zipcode',
    templateUrl: 'zipcode-form/zipcode-form.html',
    controller: 'ZipcodeFormCtrl as zipcodeFormCtrl'
  });
}]
