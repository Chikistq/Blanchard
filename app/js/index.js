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
  const swiper = new Swiper('.header__slider-swiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
      disableOnInteraction: false
    },
    autoplay: {
      delay: 8000,
    },
    speed: 10000,
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



  /* dropdown { */
  const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  setMenuListener();

  /* } dropdown end */






  /* gallery-selects */
  /* eslint-disable-next-line no-unused-vars */
  const choices6 = new Choices('.gallery__filter-select', {
    searchEnabled: false,
    itemSelectText: '',
  })

  /* mobile-menu */
  document.querySelector('#burger').addEventListener('click', function(e) {
    e.currentTarget.classList.toggle('open')
    $('.header__top-nav-mobile').$el.classList.toggle('open')
    setTimeout(
        ($('.nav-mobile__btn').$el.classList.toggle('open'),
        $('.nav-mobile__lists').$el.classList.toggle('open')
        ), 250)
  })
  /* mobile-menu end */



  /* search active */
  setSearch({
    openBtnClass: "header__top-search-btn", // класс кнопки открытия
    closeBtnClass: "search-form__close", // класс кнопки закрытия
    searchClass: "header__top-search", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });

  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function(evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener('click', function(evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function(evt) {
      this.disabled = true;

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });

    closeBtn.addEventListener('click', function() {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener('click', function(evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
      }
    });
  }




  /* search active end */



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
  /* gallery-modal end */






})

