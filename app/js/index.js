import '@/index.html'

import '@/js/simplebar.min';
import '@/style/simplebar.css';

import $ from 'jquery';
require('webpack-jquery-ui');

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import Choices from 'choices.js'
import {$Dom} from './Dom'

import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

import Inputmask from "./inputmask.min";


/* eslint-disable-next-line no-unused-vars */
// import JustValidate from 'just-validate';

// импорт для использования 1-ой версии плагина
import '@/js/just-validate.min'



import '@/style/main.scss'
import '@/style/media.scss'
import {createAuthorCards} from '@/js/catalogAutor';

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
    // mousewheel: false,
    navigation: {
      nextEl: ".swiper-button-nextG",
      prevEl: ".swiper-button-prevG",
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

  /* eslint-disable-next-line no-unused-vars */
  const swiperEvents = new Swiper('.events__slider-wrap', {
    // mousewheel: true,
    pagination: {
      el: '.events__pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoHeight: true,
    // autoplay: {
    //   delay: 9000,
    // },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 35.5,
        slidesPerGroup: 2,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 28,
        slidesPerGroup: 2,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 49.5,
      },

    }
  });

  /* eslint-disable-next-line no-unused-vars */
  const swiperProjects = new Swiper('.projects__slider', {
    // mousewheel: true,
    pagination: false,
    navigation: {
      nextEl: ".projects__btn-next",
      prevEl: ".projects__btn-prev",
    },
    // autoplay: {
    //   delay: 9000,
    // },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
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
  /* gallery-selects end*/

  /* mobile-menu */
  document.querySelector('#burger').addEventListener('click', function(e) {
    e.currentTarget.classList.toggle('open')
    $Dom('.header__top-nav-mobile').$el.classList.toggle('open')
    setTimeout(
        ($Dom('.nav-mobile__btn').$el.classList.toggle('open'),
        $Dom('.nav-mobile__lists').$el.classList.toggle('open')
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
      const crtModal = $Dom.modal(event)

      if (event.target.closest('.gallery__slider-img')) {
        crtModal.open()

        const $modal = $Dom('.gallery__modal')
        const $exitBtn = $Dom('.gallery__modal-exit')

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


  /* catalog */
  $('#accordion').accordion({
    collapsible: true,
    active: false,
    icons: false,
    heightStyle: "content",

  })

  // смена авторов
  createAuthorCards(12)
  document.querySelectorAll('.accordion-item__body-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const i = e.currentTarget.dataset.link_id
      createAuthorCards(i)

      if (document.documentElement.clientWidth < 992) {
        document.querySelector('.catalog__items-card').scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }

      // перезапуск скрола для ссылки "в галлерею"
      const gLink = document.querySelector('.body-empty__right-link')
      gLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('1')
        document.querySelector('#gallery').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    })
  })
  /* catalog end */






  tippy('#tooltip1', {
    content: 'Пример современных тенденций - современная методология разработки',
  });

  tippy('#tooltip2', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
  });

  tippy('#tooltip3', {
    content: 'В стремлении повысить качество',
  });


  /* validate form */
  const telMask = document.querySelector('.contacts__top-form-input_tel');
  const im = new Inputmask("+7 (999)999 99 99");
  im.mask(telMask);

  /* чтобы метод работал необходимо раскоментировать подключение локального файла с плагином, а импорт из Node Mod... в комент*/
  new window.JustValidate('.contacts__top-form', {
    tooltip: {
      position: 'top',
    },
    rules: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 30,
        strength: {
          custom: /^[a-zа-яё\s]+$/iu,
        }
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = telMask.inputmask.unmaskedvalue()
          console.log(phone)
          return Number(phone) && phone.length === 10
        }
      },
    },
    messages: {
      name: {
        required: "Введите Ваше имя",
        minLength: "Имя слишком короткое",
        strength: "Недопустимый формат"
      },
      tel: {
        required: "Введите Ваш телефон",
        function: 'Недопустимый формат'
      },
    },
    submitHandler: function(form) {
      const formData = new FormData(form);
      console.log(formData)

      const xhr = new XMLHttpRequest();
      console.log(xhr)

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      form.reset();
    }
  });

  // Работает но не корректно. $_POST идет пустой, изза этого
  // сразу ошибки на foreach... если указать все данные в php вручную, то
  // работает.. Так и не разобрался в чем дело.
  /*  const validation = new JustValidate('.contacts__top-form', {
      tooltip: {
        position: 'top',
      },
    });
    validation
        .addField('#contact-name', [
          {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Имя слишком короткое',
          },
          {
            rule: 'customRegexp',
            value: /^[a-zа-яё\s]+$/iu,
            errorMessage: 'Недопустимый формат',
          },
          {
            rule: 'maxLength',
            value: 30,
          },
          {
            rule: 'required',
            errorMessage: 'Введите Ваше имя',
          },
        ])
        .addField('#contact-phone', [
          {
            validator: (name, val) => {
              const phone = telMask.inputmask.unmaskedvalue()
              return Number(phone) && phone.length === 10
            },
            errorMessage: `Введите Ваш телефон`,
          },
        ])
        .onSuccess(function(form) {
          const formData = new FormData(form.currentTarget);

          const xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                console.log('Отправлено');
              }
            }
          }

          xhr.open('POST', 'mail.php', true);
          xhr.send(formData);

          form.currentTarget.reset();
        })*/

  /* validate form end */


  /* scroll*/
  const smoothLinks = document.querySelectorAll('a[href^="#"]')
  for (const smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function(e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href')
      if (id.length > 1) {
        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  }

})


