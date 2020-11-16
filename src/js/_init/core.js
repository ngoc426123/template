export default function Plugin (Class) {
  function initPlugin (param) {
    const pluginName = param.name;
    const pluginOption = Class.options;
    const selectorName = pluginName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const dataSelectorName = `[data-${selectorName}]`;

    $.fn[pluginName] = function () {
      const self = this;
      const init = new param();
      init.options = pluginOption;
      init.$element = self;
      init.init();
    }

    !!$(dataSelectorName).length && $(dataSelectorName)[pluginName]();
  }

  return typeof Class === 'function' ? initPlugin(Class) : initPlugin;
}
