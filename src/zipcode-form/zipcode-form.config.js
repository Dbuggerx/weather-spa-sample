import 'angular-ui-router';

export default ['$stateProvider', $stateProvider => {
  $stateProvider.state('weather.zipcode-form', {
    url: '/zipcode',
    templateUrl: 'zipcode-form/zipcode-form.html',
    controller: 'ZipcodeFormController as ZipcodeFormController'
  });
}];
