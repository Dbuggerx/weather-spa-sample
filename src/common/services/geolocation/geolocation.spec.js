/* eslint angular/window-service: "off" */
import Geolocation from './geolocation';

describe('Geolocation service', () => {
  describe('getLocation', () => {
    it('should call navigator.geolocation.getCurrentPosition and return position', done => {
      window.navigator = {
        geolocation: {
          getCurrentPosition: jasmine.createSpy('getCurrentPosition').and.callFake((success, error) => {
            success({
              coords: {
                latitude: 123,
                longitude: 456
              }
            });
          })
        }
      };

      Geolocation.getLocation().then(data => {
          expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
          expect(data.coords.latitude).toBe(123);
          expect(data.coords.longitude).toBe(456);
          done();
        });
    });

    it('should call navigator.geolocation.getCurrentPosition and return error', done => {
      delete navigator.geolocation;
      Geolocation.getLocation()
        .catch(err => {
          done();
        });
    });
  });
});
