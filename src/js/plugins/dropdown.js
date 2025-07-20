@Plugin({
  options: {
    dataToggle : '[data-toggle]',
    clsActive: '--active',
  }
})
export default class Dropdown {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataToggle
    } = this.options;
    
    this.$toggle = this.$element.find(dataToggle);
  }

  handleEvent () {
    const {
      PluginName,
    } = this.options;

    this.addEvent(this.$toggle, 'click', this.handleEventDropdown, {
      nameSpace: PluginName
    });

    $(window)
      .on('click', this.handleEventClickOutside.bind(this));
  }

   handleEventDropdown() {
    const { clsActive } = this.options;
    const isActive = this.$element.hasClass(clsActive);

    if (!isActive) {
      this.$element.addClass(clsActive);
    } else {
      this.$element.removeClass(clsActive);
    }
  }

  handleEventClickOutside(e) {
    const { clsActive } = this.options;
    const $target = $(e.target);
    const isComponent = $target.closest(this.$element);

    if (isComponent.length) return;

    this.$element.removeClass(clsActive);
  }
}
