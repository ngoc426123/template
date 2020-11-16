@Plugin
export default class Main {
  init() {
    $(`#slide-banner`).slick({
      dots: false,
      arrows: false,
    });
  }
}