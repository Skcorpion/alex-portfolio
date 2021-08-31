$('.header__slider').slick({
  arrows: false,
  adaptiveHeight: true,
  speed: 0,
  autoplay: true,
  draggable: false,
  swipe: false,
  pauseOnFocus: false,
  pauseOnHover: false,
  autoplaySpeed: 1800,
  lazyLoad: 'progressive'
})

$('.portfolio__slider').slick({
  lazyLoad: 'progressive',
  fade: true,
  speed: 800,
  prevArrow: '<button class="slider-btn slider-left"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.21839 1L1 9L9.21839 17"/></svg></button>',
  nextArrow: '<button class="slider-btn slider-right"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.78161 17L9 9L0.78161 1"/></svg></button>',
})

new fullScroll({
  mainElement: "main",
  displayDots: true,
  dotsPosition: "right",
  animateTime: 0.7,
  animateFunction: "ease",
});