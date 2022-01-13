import '@/index.html'
import '@/style/main.scss'
import '@/style/media.scss'


import '@/js/simplebar.min';
import '@/style/simplebar.css'

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import Choices from 'choices.js'
import {$} from './Dom'

/* eslint-disable-next-line no-unused-vars */
const elementClosest = require('element-closest');

document.addEventListener('DOMContentLoaded', function() {

  /* header-slider */
  /* eslint-disable-next-line no-unused-vars */
  const swiper = new Swiper('.header__slider_swiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
      disableOnInteraction: false
    },
    autoplay: {
      delay: 8000,
    },
    speed: 4000,
  });


  /* eslint-disable-next-line no-unused-vars */
  const swiperGallery = new Swiper('.swiper-gallery', {

    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    mousewheel: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 9000,
    },
    breakpoints: {
      // // when window width is >= 320px
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        grid: {
          fill: 'row',
          rows: 1,
        },
      },
      // // when window width is >= 320px
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        grid: {
          fill: 'row',
          rows: 2,
        },
      },
      // when window width is >= 480px
      1024: {
        slidesPerView: 2,
        spaceBetween: 31,
        slidesPerGroup: 2,
        grid: {
          fill: 'row',
          rows: 2,
        },
      },
      // when window width is >= 640px
      1280: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
        grid: {
          fill: 'row',
          rows: 2,
        },
      }
    }
  });

  /* header-selects */
  /* eslint-disable-next-line no-unused-vars */
  const choices1 = new Choices('#select1', {
    searchEnabled: false,
    itemSelectText: '',
  })
  /* eslint-disable-next-line no-unused-vars */
  const choices2 = new Choices('#select2', {
    searchEnabled: false,
    itemSelectText: 'Импрессионизм',
    placeholder: true,
  })
  /* eslint-disable-next-line no-unused-vars */
  const choices3 = new Choices('#select3', {
    searchEnabled: false,
    itemSelectText: '',
  })
  /* eslint-disable-next-line no-unused-vars */
  const choices4 = new Choices('#select4', {
    searchEnabled: false,
    itemSelectText: '',
  })
  /* eslint-disable-next-line no-unused-vars */
  const choices5 = new Choices('#select5', {
    searchEnabled: false,
    itemSelectText: '',
  })

  /* eslint-disable-next-line no-unused-vars */
  const choices6 = new Choices('.gallery__filter-select', {
    searchEnabled: false,
    itemSelectText: '',
  })


  document.querySelector('#burger').addEventListener('click', function(e) {
    e.currentTarget.classList.toggle('open')
    $('.header__nav-mobile').$el.classList.toggle('open')
    setTimeout(
        ($('.header__nav-mobile-button').$el.classList.toggle('open'),
        $('.header__nav-mobile-lists').$el.classList.toggle('open')
        ), 250)
  })


  /* search active */
  const sBtn = document.querySelector('.header__search-link')
  const sInput = document.querySelector('.search-form__input_mobile')

  $(sBtn).on('click', function(event) {
    event.preventDefault()
    $(event.currentTarget).addClass('display-none')

    setTimeout(function() {
      document.addEventListener('click', function(e) {
        console.log(e.target)
        if (e.target !== sInput) {
          $(sBtn).removeClass('display-none')
        }
      })
    }, 400)
  })
  /* search active end */

  /*  симпл-бар...ломает верстку, т.к. second-line у меня с position: absolute
  * позже придумаю */
  // document.querySelectorAll('.choices__list--dropdown').forEach(el => {
  //   el.setAttribute('data-simplebar', '')
  // })




  /* gallery-modal */

  document.querySelectorAll('.gallery__slider-img').forEach(el => {
    el.addEventListener('click', function(event) {
      const crtModal = $.modal(event)

      if (event.target.closest('.gallery__slider-img')) {
        crtModal.open()

        const $modal = $('.gallery__modal')
        const $exitBtn = $('.gallery__modal-exit')

        $modal.on('click', function(e) {

          if (e.target == $modal.$el || e.target == $exitBtn.$el || e.target == $exitBtn.$el.firstElementChild) {
            crtModal.close()
            setTimeout(() => {
              crtModal.destroy()
            }, 300)
          }
        })
      }
    })
  })

  //
  // document.addEventListener('click', function(e) {
  //   const crtModal = $.modal(e)
  //
  //   if (e.target.closest('.gallery__slider-img')) {
  //     crtModal.open()
  //
  //     const $modal = $('.gallery__modal')
  //     const $exitBtn = $('.gallery__modal-exit')
  //
  //     $modal.on('click', function(e) {
  //
  //       if (e.target == $modal.$el || e.target == $exitBtn.$el || e.target == $exitBtn.$el.firstElementChild) {
  //         crtModal.close()
  //         setTimeout(() => {
  //           crtModal.destroy()
  //         }, 300)
  //       }
  //     })
  //   }
  // })

  /* gallery-modal end */






})

