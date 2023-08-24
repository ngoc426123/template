@Plugin({
  options: {
    pluginName: 'Menumobile',
    dataMobileIcon: '[data-menumobile-icon]',
    dataOverflow: '[data-menumobile-overflow]',
    dataNavigation: '[data-menumobile-navigation]',
    dataToggle: '[data-menumobile-toggle]',
    clsActive: '--active',
    clsOpen: '--open',
  }
})
export default class Menumobile {
  init () {
    this.initDOM();
    this.handleEvent();
    this.initNavigation();
  }

  initDOM () {
    const {
      dataMobileIcon,
      dataOverflow,
      dataNavigation,
    } = this.options;

    this.$icon = $('body').find(dataMobileIcon);
    this.$overflow = $('body').find(dataOverflow);
    this.$navigation = $('body').find(dataNavigation);
  }

  initNavigation() {
    const $navigationItem = this.$navigation.find('li');
    
    $navigationItem.each((__, item) => {
      const $toggle = $('<span data-menumobile-toggle></span>');
      const $item = $(item);

      if ($item.find('> ul').length) $item.append($toggle);
    });

  }

  handleEvent () {
    const {
      pluginName,
      dataToggle,
    } = this.options;

    this.$icon
      .off(`click.${pluginName}ClickToggleMenu`)
      .on(`click.${pluginName}ClickToggleMenu`, this.handleEventToggleMenumobile.bind(this));

    this.$overflow
      .off(`click.${pluginName}ClickOverflow`)
      .on(`click.${pluginName}ClickOverflow`, this.handleEventOverflow.bind(this));

    this.$element
      .off(`click.${pluginName}ClickToggleNavigation`)
      .on(`click.${pluginName}ClickToggleNavigation`, dataToggle , this.handleEventToggleNavigation.bind(this));
  }

  handleEventToggleMenumobile() {
    const { clsOpen } = this.options;
    const isOpen = this.$element.hasClass(clsOpen);

    this.$element[isOpen ? 'removeClass': 'addClass'](clsOpen);
    this.$icon[isOpen ? 'removeClass': 'addClass'](clsOpen);
  }

  handleEventOverflow(e) {
    const { clsOpen } = this.options;
    e.stopPropagation();

    this.$element['removeClass'](clsOpen);
    this.$icon['removeClass'](clsOpen);
  }

  handleEventToggleNavigation(e) {
    const { clsActive } = this.options;
    const $target = $(e.target);
    const $navigationItem = $target.parent('li');
    const $navigationMenu = $navigationItem.find('> ul');
    const $navigationItemSiblings = $navigationItem.siblings('li');
    const $navigationMenuSiblings = $navigationItemSiblings.find('> ul');
    const isActive = $navigationItem.hasClass(clsActive);

    $navigationItemSiblings['removeClass'](clsActive);
    $navigationMenuSiblings.stop()['slideUp'](300);
    $navigationItem[isActive ? 'removeClass' : 'addClass'](clsActive);
    $navigationMenu.stop()[isActive ? 'slideUp' : 'slideDown'](300);
  }
}