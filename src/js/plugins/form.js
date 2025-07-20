@Plugin({
  options: {
    dataBtnVisible: '[data-btn-visible]',
    dataUpload: '[data-upload]',
    dataUploadFile: '[data-upload-file]',
    dataUploadError: '[data-upload-error]',
    dataUploadPlaceholder: '[data-upload-placeholder]',
    dataUploadRemove: '[data-upload-remove]',
    dataUploadPreview: '[data-upload-preview]',
  }
})
export default class Form {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const { $element } = this;
    const {
      dataBtnVisible,
      dataUpload,
      dataUploadFile,
    } = this.options;

    this.$btnVisible = $element.find(dataBtnVisible);
    this.$upload = this.$element.find(dataUpload);
    this.$uploadFile = this.$element.find(dataUploadFile);
  }

  handleEvent () {
    const {
      PluginName,
      dataUploadRemove,
    } = this.options;

    // VISIBLE PASSWORD
    this.addEvent(this.$btnVisible, 'click', this.handleEventVisiBlePassword, {
      nameSpace: PluginName
    });
  
    // UPLOAD FILE
    this.addEvent(this.$uploadFile, 'change', this.handleEventUploadFile, {
      namespace: PluginName,
    });

    // REMOVE PREVIEW
    this.addEvent(this.$upload, 'click', this.handleEventRemovePreview, {
      namespace: PluginName,
      delegate: dataUploadRemove
    });
  }

  handleEventVisiBlePassword(e) {
    const $target = $(e.target);
    const $input = $target.prev('input');
    const inputType = $input.attr('type');
    
    $input.attr('type', inputType === 'password' ? 'text' : 'password')
  }

  async handleEventUploadFile(e) {
    const { dataUpload, dataUploadError, dataUploadIcon } = this.options;
    const $target = $(e.target);
    const $parent = $target.closest(dataUpload);
    const file = $target[0].files[0];
    const { type, size } = file;
    const isImage = type.match(/(image\/).+/g);
    const $error = $parent.find(dataUploadError);
    const $icon = $parent.find(dataUploadIcon);
    const isOver5M = size > 5000000;

    $error.remove();

    if (!isImage) {
      const $error = $('<span class="cmp-form__upload-error" data-upload-error>Only upload image file</span>');

      $parent.append($error);
      return;
    }

    if (isImage && isOver5M) {
      const $error = $('<span class="cmp-form__upload-error" data-upload-error>File only maximun 5M</span>');

      $parent.append($error);
      return;
    }

    $icon
      .find('.icon')
      .removeClass('icon-plus')
      .addClass('icon-spiner ani-rotate')

    try {
      const img64 = await getFile64(file);
      const $preview = $(`
        <div class="cmp-form__upload-preview" data-upload-preview>
          <img src="${img64}">
          <span>Change images</span>
        </div>`
      );
      const $remove = $(`
        <button class="cmp-form__upload-remove" type="button" data-upload-remove>
            <i class="icon icon-close"></i>
          </button>
      `);

      $parent.append($preview);
      $parent.append($remove);
      $icon
        .find('.icon')
        .removeClass('icon-spiner ani-rotate')
        .addClass('icon-plus');
    } catch (e) {
      console.log(e);
    }
  }

  handleEventRemovePreview(e) {
    const {
      dataUpload,
      dataUploadFile,
      dataUploadPreview,
      dataUploadRemove,
    } = this.options;
    const $target = $(e.target);
    const $parent = $target.closest(dataUpload);
    const $file = $parent.find(dataUploadFile);
    const $preview = $parent.find(dataUploadPreview);
    const $remove = $parent.find(dataUploadRemove);

    $preview.remove();
    $remove.remove();
    $file.val('');
  }

}

function getFile64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  })
}
