import toggleBodyLock from './../helpers/toggleBodyLock'
import { html, firstScreen, header, burgerButton, spoilerButton, spollersArray } from './../helpers/elementsNodeList'

// logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}

// Модуль работы с spollers

const spoilerActive = () => {
  if (spoilerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.spoiler-btn')) {
        document.querySelector('.text__spoiler').classList.toggle('active')
        document.querySelector('.spoiler-btn').classList.toggle('active')
      }
    })
  }
}
const spoilerOpen = () => {
  toggleBodyLock(true)
  document.querySelector('.text__spoiler').classList.add('menu-open')
}
const spoilerClose = () => {
  toggleBodyLock(false)
  document.querySelector('.text__spoiler').classList.remove('menu-open')
}

// Модуль работы с spollers ===================================================================================================
const spollerInit = () => {
  if (spollersArray.length > 0) {
    //Получение обычных спойллеров
    const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
      return !item.dataset.spollers.split(",")[0]   
    })

    //Инициалицачия обычных спойллеров
    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular)
    }

    //Получение спойллеров c параметрами 
    const spollersMedia = Array.from(spollersArray).filter(function(item, index, self) {
      return item.dataset.spollers.split(",")[0];
    })

    //Инициализация спойллеров c параметрами 
    if (spollersMedia.length > 0) {
      const breakpointsArray = []
      spollersMedia.forEach(item => {
        const params = item.dataset.spollers
        const breakpoint = {}
        const paramsArray =  params.split(",")
        breakpoint.value = paramsArray[0]
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"
        breakpoint.item = item
        breakpointsArray.push(breakpoint)
      })

      //Получаем уникальные брекпоинты
      let mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type
        })
        mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
        })

      //Работа с каждым брекпоинтом 
      mediaQueries.forEach(breakpoint => {
          const paramsArray = breakpoint.split(",")
          const mediaBreakpoint = paramsArray[1]
          const mediaType = paramsArray[2]
          const matchMedia = window.matchMedia(paramsArray[0])

          // Объекты с нужными условиями
          const spollersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true
            }
          })

          // Событие
          matchMedia.addListener(function () {
            initSpollers(spollersArray, matchMedia)
          })
          initSpollers (spollersArray, matchMedia)
        })
    }       
    

    //Инициализация функции initSopollers
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach(spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_init')
          initSpollerBody (spollersBlock)
          spollersBlock.addEventListener("click", setSpollerAction)
        } else {
          spollersBlock.classList.remove("_init")
          initSpollerBody (spollersBlock, false)
          spollersBlock.removeEventListener("click", setSpollerAction)
        }
      })
    }

    //Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
      if (spollerTitles.length > 0) {
        spollerTitles.forEach(spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex')
            if (!spollerTitle.classList.contains('_active')) {
              spollerTitle.nextElementSibling.hidden = true
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1')
            spollerTitle.nextElementSibling.hidden = false
          }
        })  
      }
    }
    function setSpollerAction(e) {
      const el = e.target
      if (el.hasAttribute('data-spoller') || el.closest('(data-spoller]')) {
        const spollerTitle = el.hasAttribute("data-spoller") ? el : el.closest ('[data-spoller]')
        const spollersBlock = spollerTitle.closest ('[data-spollers]')
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false
        if (!spollersBlock.querySelectorAl1('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_active')) {
            hideSpollersBody(spollersBlock)
          }
          spollerTitle.classList.toggle('_active')
          _slideToggle(spollerTitle.nextElementSibling, 500)
        }
        e.preventDefault() 
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active')
      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove('_active')
        _slideUp(spollerActiveTitle.nextElementSibling, 500)
      }
    }


    //SlideToggle -- Фуникции анимирования cрытия
    let _slideUp = (target, duration = 500) => {
      if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = target.offsetHeight + 'px'
      target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = 0
      target.style.paddingTop = 0 
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
        window. setTimeout (() => {
        target.hidden = true
        target.style.removeProperty('height')
        target.style.removeProperty('margin-top')
        target.style.removeProperty('margin-bottom')
        target.style.removeProperty('overflow')
        target.style.removeProperty('transition-duration')
        target.style.removeProperty('transition-property')
        target.classList.remove('_slide')
        }, duration)
      }
    }
    let _slideDown = (target, duration = 500) => {
      if (!target.classList.contains('_slide')) {
      target.classList.add("_slide")
      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = 0
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0 
      target.offsetHeight
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = height + 'px' 
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top') 
      target.style.removeProperty('margin-bottom')
              window.setTimeout (() => {
                  target.style.removeProperty( 'height')
                  target.style.removeProperty ('overflow')
                  target.style.removeProperty('transition-duration')
                  target.style.removeProperty('transition-property')
                  target.classList.remove('_slide')
              }, duration)
      }
    }
    let _slideToggle = (target, duration = 500) => {
      if (target.hidden) {
        return _slideDown(target, duration)
      } else {
        return _slideUp(target, duration)
      }
    }
  }
}

// =============================================================================================================================




export {
  FLS,
  isWebp,
  isMobile,
  addTouchClass,
  headerFixed,
  togglePopupWindows,
  addLoadedClass,
  getHash,
  setHash,
  menuInit,
  menuOpen,
  menuClose,
  spollerInit,

  spoilerActive,
  spoilerOpen,
  spoilerClose,
}
