@Plugin({
  options: {
    dataItem : '[data-accordion-item]',
    dataToggle : '[data-accordion-toggle]',
    dataDropdown : '[data-accordion-dropdown]',
    clsActive: '--active',
  }
})
export default class Accordion {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataToggle,
    } = this.options;
    
    this.$toggle = this.$element.find(dataToggle);
  }

  handleEvent () {
    const {
      PluginName,
    } = this.options;

    // TOGGLE ACCORDION
    this.addEvent(this.$toggle, 'click', this.handleEventToggle, {
      nameSpace: PluginName
    });
  }

  handleEventToggle(e) {
    const { dataItem, dataDropdown, clsActive } = this.options;
    const $target = $(e.target);
    const $accordion = $target.closest(dataItem);
    const $dropdown = $accordion.find(dataDropdown);
    const isActive = $accordion.hasClass(clsActive);
    const $accordionSiblings = $accordion.siblings();
    const $dropdownSiblings = $accordionSiblings.find(dataDropdown);

    $accordionSiblings.removeClass(clsActive);
    $dropdownSiblings.stop().slideUp();
    $accordion[isActive ? 'removeClass' : 'addClass'](clsActive);
    $dropdown.stop()[isActive ? 'slideUp' : 'slideDown']();
  }
}
