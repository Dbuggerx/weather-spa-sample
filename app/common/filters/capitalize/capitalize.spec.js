import capitalizeModule from './capitalize.module';
import 'angular-mocks';

describe('capitalize filter', () => {
  let capitalize;
  beforeEach(angular.mock.module(capitalizeModule.name));
  beforeEach(inject(_$filter_ => {
    capitalize = _$filter_('capitalize');
  }));

  it('should capitalize a string', () => {
    expect(capitalize('TESTING')).toEqual('Testing');
  });

});
