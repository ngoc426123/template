import Swiper from 'swiper/bundle';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

@Plugin({
  options: {
    slideOptions: {
      modules: [Autoplay, Navigation, Pagination],
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      autoplay: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        991: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 15,
        }
      }
    }
  }
})
export default class ImagesSlider {
  init () {
    this.initSlide();
  }

  initSlide () {
    const { slideOptions } = this.options;

    this.$slider = new Swiper(this.$element[0], slideOptions);
  }
}
