class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

}

export function $Dom(selector) {
  return new Dom(selector)
}

$Dom.modal = function(eTarget) {





  function creatModal() {
    const modal = document.createElement('div')
    modal.classList.add('gallery__modal')



    modal.insertAdjacentHTML('afterbegin', `
        <div class="gallery__modal-wrap flex">
          <div class="gallery__modal-img"></div>
          
          <div class="gallery__modal-descr flex">
            <h3 class="gallery__modal-author">
              Казимир Малевич
            </h3>
            <p class="gallery__modal-name">
              “Женщина с граблями”
            </p>
            <span class="gallery__modal-year">
              1931-1932
            </span>
            <p class="gallery__modal-text">
              Картина из второй серии крестьянского цикла работ Казимира Малевича. Художник принялся за её создание в 1930-1931 годах, после того, как первый цикл был утерян после Берлинской и Варшавской выставок в 1927 году.
            </p>
          </div>
          <button class="gallery__modal-exit links">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666641 15.3044L15.3333 0.000153846L16 0.695801L1.33331 16L0.666641 15.3044Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666725 -0.000125032L15.3334 15.3041L14.6667 15.9998L5.76143e-05 0.695522L0.666725 -0.000125032Z" fill="black"/>
            </svg>
          </button>
        </div>
    `)
    document.body.appendChild(modal)

    const url = eTarget.target.dataset.id
    // const url = parseInt((eTarget.target.lastElementChild.getAttribute('src')).match(/\d+/))
    /* eslint-disable-next-line no-useless-escape */
    const u = 'img/gallery' + url + '.jpg'
    modal.firstElementChild.firstElementChild.style.backgroundImage = `url("${u}")`

    return modal
  }
  /* eslint-disable-next-line no-unused-vars */
  const $modal = creatModal(eTarget)

  return {
    open() {
      $modal.classList.add('active')
    },
    close() {
      $modal.classList.remove('active')

    },
    destroy() {
      $modal.remove()
    }
  }


}
