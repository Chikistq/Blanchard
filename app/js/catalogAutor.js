const authorsInfo = {
  empty: {
    imgFileNumber: 'und',
    name: 'Что мы о нём знаем?',
    description: `Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!`
  },
  12: {
    imgFileNumber: '12',
    name: 'Доменико Гирландайо',
    date: '2 июня 1448 — 11 января 1494.',
    description: `Один из&nbsp;ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и&nbsp;сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в&nbsp;течение года овладевал профессиональными навыками. Автор фресковых циклов, в&nbsp;которых выпукло, со&nbsp;всевозможными подробностями показана домашняя жизнь библейских персонажей (в&nbsp;их&nbsp;роли выступают знатные граждане Флоренции в&nbsp;костюмах того времени).`
  },
}

export function createAuthorCards(index) {
  return new Author(authorsInfo[index] ? authorsInfo[index]: authorsInfo.empty).toHTML()
}


class Author {
  constructor(option) {
    this.name = option.name
    this.date = option.date
    this.descr = option.description
    this.index = option.imgFileNumber
  }

  createCard() {
    return `
      <h3 class="catalog-card__title inside-titles">
        ${this.name}
        
      </h3>
      <span class="catalog-card__date">
           ${this.date}
      </span>
      <p class="catalog-card__descr text">
         ${this.descr}
      </p>`
  }

  createImg() {
    const img = document.createElement('img')
    img.classList.add('catalog-card__img')
    img.setAttribute('alt', `Изображение художника`)
    img.src = require(`../img/catalog/cat${this.index}.jpg`)
    return img
  }

  createEmptyCard() {
    return `
    <h3 class="catalog-card__title inside-titles">
      Что мы о нём знаем?
    </h3>
    <p class="catalog-card__descr catalog-card__descr_empry text">
      Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!
    </p>
    <a class="body-empty__right-link links" href="#gallery">
      В галерею
    </a>
    `
  }

  deletCard() {
    document.querySelector('.catalog__items-card').remove()
  }

  // получаем шаблон карточки, вставляем в нужное место
  toHTML() {
    this.deletCard()
    const card = document.createElement('div')
    card.classList.add('catalog__items-card', 'catalog-card')

    if (this.date) {
      card.append(this.createImg())
      card.insertAdjacentHTML('beforeend', this.createCard())
    } else {
      card.append(this.createImg())
      card.insertAdjacentHTML('beforeend', this.createEmptyCard())
    }

    document.querySelector('.catalog__items').prepend(card)
    setTimeout(function() {
      card.classList.add('is-active')
    }, 200)


  }
}
