import '@/index.html'
import '@/style/main.scss'
import '@/js/simplebar.min'
import '@/style/media.scss'

import Swiper from 'swiper';
import 'swiper/css';

import Choices from 'choices.js'
import {$} from './Dom';


document.addEventListener('DOMContentLoaded', function() {

  /* header-slider */
  /* eslint-disable-next-line no-unused-vars */
  const swiper = new Swiper('.swiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
      disableOnInteraction: false
    },
    autoplay: {
      delay: 500,
    },
    speed: 400,
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
    itemSelectText: '',
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
        if (e.target !== sInput) {
          $(sBtn).removeClass('display-none')
        }
      })
    }, 400)
  })
  /* search active end */











})

