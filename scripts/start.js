

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
  const analyticsBtn = $(".analytics__btn");
  const analyticsPage = $(".analytics__page");

  // текущая позиция
  let currentPosition = 0;

  // на сколько карточек идёт скролл
  let slidesToScroll = 3;

  // движение слайдера на телефоне
  let moving = false;

  // переменная инициализации touchstart
  let init = 0;

  // первая позиция по X
  let x1 = 0;

  // вторая позиция по X
  let x2 = 0;

  // переменная хранящая данные о translate3d() из css кода
  let transform = 0;

  // финальная позиция пальца
  let final = 0;

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
      if (screen.width > 1024) {
        changeState({"background": "rgba(62, 61, 61, 0.1)","backdrop-filter": "blur(80px)"});
      } else {
        changeState({"background": "rgba(62, 61, 61, 98%)","backdrop-filter": "blur(0px)"});
      }
      headerMenu.slideDown();
      headerMenuTab.forEach(tab => {
        tab.style.display = "none";
        if (e.target.id == tab.id + "Link") {

          // в случае если пользователь зашёл с телефона назначается дисплей блок
          // (потому что данный элемент имеет другую расстановку на мобильной версии)

          if (screen.width > 1024) tab.style.display = "grid";
          else tab.style.display = "block";
        };
      });
    };
  });

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
          };
        });
      };
    });

    // изменение кнопок прогресса пролистывания по сайту, а так же появление кнопки вверх на определенном месте скролла
    document.addEventListener("scroll", e => {
        if (pageYOffset > 551 || pageYOffset == 551) changePaginationProgress("markets");
        if (pageYOffset > 2027 || pageYOffset == 2027) $(".upbtn").css({"display": "block", "animation": "btnUp 1s 0s ease-in-out"});
        if (pageYOffset < 500 || pageYOffset == 500) {
          $(".upbtn").css({
            "animation": "btnDown 1s 0s ease-in-out",
            "animation-fill-mode":"forwards"
          })
        setTimeout(() => $(".upbtn").css("display", "none"), 1000);
      };
  });

  // слайдер по нажатию на стрелочки
  $(".slider__arrows").on("click", e => {
    if (e.target.className == "fas fa-chevron-right") moveSlider(sliderSlides, currentPosition, sliderCard, slidesToScroll);
    if (e.target.className == "fas fa-chevron-left") moveSlider(sliderSlides, currentPosition, sliderCard, slidesToScroll, "-");
  });

  // дефолтное значение
  sliderSlides.forEach(slide => slide.style.transform = "translate3d(0px, 0px, 0px)");

  // слайдер по движению пальца
  $(".slider__slides").on("touchstart", touchStart);

  // конец зажатия пальца
  function touchEnd(e) {
    moving = false;
    sliderSlides.forEach(slide => {
      final = slide.style.transform.match(regPx)[0];
    })
    document.removeEventListener("touchmove", touchMove);
    document.removeEventListener("touchend", touchEnd);
  }

  // движение пальцем
  function touchMove(e) {
    if (moving) {
      x2 = x1 - e.touches[0].clientX;
      x1 = e.touches[0].clientX;
      sliderSlides.forEach(slide => {
        transform = slide.style.transform.match(regPx)[0];
        slide.style.transform = `translate3d(${transform - x2}px, 0px, 0px)`;
        checkerPosition()
      });
    };
  };

  // зажатие пальца
  function touchStart(e) {
    if (screen.width < 1025) {
      init = e.touches[0].pageX;
      moving = true;
      init = x1 = e.touches[0].clientX;

      sliderSlides.forEach(slide => slide.style.transition = "0s");
      // вешаем событие движения
      document.addEventListener("touchmove", touchMove);
      // отпускание пальца
      document.addEventListener("touchend", touchEnd);
    };
  };

  // проверка позиции слайдера
  function checkerPosition() {
    sliderSlides.forEach(slide => {
      if (Math.abs(transform) > 1646) check(slide);
      if (transform == 77 || transform > 77) check(slide);
      if (slide.id == "s-slider") {
        if (Math.abs(transform) > 951) check(slide);
      };
    });
  };

  // таб страницы аналитических данных
  $(".analytics__btn").on("click", e => {
    if (e.target.className == "analytics__btn") {
      analyticsBtn.removeClass("activeAnalyticsBtn");
      $(e.target).addClass("activeAnalyticsBtn");
      analyticsPage.hide();
      analyticsPage.each((ind, page) => {
        if (page.id == e.target.id + "-page") page.style.display = "block";
      });
    };
  });

  // поднятие кнопкой вверх
  $(".upbtn").on("click", e => {
    $("html, body").animate({scrollTop: 0}, "3000")
    changePaginationProgress("", "clear");
  });
});

// сменить css элемента
let changeState = (
  cssObj = {"background": "","backdrop-filter": "blur(0px)"},
  change = $(".header")
) => change.css(cssObj);


// сменить пагинацию
function changePaginationProgress (
  addPagination,
  type = "",
  deletePaginations = $(".pagination__btn"),
  addPaginationBtn = document.querySelectorAll(".pagination__btn")
) {
  deletePaginations.removeClass("activeBtn");
  addPaginationBtn.forEach(btn => {
    if (btn.id == addPagination) btn.classList.add("activeBtn");
    if (type == "clear") {
      $(".pagination__btn").removeClass("activeBtn");
    };
  });
};

// движение слайдов
function moveSlider (
  sliderSlides, currentPosition,
  sliderCard, slidesToScroll,
  type = "+", regPx = /[-0-9.]+(?=px)/
) {
  sliderSlides.forEach(slide => {
    if (screen.width < 480) {
      slidesToScroll = 2;
    };
    if (type == "+") currentPosition += sliderCard.width() * slidesToScroll;
    else currentPosition -= sliderCard.width() * slidesToScroll;
    slide.style.transform = `translateX(${currentPosition}px)`;
    if (checkTransform(regPx, slide.style.transform)) {
      slide.style.transform = `translateX(0px)`;
    };
  });
};

// функция исполнитель проверки где находится слайдер
function check(slide, transition = "1s", translate = 0) {
  slide.style.transform = `translate3d(${translate}, 0px, 0px)`;
  slide.style.transition = transition;
};

const checkTransform = (regPx, transform) => { if (transform.match(regPx)[0] > 500) return true };
