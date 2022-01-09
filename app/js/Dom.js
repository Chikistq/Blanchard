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

export function $(selector) {
  return new Dom(selector)
}

// $.setBG = function (select, optId) {
//   const selectId
//   for (let i=1; selectId.)
//   document.querySelectorAll(option)
//
//
// }
