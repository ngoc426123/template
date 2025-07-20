@Plugin({
  options: {
    dataSomething : '[data-something]'
  }
})
export default class Example {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataSomething
    } = this.options;
    
    this.$something = this.$element.find(dataSomething);
  }

  handleEvent () {
    const { PluginName } = this.options;

    // DOING WITH SOMETHING
    this.addEvent(this.$something, 'click', this.handleEventSomething, {
      nameSpace: PluginName,
    });
  }

  handleEventSomething() {
    console.info('Doing Something with Me !!!'); 
  }
}
