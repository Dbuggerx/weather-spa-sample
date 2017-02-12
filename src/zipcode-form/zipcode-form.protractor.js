describe('weather by zip code', function() {
  it('should show the weather card', function() {
    browser.get('http://localhost:3000/zipcode');
    expect(element(by.css('.weather-card')).isPresent()).toBeFalsy();

    element(by.model('ZipcodeFormController.zipCode')).sendKeys('32830');
    element(by.css('.dropdown__button')).click();
    element(by.css('li.dropdown__menu-item:nth-child(238)')).click();
    element(by.css('[type="submit"]')).click();

    expect(element(by.css('.weather-card')).isDisplayed()).toBeTruthy();
  });
});
