$(() => {

  // constants

  const headerMenu = $(".header__menu");
  const header = $(".header");
  const headerLinks = $(".header__nav-link");
  const headerMenuTab = document.querySelectorAll(".header__menu-tab");
  const headerMenuTabs = $(".header__menu-tabs");
  const sliderSwitcher = $(".slider__switcher");
  const sliderSlides = document.querySelectorAll(".slider__slides");
  const sliderCard = $(".slider__card");


  // текущая позиция

  let currentPosition = 0;

  // на сколько карточек идёт скролл

  let slidesToScroll = 3;

  // движение слайдера на телефоне

  let moving = false;

  // переменная инициализации touchstart

  let init = 0;

  // переменная текущей позиции сенсорного движения

  let currentTouchPosition = 0;

  // регулярное выражение вычисления позиции по X у слайдера
  const regPx = /[-0-9.]+(?=px)/;

  // позиция со стиля
  let stylePosition = 0;

  // показать / убрать меню у хедера

  $(".header__nav-links").on("click", e => {

    // для закрытия меню

    if (e.target.className == "header__nav-link activeLink") {
        setTimeout(changeState, 250);
        headerMenu.slideUp();
        headerLinks.removeClass("activeLink");
    }

    // для открытия

    else if (e.target.className == "header__nav-link") {
      headerLinks.removeClass("activeLink");
      if (e.target.className == "header__nav-link") {
        $(e.target).addClass("activeLink");
      }
      changeState({"background": "rgba(62, 61, 61, 0.1)","backdrop-filter": "blur(80px)"});
      headerMenu.slideDown();
      headerMenuTab.forEach(tab => {
        tab.style.display = "none";
        if (e.target.id == tab.id + "Link") {

          // в случае если пользователь зашёл с телефона назначается дисплей блок
          // (потому что блок имеет другую расстановку на мобильной версии)

          if (screen.width > 1024) tab.style.display = "grid";
          else tab.style.display = "block";
        }
      })
    }
  })

    // изменение слайдера с помощью переключателей
    $(".slider__switchers").on("click", e => {
      if (e.target.className == "slider__switcher") {
        sliderSwitcher.removeClass("activeSwitcher");
        $(e.target).addClass("activeSwitcher");
        $(".slider__slides").each((index, item) => {
          item.style.display = "none";
          item.style.transform = "translateX(0px)";
          if (item.id == e.target.id + "-slider") {
            item.style.display = "flex";
            if (item.id == "s-slider") slidesToScroll = 1;
            else slidesToScroll = 3;
          }
        })
      }
    })

    // изменение кнопок прогресса пролистывания по сайту
    document.addEventListener("scroll", e => {
        if (pageYOffset > 551 || pageYOffset == 551) changePaginationProgress("markets");
  })

  // слайдер по нажатию на стрелочки
  $(".slider__arrows").on("click", e => {
    if (e.target.className == "fas fa-chevron-right") moveSlider(sliderSlides, currentPosition, sliderCard, slidesToScroll);
    if (e.target.className == "fas fa-chevron-left") moveSlider(sliderSlides, currentPosition, sliderCard, slidesToScroll, "-");
  })


})

// сменить css элемента
let changeState = (
  cssObj = {"background": "","backdrop-filter": "blur(0px)"},
  change = $(".header")
) => change.css(cssObj);


// сменить пагинацию
function changePaginationProgress (
  addPagination,
  deletePaginations = $(".pagination__btn"),
  addPaginationBtn = document.querySelectorAll(".pagination__btn")
) {
  deletePaginations.removeClass("activeBtn");
  addPaginationBtn.forEach(btn => {
    if (btn.id == addPagination) btn.classList.add("activeBtn");
  });
}

// движений слайдов
function moveSlider (
  sliderSlides, currentPosition,
  sliderCard, slidesToScroll,
  type = "+", regPx = /[-0-9.]+(?=px)/
) {
  sliderSlides.forEach(slide => {
    if (screen.width < 480) {
      slidesToScroll = 2;
    }
    if (type == "+") currentPosition += sliderCard.width() * slidesToScroll;
    else currentPosition -= sliderCard.width() * slidesToScroll;
    slide.style.transform = `translateX(${currentPosition}px)`;
    if (checkTransform(regPx, slide.style.transform)) {
      slide.style.transform = `translateX(0px)`;
    }
  })
}

const checkTransform = (regPx, transform) => { if (transform.match(regPx)[0] > 500) return true };
