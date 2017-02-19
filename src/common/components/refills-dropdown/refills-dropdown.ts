import * as $ from 'jquery';

export default class RefillsDropdown implements angular.IDirective {
  restrict?: string;

  /* istanbul ignore next */
  constructor() {
    this.restrict = 'A';
  }

  link(scope: angular.IScope, el: angular.IAugmentedJQuery) {
    let button = $('.dropdown__button', el);
    let menu = button.siblings('.dropdown__menu');

    function dropdownButtonClick() {
      menu.toggleClass('dropdown__menu-item--display');
    }
    function itemClick() {
      menu.removeClass('dropdown__menu-item--display');
    }

    button.on('click', dropdownButtonClick);
    menu.on('click', '.dropdown__menu-item', itemClick);

    /* istanbul ignore next */
    scope.$on('$destroy', () => {
      button.off('click', dropdownButtonClick);
      menu.off('click', '.dropdown__menu-item', itemClick);
      menu = null;
      button = null;
    });
  }
}
