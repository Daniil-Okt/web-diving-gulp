/*
!(i) 
Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
Или когда импортирован весь файл, например import "files/script.js";
Неиспользуемый (не вызванный) код в итоговый файл не попадает.

Если мы хотим добавить модуль следует его расскоментировать
*/


import {
  isWebp,
  headerFixed,
  togglePopupWindows,
  addTouchClass,
  addLoadedClass,
  menuInit,
  spollerInit,
  spoilerActive,
} from './modules'
/* Раскомментировать для использования */
// import { MousePRLX } from './libs/parallaxMouse'

/* Раскомментировать для использования */
import AOS from 'aos'

/* Раскомментировать для использования */
// import Swiper, { Navigation, Pagination } from 'swiper'

// Включить/выключить FLS (Full Logging System) (в работе)
window['FLS'] = true

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML
! (i) необходимо для корректного отображения webp из css 
*/
isWebp()
/* Добавление класса touch для HTML если браузер мобильный */
/* Раскомментировать для использования */
// addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
/* Раскомментировать для использования */
// addLoadedClass();
/* Модуль для работы с меню (Бургер) */
/* Раскомментировать для использования */
menuInit()

/* Библиотека для анимаций ===============================================================================
 *  документация: https://michalsnik.github.io/aos
 */
AOS.init();
// =======================================================================================================

// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({})
// =======================================================================================================

// Фиксированный header ==================================================================================
headerFixed()
// =======================================================================================================

/* Открытие/закрытие модальных окон ======================================================================
* Чтобы модальное окно открывалось и закрывалось
* На окно повешай атрибут data-type="<название окна>"
* И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

* На обертку(враппер) окна добавь класс _overlay-bg
* На кнопку для закрытия окна добавь класс button-close
*/
/* Раскомментировать для использования */
// togglePopupWindows()
// =======================================================================================================


/*Открытие/закрытие блоков spollers ==================================================
// https://youtu.be/0fg9bZcL1RM
* Чтобы блок spollers открывался и закрывался
* На блок и кнопку/заголовок, которая открывает и закрывает spollers
* Повешай атрибут data-spollers(на блок-контейнер) и data-spoller(на кнопку/заголовок)
* Если нужно что б spollers работал на определенной ширине экрана
* Добавь для атрибута блока значение в виде data-spollers="<ширина экрана, тип медиа запроса (min/max)"
* Для того что бы спойлер по умолчанию был открыть, следует к нужному блоку дописать класс "_active"
// ! Следует писать в HTML блок контента спойллера после кнопки/заголовки (иначе работать спойллер не будет)
// ! Визуальные атрибуты спойллера добавляются по классу "_init"
// ! При нажатие на кнопку спойллера, добавляется классы "_init" к контейниру и "_active" к кнопке и блоку с содержимым спойллера
*/
/* Раскомментировать для использования */
spollerInit()
//===================================================================
spoilerActive()

// const btn = document.querySelectorAll('.bt')
// const btext = document.querySelectorAll('.textscr')
// if(btn.length > 0) {
//   btn.forEach(btm =>
//     btm.addEventListener("click", function(e) {
//       if(btext.length > 0) {
//         btext.forEach(btex =>
//           btex.classList.toggle('active'))
//         }
//     }))
// }
