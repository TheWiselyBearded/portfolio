var Swiper = require('swiper');
// import Swiper from 'swiper';
// var swiper = import()

var swiperH = new Swiper('.swiper-container-h', {
    mousewheel: {
        sensitivity: 0.1
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    initialSlide: 1
});
var swiperV = new Swiper('.swiper-container-v', {
    direction: 'vertical',
    // mousewheel: true,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination-v',
        clickable: true,
        hideOnClick: false,
    },
});
// Params
let mainSliderSelector = '.main-slider';
let navSliderSelector = '.nav-slider';
let interleaveOffset = 0.5;
// Main Slider
let mainSliderOptions = {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000
    },
    loopAdditionalSlides: 5,
    grabCursor: false,
    watchSlidesProgress: true,
    on: {
        init: function() {
            this.autoplay.stop();
        },
        imagesReady: function() {
            this.el.classList.remove('loading');
            this.autoplay.start();
        },
        slideChangeTransitionEnd: function() {
            let swiper = this,
                captions = swiper.el.querySelectorAll('.caption');
            for (let i = 0; i < captions.length; ++i) {
                captions[i].classList.remove('show');
            }
            swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
        },
        progress: function() {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
                let slideProgress = swiper.slides[i].progress,
                    innerOffset = swiper.width * interleaveOffset,
                    innerTranslate = slideProgress * innerOffset;

                swiper.slides[i].querySelector(" .slide-bgimg ").style.transform =
                    " translateX( " + innerTranslate + " px) ";
            }
        },
        // touchStart: function () {
        //     let swiper = this;
        //     for (let i = 0; i < swiper.slides.length; i++) {
        //         swiper.slides[i].style.transition = " ";
        //     }
        // },
        setTransition: function(speed) {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + " ms ";
                swiper.slides[i].querySelector(" .slide-bgimg ").style.transition =
                    speed + " ms ";
            }
        }
    }
};
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);
mainSlider.allowTouchMove = false;
// Navigation Slider
let navSliderOptions = {
    loop: true,
    loopAdditionalSlides: 5,
    speed: 1000,
    spaceBetween: 5,
    slidesPerView: 5,
    centeredSlides: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    direction: 'vertical',
    on: {
        imagesReady: function() {
            this.el.classList.remove('loading');
        },
        click: function() {
            mainSlider.autoplay.stop();
        }
    }
};
// if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // console.log("Swiper direction before", navSliderOptions);
    if (window.innerWidth > window.innerHeight) {
        navSliderOptions.direction = 'vertical';
    } else {
        navSliderOptions.direction = 'horizontal';
        navSliderOptions.slidesPerView = 3;
    }
    // console.log("Swiper direction after", navSliderOptions.direction);
}
let navSlider = new Swiper(navSliderSelector, navSliderOptions);
// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
// ART
let mainSliderSelectorArt = '.mslider-art';
let navSliderSelectorArt = '.nslider-art';
let interleaveOffsetArt = 0.5;

// Main Slider
let mainSliderOptionsArt = {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000
    },
    loopAdditionalSlides: 3,
    grabCursor: false,
    watchSlidesProgress: true,
    on: {
        init: function() {
            this.autoplay.stop();
        },
        imagesReady: function() {
            this.el.classList.remove('loading');
            this.autoplay.start();
        },
        slideChangeTransitionEnd: function() {
            let swiper = this,
                captions = swiper.el.querySelectorAll('.caption-art');
            for (let i = 0; i < captions.length; ++i) {
                captions[i].classList.remove('show');
            }
            swiper.slides[swiper.activeIndex].querySelector('.caption-art').classList.add('show');
        },
        progress: function() {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
                let slideProgress = swiper.slides[i].progress,
                    innerOffset = swiper.width * interleaveOffset,
                    innerTranslate = slideProgress * innerOffset;

                swiper.slides[i].querySelector(" .slide-bgimg-art ").style.transform =
                    " translateX( " + innerTranslate + " px) ";
            }
        },
        setTransition: function(speed) {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + " ms ";
                swiper.slides[i].querySelector(" .slide-bgimg-art ").style.transition =
                    speed + " ms ";
            }
        }
    }
};
var mainSliderArt = new Swiper(mainSliderSelectorArt, mainSliderOptionsArt);
mainSliderArt.allowTouchMove = false;
// Navigation Slider
let navSliderOptionsArt = {
    loop: false,
    loopAdditionalSlides: 3,
    speed: 1000,
    spaceBetween: 5,
    slidesPerView: 5,
    centeredSlides: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    direction: 'vertical',
    on: {
        imagesReady: function() {
            this.el.classList.remove('loading');
        },
        click: function() {
            mainSliderArt.autoplay.stop();
        }
    }
};
if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // console.log("Swiper direction before", navSliderOptions);
    if (window.innerWidth > window.innerHeight) {
        navSliderOptionsArt.direction = 'vertical';
    } else {
        navSliderOptionsArt.direction = 'horizontal';
        navSliderOptionsArt.slidesPerView = 3;
    }
    // console.log("Swiper direction after", navSliderOptions.direction);
}
let navSliderArt = new Swiper(navSliderSelectorArt, navSliderOptionsArt);

// Matching sliders
mainSliderArt.controller.control = navSliderArt;
navSliderArt.controller.control = mainSliderArt;

// function changeDirection() {
//     isVertical = !isVertical;
//     direction = isVertical ? 'vertical' : 'horizontal';
//     let slideIndex = swiper.activeIndex;
//     swiper.destroy(true, true);
//     swiper = initSwiper(direction);
//     swiper.slideTo(slideIndex, 0);
// }
document.addEventListener("orientationchange", updateOrientation);

function updateOrientation() {
    console.log("rotation changed");
}
var mql = window.matchMedia("(orientation: portrait)");

// If there are matches, we're in portrait
if (mql.matches) {
    // Portrait orientation
    console.log("portrait method 2");
} else {
    // Landscape orientation
    console.log("landscape method 2");
}

document.addEventListener("orientationchange", updateOrientation);

console.log("loaded once");

function doOnOrientationChange() {
    switch (window.orientation) {
        case -90:
        case 90:
            console.log('yp landscape');
            navSlider.destroy(true, true);
            navSliderArt.destroy(true, true);
            navSliderOptions.direction = 'horizontal';
            navSliderOptions.slidesPerView = 3;
            navSliderOptionsArt.direction = 'horizontal';
            navSliderOptionsArt.slidesPerView = 3;
            navSlider = new Swiper(navSliderSelector, navSliderOptions);
            navSliderArt = new Swiper(navSliderSelectorArt, navSliderOptionsArt);
            mainSlider.controller.control = navSlider;
            navSlider.controller.control = mainSlider;
            mainSliderArt.controller.control = navSliderArt;
            navSliderArt.controller.control = mainSliderArt;
            break;
        default:
            console.log('yo portrait');
            navSlider.destroy(true, true);
            navSliderArt.destroy(true, true);
            navSliderOptions.direction = 'vertical';
            navSliderOptionsArt.direction = 'vertical';
            navSliderOptions.slidesPerView = 5;
            navSliderOptionsArt.slidesPerView = 5;
            navSlider = new Swiper(navSliderSelector, navSliderOptions);
            navSliderArt = new Swiper(navSliderSelectorArt, navSliderOptionsArt);
            mainSlider.controller.control = navSlider;
            navSlider.controller.control = mainSlider;
            mainSliderArt.controller.control = navSliderArt;
            navSliderArt.controller.control = mainSliderArt;
            break;
    }
}

window.addEventListener('orientationchange', doOnOrientationChange);

// Initial execution if needed
doOnOrientationChange();